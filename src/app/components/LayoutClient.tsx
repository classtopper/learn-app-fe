// src/app/LayoutClient.tsx

"use client";

import React, { useState, useCallback, useMemo } from "react";
import Navbar from "./Navbar";
import Header from "./Header";
import Footer from "./Footer";
import Ads from "./Ads";
import { fetchSidebar } from "@/utils/api";
import { useRouter } from 'next/navigation';
import Spinner from './Spinner'; 
import debounce from 'lodash/debounce';  // Optionally, use lodash debounce

interface LayoutClientProps {
  initialNavId: number | null;
  navItems: { id: number; title: string }[];
  children: React.ReactNode;
}

const LayoutClient: React.FC<LayoutClientProps> = ({
  initialNavId,
  navItems,
  children,
}) => {
  const router = useRouter();
  const [activeNavId, setActiveNavId] = useState(initialNavId);
  const [sidebarItems, setSidebarItems] = useState<Record<number, any[]>>({}); // Cache sidebar items by navId
  const [activeSidebarId, setActiveSidebarId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const formatTitleForUrl = useCallback((title: string) => {
    return title.toLowerCase().replace(/\s+/g, '-');
  }, []);

  const fetchAndSetSidebarItems = useCallback(
    async (navId: number) => {
      if (!sidebarItems[navId]) {
        const items = await fetchSidebar(navId);
        setSidebarItems(prev => ({ ...prev, [navId]: items }));
        return items;
      }
      return sidebarItems[navId];
    },
    [sidebarItems]
  );

  const handleSearch = useCallback(
    debounce(async (searchTerm: string) => {
      setLoading(true); 
      searchTerm = searchTerm.toLowerCase();

      try {
        const navItem = navItems.find((item) =>
          item.title.toLowerCase().includes(searchTerm)
        );

        if (navItem) {
          setActiveNavId(navItem.id);
          const items = await fetchAndSetSidebarItems(navItem.id);

          const sidebarItem = items.find((item: { title: string }) =>
            item.title.toLowerCase().includes(searchTerm)
          );

          if (sidebarItem) {
            setActiveSidebarId(sidebarItem.id);
            router.push(`/${formatTitleForUrl(navItem.title)}/${formatTitleForUrl(sidebarItem.title)}`);
          } else if (items.length > 0) {
            const firstSidebarItem = items[0];
            router.push(`/${formatTitleForUrl(navItem.title)}/${formatTitleForUrl(firstSidebarItem.title)}`);
          } else {
            router.push(`/${formatTitleForUrl(navItem.title)}`);
          }
        } else {
          for (const navItem of navItems) {
            const items = await fetchAndSetSidebarItems(navItem.id);
            const sidebarItem = items.find((item: { title: string }) =>
              item.title.toLowerCase().includes(searchTerm)
            );
            if (sidebarItem) {
              setActiveNavId(navItem.id);
              setActiveSidebarId(sidebarItem.id);
              router.push(`/${formatTitleForUrl(navItem.title)}/${formatTitleForUrl(sidebarItem.title)}`);
              break;
            }
          }
        }
      } catch (error) {
        console.error("Error fetching search results", error);
      } finally {
        setLoading(false);  
      }
    }, 300), // Adjust debounce delay as needed
    [navItems, fetchAndSetSidebarItems, formatTitleForUrl, router]
  );

  const memoizedNavItems = useMemo(() => navItems, [navItems]);

  return (
    <>
      <Header onSearch={handleSearch} />
      <Navbar navItems={memoizedNavItems} initialNavId={activeNavId} />
      
      {loading && <Spinner />}

      <div className="content">
        {children}
        <Ads initialNavbarId={activeNavId}/>
      </div>
      
      <Footer navItems={memoizedNavItems} setActiveNavId={setActiveNavId} />
    </>
  );
};

export default LayoutClient;
