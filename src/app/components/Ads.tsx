// src/app/components/Ads.tsx
import React from 'react';
import './Ads.css';

interface SidebarProps {
    initialNavbarId: number | null;
}

const Ads: React.FC<SidebarProps> = ({ initialNavbarId }) => {
    return (
        <aside className={`ads ${initialNavbarId === 1 ? 'ads-hide' : ''}`}>
            <p></p>
        </aside>
    );
};

export default Ads;

