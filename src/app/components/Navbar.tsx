// src/app/components/Navbar.tsx

"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import './Navbar.css';
import { useRouter, usePathname } from 'next/navigation';
import { fetchSidebar } from '@/utils/api';
import Spinner from './Spinner';

const formatTitleForUrl = (title: string) => {
  return title
    .replace(/#/g, 'sharp')
    .replace(/\.net/gi, 'dotnet')
    .replace(/\s+/g, '-')
    .toLowerCase();
};

interface NavbarProps {
  navItems: { id: number; title: string }[];
  initialNavId: number | null;
}

const Navbar = ({ navItems, initialNavId }: NavbarProps) => {
  const [state, setState] = useState({
    menuOpen: false,
    activeNavId: initialNavId,
    loading: false,
  });
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [showLeftArrow, setShowLeftArrow] = useState(false); // Track if left arrow should be shown
  const [isActiveTabInitialized, setIsActiveTabInitialized] = useState(false);

  const navRef = useRef<HTMLDivElement>(null);
  const navLinksContainerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname() || '';

  // Detect if nav is overflowing
  useEffect(() => {
    const checkOverflow = () => {
      const container = navLinksContainerRef.current;
      if (container) {
        setIsOverflowing(container.scrollWidth > container.clientWidth);
        setShowLeftArrow(container.scrollLeft > 0); // Show left arrow if not scrolled to the far left
      }
    };
    checkOverflow();
    window.addEventListener('resize', checkOverflow);
    return () => window.removeEventListener('resize', checkOverflow);
  }, []);

  // Listen to scroll events to toggle the visibility of the left arrow
  useEffect(() => {
    const handleScroll = () => {
      const container = navLinksContainerRef.current;
      if (container) {
        setShowLeftArrow(container.scrollLeft > 0); // Show the left arrow if scrolled away from the start
      }
    };

    const container = navLinksContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  // Scroll functionality for left and right arrows
  const scrollLeft = () => {
    if (navLinksContainerRef.current) {
      navLinksContainerRef.current.scrollBy({ left: -150, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (navLinksContainerRef.current) {
      navLinksContainerRef.current.scrollBy({ left: 150, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const currentPath = pathname.split('/')[1];
    if (!currentPath || currentPath === 'home') {
      const homeNavItem = navItems.find(item => item.title.toLowerCase() === 'home');
      if (homeNavItem) {
        setState(prev => ({ ...prev, activeNavId: homeNavItem.id }));
      }
    } else {
      const activeNavItem = navItems.find(item => formatTitleForUrl(item.title) === currentPath);
      if (activeNavItem) {
        setState(prev => ({ ...prev, activeNavId: activeNavItem.id }));
      }
    }

    setIsActiveTabInitialized(true);
  }, [pathname, navItems]);

  const handleClick = useCallback(
    async (id: number, title: string) => {
      setState(prev => ({ ...prev, activeNavId: id, menuOpen: false, loading: true }));

      try {
        const sidebarItems = await fetchSidebar(id);
        if (title.toLowerCase() === 'home' && sidebarItems.length > 0 && sidebarItems[0].title.toLowerCase() === 'introduction') {
          router.push(`/`);
        } else if (sidebarItems.length > 0) {
          const firstSidebarItem = sidebarItems[0];
          router.push(`/${formatTitleForUrl(title)}/${formatTitleForUrl(firstSidebarItem.title)}`);
        } else {
          router.push(`/${formatTitleForUrl(title)}`);
        }
      } finally {
        setState(prev => ({ ...prev, loading: false }));
      }
    },
    [router]
  );

  const toggleMenu = useCallback(() => {
    setState(prev => ({ ...prev, menuOpen: !prev.menuOpen }));
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setState(prev => ({ ...prev, menuOpen: false }));
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (!navItems || !navItems.length) return null;

  return (
    <>
      <nav className= {navItems[0].id ===1? 'navbar navbar-noborder' : 'navbar' } ref={navRef}>
        <button
          className="hamburger-container"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          <div className="hamburger">&#9776;</div>
        </button>
        
        {/* Left arrow for scrolling */}
        {isOverflowing && showLeftArrow && ( // Only show left arrow when overflowing and scrolled away from the left edge
          <button className="scroll-arrow left-arrow" onClick={scrollLeft}>
            &lt;
          </button>
        )}

        {/* Regular Horizontal Navbar */}
        <div className="nav-links-container" ref={navLinksContainerRef}>
          <ul className="nav-links">
            {navItems.filter((item: { id: number; }) => ![1, 13, 14, 15, 23, 24, 25, 26].includes(item.id)).map(item => (
              <li
                key={item.id}
                className={isActiveTabInitialized && item.id === state.activeNavId ? 'active' : ''}
                onClick={() => handleClick(item.id, item.title)}
                aria-label={`Navigate to ${item.title}`}
              >
                {item.title}
              </li>
            ))}
          </ul>
        </div>

        {/* Right arrow for scrolling */}
        {isOverflowing && (
          <button className="scroll-arrow right-arrow" onClick={scrollRight}>
            &gt;
          </button>
        )}

        {/* Dropdown Menu for Smaller Screens */}
        {state.menuOpen && (
          <div className="dropdown-menu">
            <ul>
              {navItems.filter((item: { id: number; }) => ![1, 13, 14, 15, 23, 24, 25, 26].includes(item.id)).map(item => (
                <li
                  key={item.id}
                  className={item.id === state.activeNavId ? 'active' : ''}
                  onClick={() => handleClick(item.id, item.title)}
                >
                  {item.title}
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
      {state.loading && <Spinner />}  
    </>
  );
};

export default Navbar;

