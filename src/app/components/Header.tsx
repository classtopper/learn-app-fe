// src/app/components/Header.tsx
"use client";

import React, { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import debounce from 'lodash/debounce';
import './Header.css';
import Image from 'next/image';
import Link from 'next/link';
import AuthModal from './AuthModal';
import { useAuth } from '@/context/AuthContext';
import { FaSearch, FaLinkedin, FaFacebook, FaInstagram, FaUserCircle } from 'react-icons/fa';
import DropdownMenu from './partials/DropdownMenu';
import SearchBar from './partials/SearchBar';
import UserMenu from './partials/UserMenu';
import SocialLinks from './partials/SocialLinks';
import DarkModeToggle from './partials/DarkModeToggle';

const Header: React.FC<{ onSearch: (term: string) => void }> = ({ onSearch }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [modalMode, setModalMode] = useState<'signin' | 'signup' | null>(null);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const router = useRouter();
  const { username, isLoggedIn, logout, deleteAccount } = useAuth();

  const debouncedSearch = useMemo(
    () => debounce((term: string) => onSearch(term), 500),
    [onSearch]
  );

  const handleSearch = () => {
    if (searchTerm.trim()) {
      debouncedSearch(searchTerm);
      setSearchTerm('');
    }
  };

  const toggleDarkMode = useCallback(() => setIsDarkMode(prev => !prev), []);
  const handleLogoClick = useCallback(() => router.push('/'), [router]);

  const dropdownItems = [
    {
      id: 'tools',
      label: '🛠️ Tools',
      links: [
        { href: '/tools/convert-util?type=word', label: '📝➡️📄 Word to PDF' },
        { href: '/tools/convert-util?type=image', label: '🖼️➡️📄 Image to PDF' },
        { href: '/tools/convert-util?type=pdf', label: '📄➡️📝 PDF to Word' },
        { href: '/tools/convert-util?type=compress', label: '🗜️ Compress' }
      ]
    },
    {
      id: 'services',
      label: '🧰 Services',
      links: [
        { href: '/quiz/java-quiz', label: '❓ Quizzes' },
        { href: '/interviews/java-interview-questions', label: '👔 Prep Interviews' },
        { href: '/questions/view-questions', label: '💬 Asked Questions' },
        { href: '/books/view-books', label: '📚 Books' }
      ]
    },
    {
      id: 'designing',
      label: '🎨 Designing',
      links: [
        { href: '/design/web-util?type=favicon', label: '🔖 Favicon Icon' },
        { href: '/design/web-util?type=logo', label: '🖌️ Website Logo' }
      ]
    },
    {
      id: 'languages',
      label: '🌐 Learn Languages',
      links: [
        { href: '/languages/german', label: '🇩🇪 German' },
        { href: '/languages/english', label: '🇬🇧 English' },
        { href: '/languages/french', label: '🇫🇷 French' }
      ]
    }
  ];

  return (
    <header className={`header ${isDarkMode ? 'dark' : ''}`}>
      <div className={isDarkMode ? 'logo-container-dark' : 'logo-container'} onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
        <Image
          src={isDarkMode ? '/alphatutor-logo-dark.png' : '/alphatutor-logo.png'}
          alt="Alphatutor Logo"
          className="logo-image"
          width={30}
          height={30}
          priority
        />
        <span className={isDarkMode ? 'logo-text-white' : 'logo-text'}>AlphaTutor</span>
      </div>

      <div className="dropdown-container desktop-only">
        {dropdownItems.map(item => (
          <DropdownMenu
            key={item.id}
            item={item}
            isOpen={openDropdown === item.id}
            onToggle={() => setOpenDropdown(prev => (prev === item.id ? null : item.id))}
          />
        ))}
      </div>

      <SearchBar
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onSearch={handleSearch}
        isDarkMode={isDarkMode}
      />

      <div className="header-controls">
        <DarkModeToggle isDark={isDarkMode} onToggle={toggleDarkMode} />
        <SocialLinks />
        <UserMenu
          isLoggedIn={isLoggedIn}
          username={username ?? ''}
          onLogout={logout}
          onDeleteAccount={deleteAccount}
          onSignIn={() => setModalMode('signin')}
          onSignUp={() => setModalMode('signup')}
        />
      </div>

      {modalMode && (
        <AuthModal
          mode={modalMode}
          onClose={() => setModalMode(null)}
          onSwitchMode={(newMode) => setModalMode(newMode)}
        />
      )}
    </header>
  );
};

export default Header;
