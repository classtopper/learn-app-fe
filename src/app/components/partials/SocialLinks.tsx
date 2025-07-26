// components/partials/SocialLinks.tsx
import React from 'react';
import { FaLinkedin, FaFacebook, FaInstagram } from 'react-icons/fa';

const SocialLinks = () => (
  <div className="social-icons">
    <a href="https://www.linkedin.com/company/alphatutor-online-tutorials" target="_blank"><FaLinkedin /></a>
    <a href="https://www.facebook.com/people/Alphatutor-Online-Tutorials/61565572062396/" target="_blank"><FaFacebook /></a>
    <a href="https://www.instagram.com/alphatutor.learn/?hl=en" target="_blank"><FaInstagram /></a>
  </div>
);

export default SocialLinks;