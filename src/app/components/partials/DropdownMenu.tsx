// components/partials/DropdownMenu.tsx
import Link from 'next/link';
import React from 'react';

interface DropdownItem {
  href: string;
  label: string;
}

interface DropdownMenuProps {
  item: {
    id: string;
    label: string;
    links: DropdownItem[];
  };
  isOpen: boolean;
  onToggle: () => void;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ item, isOpen, onToggle }) => {
  return (
    <div className="dropdown">
      <button className="dropdown-btn" onClick={onToggle}>{item.label} ▼</button>
      {isOpen && (
        <div className="dropdown-content">
          {item.links.map((link) => (
            <Link key={link.href} href={link.href}>{link.label}</Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;