"use client";

import React, { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import './Footer.css';
import { FaLinkedin, FaFacebook, FaInstagram } from 'react-icons/fa';
import { fetchSidebar } from '@/utils/api'; 

interface FooterProps {
  navItems: { id: number; title: string }[];
  setActiveNavId: (id: number) => void;
}

const formatTitleForUrl = (title: string) => {
  return title.replace(/\s+/g, '-').toLowerCase().replace(/#/g, 'sharp').replace(/\.net/gi, 'dotnet');
};

const Footer: React.FC<FooterProps> = ({ navItems, setActiveNavId }) => {
  const router = useRouter();

  const handleNavClick = useCallback(async (navId: number, navTitle: string) => {
    setActiveNavId(navId);

    const formattedNavTitle = formatTitleForUrl(navTitle);

    try {
      const sidebarItems = await fetchSidebar(navId);

      if (sidebarItems.length > 0) {
        const firstSidebar = sidebarItems[0];
        const formattedSidebarTitle = formatTitleForUrl(firstSidebar.title);

        // Navigate to full URL
        router.push(`/${formattedNavTitle}/${formattedSidebarTitle}`);
      } else {
        // fallback if no sidebar items
        router.push(`/${formattedNavTitle}`);
      }

      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error('Error loading sidebar:', error);
    }
  }, [router, setActiveNavId]);

  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Learning Tutorials */}
        <div className="footer-section">
          <h3>Learning Tutorials</h3>
          <ul className="footer-nav">
            {navItems.length > 0 ? (
              navItems
                .filter(item => ![1, 13, 14, 15, 23, 24, 25, 26].includes(item.id))
                .map(item => (
                  <li key={item.id}>
                    <button onClick={() => handleNavClick(item.id, item.title)}>
                      {item.title}
                    </button>
                  </li>
                ))
            ) : (
              <li>No navigation items available.</li>
            )}
          </ul>
        </div>

        {/* About, Contact, Social */}
        <div className="footer-section">
          <h3>About Us</h3>
          <p>
            AlphaTutor.org is a comprehensive learning platform dedicated to empowering students, developers, and tech professionals through expert-led tutorials and hands-on resources. We specialize in cutting-edge topics such as Generative AI, Java, Spring Boot, Flutter, PostgreSQL, and more—helping you stay ahead in the fast-evolving world of technology.
          </p>
          <p>
            Our mission is to simplify complex concepts and provide practical, real-world solutions that fuel your personal and professional growth. Whether you&apos;re preparing for job interviews, building new skills, or exploring emerging tech, AlphaTutor offers a supportive environment to guide your journey.
          </p>
          <p>
            With a focus on clarity, quality, and community, we aim to be your trusted resource for continuous learning and career advancement in software development and beyond.
          </p>
        </div>

        <div className="footer-section">
          <h3>Contact Us</h3>
          <p>
            Email:
            <a href="mailto:arvind.pravat@gmail.com" style={{ color: '#00b38c' }}> arvind.pravat@gmail.com</a>
            <br />
            or
            <a href="mailto:contact@alphatutor.org" style={{ color: '#00b38c' }}> contact@alphatutor.org</a>
          </p>
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="https://www.linkedin.com/company/alphatutor-online-tutorials" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
            <a href="https://www.facebook.com/people/Alphatutor-Online-Tutorials/61565572062396/" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
            <a href="https://www.instagram.com/alphatutor.learn/?hl=en" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2025 AlphaTutor.org. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
