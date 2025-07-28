// src/app/components/Navbar.tsx

"use client";

import React, { useState, useEffect, useRef, useCallback, useMemo, startTransition } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import './Sidebar.css';

const formatTitleForUrl = (title: string) =>
    title.replace(/\s+/g, '-').toLowerCase().replace(/#/g, 'sharp').replace(/\.net/gi, 'dotnet');

interface SidebarProps {
    sidebarItems: { id: number; title: string }[];
    initialSidebarId: number | null;
}

const Sidebar: React.FC<SidebarProps> = ({ sidebarItems, initialSidebarId }) => {
    const [activeSidebarId, setActiveSidebarId] = useState(initialSidebarId);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const router = useRouter();
    const pathname = usePathname() || '';
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    const navbarTitle = useMemo(() => pathname.split('/').filter(Boolean)[0] || 'home', [pathname]);
    const excludedIds = useMemo(() => [287, 288, 289, 290], []);

    useEffect(() => {
        const currentSidebarTitle = pathname.split('/').pop()?.toLowerCase();
        const activeSidebar = sidebarItems.find(item => item.title.toLowerCase() === currentSidebarTitle);
        if (activeSidebar && activeSidebar.id !== activeSidebarId) {
            setActiveSidebarId(activeSidebar.id);
        }
    }, [pathname, sidebarItems, activeSidebarId]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleClick = useCallback(
        (id: number, title: string) => {
            const formattedTitle = formatTitleForUrl(title);

            startTransition(() => {
                setActiveSidebarId(id);

                if (navbarTitle === "home" && title.toLowerCase() === "introduction") {
                    router.push(`/`);
                } else {
                    const route = `/${navbarTitle}/${formattedTitle}`;
                    router.prefetch(route);
                    router.push(route);
                }
            });
        },
        [navbarTitle, router]
    );

    const toggleDropdown = useCallback(() => {
        setIsDropdownOpen(prev => !prev);
    }, []);

    return (
        <>
            <div
                className={initialSidebarId === 1 ? 'side-hamburger-home' : 'side-hamburger'}
                onClick={toggleDropdown}
                aria-label="Toggle Sidebar"
                aria-expanded={isDropdownOpen}
            >
                ☰
            </div>

            <div ref={dropdownRef} className={`side-dropdown-menu ${isDropdownOpen ? 'open' : ''}`}>
                <ul>
                    {sidebarItems.map(item => (
                        <li
                            key={item.id}
                            className={item.id === activeSidebarId ? 'active' : ''}
                            onClick={() => handleClick(item.id, item.title)}
                        >
                            {item.title}
                        </li>
                    ))}
                </ul>
            </div>

            <aside className={`sidebar ${initialSidebarId === 1 ? 'sidebar-hide' : ''}`}>
                <ul>
                    {sidebarItems
                        .filter(item => !excludedIds.includes(item.id))
                        .map(item => (
                            <li
                                key={item.id}
                                className={item.id === activeSidebarId ? 'active' : ''}
                                onClick={() => handleClick(item.id, item.title)}
                            >
                                {item.title}
                            </li>
                        ))}
                </ul>
            </aside>
        </>
    );
};

export default Sidebar;
