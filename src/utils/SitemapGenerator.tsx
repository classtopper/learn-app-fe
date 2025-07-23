"use client";

import { useEffect } from 'react';

const SitemapGenerator = () => {
  useEffect(() => {
    const generateSitemap = async () => {
      try {
        const response = await fetch('/api/sitemap');
        if (!response.ok) {
          throw new Error('Failed to generate sitemap');
        }
        const data = await response.text();
        console.log('Sitemap generated:', data);
      } catch (error) {
        console.error('Error generating sitemap:', error);
      }
    };

    generateSitemap();
  }, []);

  return null; // This component doesn't need to render anything
};

export default SitemapGenerator;
