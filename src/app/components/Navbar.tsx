// src/app/components/Navbar.tsx

"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
  startTransition,
} from "react";
import "./Navbar.css";
import { useRouter, usePathname } from "next/navigation";
import { fetchSidebar } from "@/utils/api";
import Spinner from "./Spinner";

const formatTitleForUrl = (title: string) =>
  title
    .replace(/#/g, "sharp")
    .replace(/\.net/gi, "dotnet")
    .replace(/\s+/g, "-")
    .toLowerCase();

interface NavbarProps {
  navItems: { id: number; title: string }[];
  initialNavId: number | null;
}

const Navbar: React.FC<NavbarProps> = ({ navItems, initialNavId }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeNavId, setActiveNavId] = useState(initialNavId);
  const [loading, setLoading] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [isActiveTabInitialized, setIsActiveTabInitialized] = useState(false);

  const navRef = useRef<HTMLDivElement>(null);
  const navLinksContainerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname() || "";

  const currentPath = useMemo(() => pathname.split("/")[1] || "", [pathname]);
  const filteredNavItems = useMemo(
    () =>
      navItems.filter(
        (item) => ![1, 13, 14, 15, 23, 24, 25, 26].includes(item.id)
      ),
    [navItems]
  );

  // Check overflow on resize
  useEffect(() => {
    const checkOverflow = () => {
      const container = navLinksContainerRef.current;
      if (container) {
        setIsOverflowing(container.scrollWidth > container.clientWidth);
        setShowLeftArrow(container.scrollLeft > 0);
      }
    };
    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, []);

  // Scroll event listener
  useEffect(() => {
    const container = navLinksContainerRef.current;
    if (!container) return;

    const handleScroll = () => setShowLeftArrow(container.scrollLeft > 0);
    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  // Update active tab based on path
  useEffect(() => {
    let newActiveId: number | null = null;
    if (!currentPath || currentPath === "home") {
      newActiveId =
        navItems.find((item) => item.title.toLowerCase() === "home")?.id ?? null;
    } else {
      newActiveId =
        navItems.find((item) => formatTitleForUrl(item.title) === currentPath)
          ?.id ?? null;
    }

    if (newActiveId !== null && newActiveId !== activeNavId) {
      setActiveNavId(newActiveId);
    }
    setIsActiveTabInitialized(true);
  }, [currentPath, navItems, activeNavId]);

  const handleClick = useCallback(
    async (id: number, title: string) => {
      setMenuOpen(false);
      setLoading(true);

      try {
        const sidebarItems = await fetchSidebar(id);
        let route = `/${formatTitleForUrl(title)}`;

        if (
          title.toLowerCase() === "home" &&
          sidebarItems[0]?.title.toLowerCase() === "introduction"
        ) {
          route = "/";
        } else if (sidebarItems.length > 0) {
          route = `/${formatTitleForUrl(title)}/${formatTitleForUrl(
            sidebarItems[0].title
          )}`;
        }

        router.prefetch(route);

        // ✅ Smooth transition
        startTransition(() => {
          setActiveNavId(id);
          router.push(route);
        });
      } finally {
        setLoading(false);
      }
    },
    [router]
  );

  const toggleMenu = useCallback(() => setMenuOpen((prev) => !prev), []);

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const scrollLeft = () =>
    navLinksContainerRef.current?.scrollBy({ left: -150, behavior: "smooth" });
  const scrollRight = () =>
    navLinksContainerRef.current?.scrollBy({ left: 150, behavior: "smooth" });

  if (!navItems.length) return null;

  return (
    <>
      <nav
        className={navItems[0].id === 1 ? "navbar navbar-noborder" : "navbar"}
        ref={navRef}
      >
        <button
          className="hamburger-container"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          <div className="hamburger">&#9776;</div>
        </button>

        {isOverflowing && showLeftArrow && (
          <button className="scroll-arrow left-arrow" onClick={scrollLeft}>
            &lt;
          </button>
        )}

        <div className="nav-links-container" ref={navLinksContainerRef}>
          <ul className="nav-links">
            {filteredNavItems.map((item) => (
              <li
                key={item.id}
                className={
                  isActiveTabInitialized && item.id === activeNavId
                    ? "active"
                    : ""
                }
                onClick={() => handleClick(item.id, item.title)}
                aria-label={`Navigate to ${item.title}`}
              >
                {item.title}
              </li>
            ))}
          </ul>
        </div>

        {isOverflowing && (
          <button className="scroll-arrow right-arrow" onClick={scrollRight}>
            &gt;
          </button>
        )}

        {menuOpen && (
          <div className="dropdown-menu">
            <ul>
              {filteredNavItems.map((item) => (
                <li
                  key={item.id}
                  className={item.id === activeNavId ? "active" : ""}
                  onClick={() => handleClick(item.id, item.title)}
                >
                  {item.title}
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
      {loading && <Spinner />}
    </>
  );
};

export default Navbar;
