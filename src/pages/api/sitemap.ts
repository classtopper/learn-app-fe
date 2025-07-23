// pages/api/sitemap.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { fetchNavbar, fetchSidebar } from '@/utils/api';
import fs from 'fs';
import path from 'path';

const formatTitleForUrl = (title: string) => {
  return title
    .toLowerCase()
    .replace(/#/g, 'sharp')  // Replace '#' with 'sharp'
    .replace(/\.net/gi, 'dotnet')
    .replace(/ /g, '-')      // Replace spaces with dashes
    .replace(/\?$/, '');     // Ensure no trailing '?'
};

const escapeXml = (str: string) => {
  return str
    .replace(/&/g, '')
    .replace(/</g, '')
    .replace(/>/g, '')
    .replace(/"/g, '')
    .replace(/'/g, '');
};

// Function to generate sitemap content in XML format with proper formatting
const generateSitemapXml = (urls: string[]) => {
  const baseUrl = 'https://www.alphatutor.org';
  const urlSet = urls
    .map(url => {
      const cleanUrl = url
        .replace(/\?$/, '') // Remove trailing '?'
        .replace(/[()]/g, ''); // Remove parentheses
      return `
  <url>
    <loc>${escapeXml(baseUrl + cleanUrl)}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
    <lastmod>${new Date().toISOString()}</lastmod>
  </url>`;
    })
    .join(''); // Join with newline for proper formatting

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlSet}
</urlset>`;
};

// Function to generate sitemap in .txt format
const generateSitemapTxt = (urls: string[]) => {
  const baseUrl = 'https://www.alphatutor.org';
  return urls.map(url => `${baseUrl}${url}`).join('\n');
};

const generateSitemap = async () => {
  const navItems = await fetchNavbar();
  
  if (navItems.length === 0) {
    throw new Error('No navigation items available to generate sitemap.');
  }

  const urls: string[] = [];
  const filteredNavItems = navItems.filter((nav: { id: number; }) => nav.id !== 1);
  for (const navItem of filteredNavItems) {
    const sidebarItems = await fetchSidebar(navItem.id);

    if (sidebarItems.length === 0) {
      urls.push(`/${formatTitleForUrl(navItem.title)}`);
    } else {
      for (const sidebarItem of sidebarItems) {
        urls.push(
          `/${formatTitleForUrl(navItem.title)}/${formatTitleForUrl(
            sidebarItem.title
          )}`
        );
      }
    }
  }

  // Generate XML and TXT formats
  const sitemapXml = generateSitemapXml(urls);
  const sitemapTxt = generateSitemapTxt(urls);

  // Write sitemap.xml and sitemap.txt to the 'public' folder
  const publicDir = path.join(process.cwd(), 'public');
  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapXml);
  fs.writeFileSync(path.join(publicDir, 'sitemap.txt'), sitemapTxt);
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await generateSitemap();
    res.status(200).json({ message: 'Sitemap generated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error generating sitemap' });
  }
}