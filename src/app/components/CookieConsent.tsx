// src/app/components/CookieConsent.tsx
"use client";

import { useState, useEffect, useCallback } from "react";
import Cookies from "js-cookie";
import './CookieConsent.css';
import Script from "next/script";
import { fetchCountry } from '@/utils/api';
import CookieBanner from "./cookie/CookieBanner";
import CookieSettingsPopup from "./cookie/CookieSettingsPopup";

const defaultConsent = {
  necessary: true,
  analytics: false,
  preferences: false,
  marketing: false,
};

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isSettingsVisible, setIsSettingsVisible] = useState(false);
  const [consentSettings, setConsentSettings] = useState(defaultConsent);

  const [isEEA, setIsEEA] = useState(false);

  useEffect(() => {
    const detectEEAStatus = async () => {
      // In real setup, replace this with window.__eeaUser or server-set cookie
      const eeaCountries = [
        'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR',
        'HU', 'IS', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL', 'NO', 'PL', 'PT',
        'RO', 'SK', 'SI', 'ES', 'SE', 'LI'
      ];
      const { country } = await fetchCountry();
      if (country && eeaCountries.includes(country)) {
        setIsEEA(true);
      }
    };

    const storedConsent = Cookies.get("cookieConsent");

    try {
      if (!storedConsent) {
        detectEEAStatus();
        setConsentSettings(defaultConsent);
        setIsVisible(true);
      } else {
        const parsed = JSON.parse(storedConsent);
        setConsentSettings(parsed);
        updateGtagConsent(parsed);
      }
    } catch (e) {
      console.warn("Invalid cookieConsent format");
      setConsentSettings(defaultConsent);
    }
  }, []);

  const updateGtagConsent = useCallback((consent: typeof defaultConsent) => {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };

    const mode = {
      'functionality_storage': consent.necessary ? 'granted' : 'denied',
      'security_storage': consent.necessary ? 'granted' : 'denied',
      'personalization_storage': consent.preferences ? 'granted' : 'denied',
      'ad_user_data': consent.marketing ? 'granted' : 'denied',
      'ad_personalization': consent.marketing ? 'granted' : 'denied',
      'ad_storage': consent.marketing ? 'granted' : 'denied',
      'analytics_storage': consent.analytics ? 'granted' : 'denied',
    };

    window.gtag('consent', 'update', mode);
    localStorage.setItem('consentMode', JSON.stringify(mode));
  }, []);

  const applyConsent = useCallback((consent: typeof defaultConsent) => {
    Cookies.set("cookieConsent", JSON.stringify(consent), { expires: 365 });
    setConsentSettings(consent);
    updateGtagConsent(consent);
    setIsVisible(false);
  }, [updateGtagConsent]);

  if (!isVisible) return null;

  return (
    <div>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-38WY1YKT3X"
        strategy="afterInteractive"
      />

      {isSettingsVisible ? (
        <CookieSettingsPopup
          settings={consentSettings}
          onChange={setConsentSettings}
          onConfirm={() => applyConsent({ ...consentSettings, necessary: true })}
          onReject={() => applyConsent({ necessary: false, analytics: false, preferences: false, marketing: false })}
          onClose={() => setIsSettingsVisible(false)}
        />
      ) : (
        <CookieBanner
          isEEA={isEEA}
          onAcceptAll={() => applyConsent({ necessary: true, analytics: true, preferences: true, marketing: true })}
          onManage={() => setIsSettingsVisible(true)}
          onClose={() => setIsVisible(false)}
        />
      )}
    </div>
  );
};

export default CookieConsent;
