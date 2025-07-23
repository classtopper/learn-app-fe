// src/app/components/Header.tsx

"use client";

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import debounce from 'lodash/debounce';
import './Header.css';
import { FaSearch, FaLinkedin, FaFacebook, FaInstagram, FaUserCircle } from 'react-icons/fa';
import Image from 'next/image';
import AuthModal from './AuthModal';
import { useAuth } from '@/context/AuthContext';

interface HeaderProps {
  onSearch: (searchTerm: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isToolsOpen, setIsToolsOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isDesigningOpen, setIsDesigningOpen] = useState(false);
  const [isLanguagesOpen, setIsLanguagesOpen] = useState(false);

  const [modalMode, setModalMode] = useState<'signin' | 'signup' | null>(null);


  const router = useRouter();

  const menuRef = useRef<HTMLDivElement>(null);
  const convertersRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const designingRef = useRef<HTMLDivElement>(null);
  const languagesRef = useRef<HTMLDivElement>(null);

  const { username, isLoggedIn, logout, deleteAccount } = useAuth();

  const toggleDarkMode = useCallback(() => setIsDarkMode(prev => !prev), []);
  const handleLogoClick = useCallback(() => router.push('/'), [router]);

  const debouncedSearch = useCallback(debounce((term: string) => {
    onSearch(term);
    setSearchTerm('');
  }, 500), [onSearch]);

