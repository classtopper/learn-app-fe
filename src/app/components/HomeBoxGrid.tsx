// src/app/components/HomeBoxGrid.js

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';   
import { fetchSidebar } from '@/utils/api';
import './HomeBoxGrid.css';

interface HomeBoxGridProps {
  navItems: { id: number; title: string }[];
}

const HomeBoxGrid: React.FC<HomeBoxGridProps> = ({ navItems }) => {
  const router = useRouter();
  const [loadingItems, setLoadingItems] = useState<{ [key: number]: boolean }>({}); // Manage loading for each grid item

  const handleClick = async (id: number, title: string) => {
    setLoadingItems(prevState => ({ ...prevState, [id]: true })); // Set loading for the clicked item

    try {
        const sidebarItems = await fetchSidebar(id);

        if (sidebarItems.length > 0) {
          const firstSidebarItem = sidebarItems[0];
          const formattedNavTitle = title.toLowerCase().replace(/\s+/g, '-');
          const formattedSidebarTitle = firstSidebarItem.title.toLowerCase().replace(/\s+/g, '-');
          const newPath = `/${formattedNavTitle}/${formattedSidebarTitle}`;
          
          router.push(newPath);
        }
    } finally {
      setLoadingItems(prevState => ({ ...prevState, [id]: false })); // Stop loading for the clicked item
    }
  };

  return (
    <div className="home-box-grid">
      {navItems.filter((item: { id: number; }) => ![1, 13, 14, 15, 23, 24, 25, 26].includes(item.id)).map((item, index) => (
        <div
          key={item.id}
          className={`home-box home-box-color-${index + 2}`}
          onClick={() => handleClick(item.id, item.title)}
        >
          {loadingItems[item.id] ? "LOADING..." : item.title} {/* Show LOADING... only for the clicked item */}
        </div>
      ))}
    </div>
  );
};

export default HomeBoxGrid;
