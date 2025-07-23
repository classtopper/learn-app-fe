// src/app/components/Navbar.tsx

"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import './Sidebar.css';

const formatTitleForUrl = (title: string) => {
    return title.replace(/\s+/g, '-').toLowerCase().replace(/#/g, 'sharp').replace(/\.net/gi, 'dotnet');
};

interface SidebarProps {
    sidebarItems: { id: number; title: string }[];
    initialSidebarId: number | null;
}

const Sidebar: React.FC<SidebarProps> = ({ sidebarItems, initialSidebarId }) => {
    const [state, setState] = useState({
        activeSidebarId: initialSidebarId,
        isDropdownOpen: false,
    });

    const [loadingSidebarId, setLoadingSidebarId] = useState<number | null>(null);

    const router = useRouter();
    const pathname = usePathname() || '';
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const currentSidebarTitle = pathname.split('/').pop()?.toLowerCase();
        const activeSidebar = sidebarItems.find(item => item.title.toLowerCase() === currentSidebarTitle);
        if (activeSidebar) {
            setState(prev => ({ ...prev, activeSidebarId: activeSidebar.id }));
        }

        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setState(prev => ({ ...prev, isDropdownOpen: false }));
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [pathname, sidebarItems]);

    const handleClick = useCallback(
        async (id: number, title: string) => {
            setLoadingSidebarId(id); // Show loading on clicked item
            setState(prev => ({ ...prev, activeSidebarId: id }));

            const navbarTitle = pathname.split('/').filter(Boolean)[0] || 'home';
            const formattedTitle = formatTitleForUrl(title);

            if (navbarTitle === "home" && title.toLowerCase() === "introduction") {
                await router.push(`/`);
            } else {
                await router.push(`/${navbarTitle}/${formattedTitle}`);
            }

            // Add slight delay to show loading effect
            setTimeout(() => setLoadingSidebarId(null), 500);
        },
        [pathname, router]
    );

    const toggleDropdown = useCallback(() => {
        setState(prev => ({ ...prev, isDropdownOpen: !prev.isDropdownOpen }));
    }, []);

    const renderSidebarTitle = (item: { id: number; title: string }) => {
        if (loadingSidebarId === item.id) {
            return 'Loading...';
        }
        return item.title;
    };

    return (
        <>
            <div
                className={initialSidebarId === 1 ? 'side-hamburger-home' : 'side-hamburger'}
                onClick={toggleDropdown}
                aria-label="Toggle Sidebar"
                aria-expanded={state.isDropdownOpen}
            >
                ☰
            </div>

            <div
                ref={dropdownRef}
                className={`side-dropdown-menu ${state.isDropdownOpen ? 'open' : ''}`}
            >
                <ul>
                    {sidebarItems.map(item => (
                        <li
                            key={item.id}
                            className={item.id === state.activeSidebarId ? 'active' : ''}
                            onClick={() => handleClick(item.id, item.title)}
                        >
                            {renderSidebarTitle(item)}
                        </li>
                    ))}
                </ul>
            </div>

            <aside className={`sidebar ${initialSidebarId === 1 ? 'sidebar-hide' : ''}`}>
                <ul>
                    {sidebarItems
                        .filter(item => ![287, 288, 289, 290].includes(item.id))
                        .map(item => (
                            <li
                                key={item.id}
                                className={item.id === state.activeSidebarId ? 'active' : ''}
                                onClick={() => handleClick(item.id, item.title)}
                            >
                                {renderSidebarTitle(item)}
                            </li>
                        ))}
                </ul>
            </aside>
        </>
    );
};

export default Sidebar;