  const handleSearchKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchTerm.trim()) {
      debouncedSearch(searchTerm);
      setIsMenuOpen(false);
    }
  };

  const handleSearchClick = () => {
    if (searchTerm.trim()) {
      debouncedSearch(searchTerm);
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        !menuRef.current?.contains(target) &&
        !convertersRef.current?.contains(target) &&
        !servicesRef.current?.contains(target) &&
        !designingRef.current?.contains(target) &&
        !languagesRef.current?.contains(target)
      ) {
        setIsMenuOpen(false);
        setIsToolsOpen(false);
        setIsServicesOpen(false);
        setIsDesigningOpen(false);
        setIsLanguagesOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className={`header ${isDarkMode ? 'dark' : ''}`}>
      <div className={isDarkMode ? 'logo-container-dark' : 'logo-container'} onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
        <Image
          src={isDarkMode ? '/alphatutor-logo-dark.png' : '/alphatutor-logo.png'}
          alt="Alphatutor Logo"
          className="logo-image"
          width='30'
          height='30'
          priority
        />
        {isDarkMode ? <span className="logo-text-white">AlphaTutor</span> : <span className="logo-text">AlphaTutor</span> }
      </div>

      <div className="dropdown-container desktop-only">
        <div className="dropdown">
          <button className="dropdown-btn">🛠️ Tools ▼</button>
          <div className="dropdown-content">
            <a href="/tools/convert-util?type=word">📝➡️📄 Word to PDF</a>
            <a href="/tools/convert-util?type=image">🖼️➡️📄 Image to PDF</a>
            <a href="/tools/convert-util?type=pdf">📄➡️📝 PDF to Word</a>
            <a href="/tools/convert-util?type=compress">🗜️ Compress</a>
          </div>
        </div>
        <div className="dropdown">
          <button className="dropdown-btn">🧰 Services ▼</button>
          <div className="dropdown-content">
            <a href="/quiz/java-quiz">❓ Quizzes</a>
            <a href="/interviews/java-interview-questions">👔 Prep Interviews</a>
            <a href="/questions/view-questions">💬 Asked Questions</a>
            <a href="/books/view-books">📚 Books</a>
          </div>
        </div>
        <div className="dropdown">
          <button className="dropdown-btn">🎨 Designing ▼</button>
          <div className="dropdown-content">
            <a href="/design/web-util?type=favicon">🔖 Favicon Icon</a>
            <a href="/design/web-util?type=logo">🖌️ Website Logo</a>
          </div>
        </div>
        <div className="dropdown">
          <button className="dropdown-btn">🌐 Learn Languages ▼</button>
          <div className="dropdown-content">
            <a href="/languages/german">🇩🇪 German</a>
            <a href="/languages/english">🇬🇧 English</a>
            <a href="/languages/french">🇫🇷 French</a>
          </div>
        </div>
      </div>

      <div className="mobile-menu-container mobile-only" ref={menuRef}>
        <button className={`menu-btn ${isDarkMode ? 'menu-btn-dark' : ''}`} onClick={() => setIsMenuOpen(!isMenuOpen)}>
          Menu ▼
        </button>
        {isMenuOpen && (
          <div className={`menu-dropdown ${isDarkMode ? 'menu-dropdown-dark' : ''}`}>
            <div className="search-container mobile-only">
              <input
                type="text"
                placeholder="Search..."
                className="search-bar"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={handleSearchKeyPress}
              />
              <button className="search-btn" onClick={handleSearchClick}>
                <FaSearch />
              </button>
            </div>

            <div className="dropdown" ref={convertersRef}>
              <button className="dropdown-btn" onClick={() => setIsToolsOpen(!isToolsOpen)}>🛠️ Tools ▼</button>
              {isToolsOpen && (
                <div className="dropdown-content">
                  <a href="/tools/convert-util?type=word">📝➡️📄 Word to PDF</a>
                  <a href="/tools/convert-util?type=image">🖼️➡️📄 Image to PDF</a>
                  <a href="/tools/convert-util?type=compress">🗜️ Compress</a>
                  <a href="/tools/convert-util?type=pdf">📄➡️📝 PDF to Word</a>
                </div>
              )}
            </div>

            <div className="dropdown" ref={servicesRef}>
              <button className="dropdown-btn" onClick={() => setIsServicesOpen(!isServicesOpen)}>🧰 Services ▼</button>
              {isServicesOpen && (
                <div className="dropdown-content">
                  <a href="/quiz/java-quiz">❓ Quizzes</a>
                  <a href="/interviews/java-interview-questions">👔 Prep Interviews</a>
                  <a href="/questions/view-questions">💬 Asked Questions</a>
                  <a href="/books/view-books">📚 Books</a>
                </div>
              )}
            </div>

            <div className="dropdown" ref={designingRef}>
              <button className="dropdown-btn" onClick={() => setIsDesigningOpen(!isDesigningOpen)}>🎨 Designing ▼</button>
              {isDesigningOpen && (
                <div className="dropdown-content">
                  <a href="/design/web-util?type=favicon">🔖 Favicon Icon</a>
                  <a href="/design/web-util?type=logo">🖌️ Website Logo</a>
                </div>
              )}
            </div>

            <div className="dropdown" ref={languagesRef}>
              <button className="dropdown-btn" onClick={() => setIsLanguagesOpen(!isLanguagesOpen)}>🌐 Learn Languages ▼</button>
              {isLanguagesOpen && (
                <div className="dropdown-content">
                  <a href="/languages/german">🇩🇪 German</a>
                  <a href="/languages/english">🇬🇧 English</a>
                  <a href="/languages/french">🇫🇷 French</a>
                </div>
              )}
            </div>

            {isLoggedIn ? (
              <div className="user-menu mobile-only">
                <div className="user-menu-trigger">
                  <FaUserCircle className="profile-icon" />
                  <span>Profile ▾</span>
                </div>
                <div className="user-menu-dropdown">
                  <div className="user-greeting">Hello, {username}</div>
                  <button onClick={logout}>Logout</button>
                  <button onClick={deleteAccount}>Delete Account</button>
                </div>
              </div>
            ) : (
              <div className="signin-signup-container mobile-only">
                <button className="signin-btn" onClick={() => setModalMode('signin')}>Sign In</button>
                <button className="signup-btn" onClick={() => setModalMode('signup')}>Sign Up</button>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="search-container desktop-only">
        <input
          type="text"
          placeholder="Search..."
          className="search-bar"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleSearchKeyPress}
        />
        <button className="search-btn" onClick={handleSearchClick}>
          <FaSearch />
        </button>
      </div>

      <div className="header-controls">
        <div className="dark-mode-toggle" onClick={toggleDarkMode}>
          {isDarkMode ? '🌞' : '🌜'}
        </div>
        <div className="social-icons">
          <a href="https://www.linkedin.com/company/alphatutor-online-tutorials" target="_blank"><FaLinkedin /></a>
          <a href="https://www.facebook.com/people/Alphatutor-Online-Tutorials/61565572062396/" target="_blank"><FaFacebook /></a>
          <a href="https://www.instagram.com/alphatutor.learn/?hl=en" target="_blank"><FaInstagram /></a>
        </div>
       {isLoggedIn ? (
          <div className="user-menu desktop-only">
            <div className="user-menu-trigger">
              <FaUserCircle className="profile-icon" />
              <span>Profile ▾</span>
            </div>
            <div className="user-menu-dropdown">
              <div className="user-greeting">Hello, {username}</div>
              <button onClick={logout}>Logout</button>
              <button onClick={deleteAccount}>Delete Account</button>
            </div>
          </div>
        ) : (
          <div className="signin-signup-container desktop-only">
            <button className="signin-btn" onClick={() => setModalMode('signin')}>Sign In</button>
            <button className="signup-btn" onClick={() => setModalMode('signup')}>Sign Up</button>
          </div>
        )}
      </div>

      {modalMode && (
        <AuthModal
          mode={modalMode as 'signin' | 'signup'}
          onClose={() => setModalMode(null)}
          onSwitchMode={(newMode) => setModalMode(newMode)}  
        />
      )}
    </header>
  );
};

export default Header;
