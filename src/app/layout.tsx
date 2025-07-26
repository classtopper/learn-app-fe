// src/app/layout.tsx

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import LayoutClient from './components/LayoutClient';
import CookieConsent from './components/CookieConsent';
import { fetchNavbar } from '../utils/api';
import Script from 'next/script';   
import { AuthProvider } from '@/context/AuthContext';
import { FlashProvider } from '@/context/FlashContext';

const inter = Inter({ subsets: ["latin"], display: 'swap' });

export const metadata: Metadata = {
  title: "AlphaTutor Online Tutorials",
  description: "AlphaTutor offers expert-led tutorials, tools, services, and design resources covering AI, Java, Spring Boot, Flutter, PostgreSQL, language learning, quizzes, interview prep, learn german, french languages and more.",
  robots: "index, follow",
  openGraph: {
    title: "AlphaTutor Online Tutorials",
    description: "Explore expert tutorials, development tools, design utilities, language courses, quizzes, and interview prep with AlphaTutor.",
    url: "https://www.alphatutor.org",
    siteName: "AlphaTutor",
    images: [
      {
        url: "https://www.alphatutor.org/og-image.png",
        width: 1200,
        height: 630,
        alt: "AlphaTutor Logo"
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AlphaTutor Online Tutorials",
    description: "Learn AI, Java, Flutter, and more with AlphaTutor’s tutorials, plus access tools, design assets, language lessons, quizzes, and interview questions.",
    images: "https://www.alphatutor.org/og-image.png",
  }
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let navItems = [];
  let initialNavId = null;

  try {
    navItems = await fetchNavbar();
    const unwantedIds = [1123];
    navItems = navItems.filter((item: { id: number; }) => !unwantedIds.includes(item.id));
    initialNavId = navItems.length > 0 ? navItems[0].id : null;
  } catch (error) {
    console.error("Failed to fetch navbar data:", error);
  }

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" type="image/x-icon"/>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="google-adsense-account" content="ca-pub-1281835575317626" />
        <link rel="canonical" href="https://www.alphatutor.org" />

        {/* Structured Data */}
        <Script id="organization-schema" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "AlphaTutor",
            "url": "https://www.alphatutor.org",
            "logo": "https://www.alphatutor.org/alphatutor-logo.png",
            "contactPoint": {
              "@type": "ContactPoint",
              "contactType": "Customer Support",
              "email": "contact@alphatutor.org"
            }
          })}
        </Script>

        {/* GTM Consent Script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}

              function applyConsentFromLocalStorage() {
                const defaultConsent = JSON.parse(localStorage.getItem('defaultConsent'));

                if (defaultConsent) {
                  gtag('consent', 'default', {
                    'functionality_storage': defaultConsent.necessary ? 'granted' : 'denied',
                    'security_storage': defaultConsent.necessary ? 'granted' : 'denied',
                    'personalization_storage': defaultConsent.preferences ? 'granted' : 'denied',
                    'ad_user_data': defaultConsent.marketing ? 'granted' : 'denied',
                    'ad_personalization': defaultConsent.marketing ? 'granted' : 'denied',
                    'ad_storage': defaultConsent.marketing ? 'granted' : 'denied',
                    'analytics_storage': defaultConsent.analytics ? 'granted' : 'denied',
                  });
                } else {
                  setTimeout(applyConsentFromLocalStorage, 500);
                }
              }
              applyConsentFromLocalStorage();
            `,
          }}
        />

        {/* GTM Head */}
        <Script id="gtm-head" strategy="beforeInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-KZG5QRPJ');`}
        </Script>
      </head>
      <body className={inter.className}>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KZG5QRPJ"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        <FlashProvider>
          <AuthProvider>
            <LayoutClient initialNavId={initialNavId} navItems={navItems}>
              {children}
            </LayoutClient>
            <CookieConsent />
          </AuthProvider>
        </FlashProvider>
      </body>
    </html>
  );
}
