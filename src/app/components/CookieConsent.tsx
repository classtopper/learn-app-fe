// src/app/components/CookieConsent.tsx

"use client";

import { useState, useEffect, useCallback } from "react";
import { fetchCountry } from '@/utils/api';
import Cookies from "js-cookie";
import './CookieConsent.css';

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isSettingsVisible, setIsSettingsVisible] = useState(false);
  const [isEEA, setIsEEA] = useState(false);
  const [consentSettings, setConsentSettings] = useState({
    necessary: true,
    analytics: false,
    preferences: false,
    marketing: false,
  });

  const detectLocationAndSetDefaults = useCallback(async () => {
    try {
      const data = await fetchCountry();
      const isUserEEA = checkIfInEEA(data.country);
      setIsEEA(isUserEEA); 

      const consentDefaults = isUserEEA
        ? {
            necessary: false,
            analytics: false,
            preferences: false,
            marketing: false,
          }
        : {
            necessary: true,
            analytics: true,
            preferences: true,
            marketing: true,
          };

      localStorage.setItem('defaultConsent', JSON.stringify(consentDefaults));
      setConsentSettings(consentDefaults);
    } catch (error) {
      console.error('Error detecting location:', error);
      
      const fallbackConsent = {
        necessary: true,
        analytics: false,
        preferences: false,
        marketing: false,
      };
      
      localStorage.setItem('defaultConsent', JSON.stringify(fallbackConsent));
      setConsentSettings(fallbackConsent);
    }
  }, []);

  useEffect(() => {
    const storedConsent = Cookies.get("cookieConsent");
    if (!storedConsent) {
      detectLocationAndSetDefaults().then(() => {
        setIsVisible(true);
      });
    } else {
      const consentMode = JSON.parse(storedConsent);
      updateGtagConsent(consentMode);
      if (consentMode.analytics || consentMode.marketing) {
        loadGtagScript();
      }
    }
  }, [detectLocationAndSetDefaults]);

  const checkIfInEEA = (countryCode: string) => {
    const eeaCountries = [
      'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR',
      'HU', 'IS', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL', 'NO', 'PL', 'PT',
      'RO', 'SK', 'SI', 'ES', 'SE', 'LI',
    ];
    return eeaCountries.includes(countryCode);
  };

  const updateGtagConsent = (consent: { necessary: any; analytics: any; preferences: any; marketing: any; }) => {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function() { window.dataLayer.push(arguments); };

    const consentMode = {
      'functionality_storage': consent.necessary ? 'granted' : 'denied',
      'security_storage': consent.necessary ? 'granted' : 'denied',
      'personalization_storage': consent.preferences ? 'granted' : 'denied',
      'ad_user_data': consent.marketing ? 'granted' : 'denied',
      'ad_personalization': consent.marketing ? 'granted' : 'denied',
      'ad_storage': consent.marketing ? 'granted' : 'denied',
      'analytics_storage': consent.analytics ? 'granted' : 'denied',
    };

    window.gtag('consent', 'update', consentMode);
    localStorage.setItem('consentMode', JSON.stringify(consentMode));
  };

  const loadGtagScript = () => {
    const gtagScript = document.createElement('script');
    gtagScript.async = true;
    gtagScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-38WY1YKT3X';
    document.head.appendChild(gtagScript);
    gtagScript.onload = () => {
      window.gtag('js', new Date());
      window.gtag('config', 'G-38WY1YKT3X');
      window.gtag('config', 'GT-578673PH');
    };
  };

  const acceptAll = () => {
    const allConsent = {
      necessary: true,
      analytics: true,
      preferences: true,
      marketing: true,
    };
    Cookies.set("cookieConsent", JSON.stringify(allConsent), { expires: 365 });
    updateGtagConsent(allConsent);
    loadGtagScript();
    setIsVisible(false);
  };

  const acceptSome = () => {
    const selectedConsent = {
      necessary: true,
      analytics: consentSettings.analytics,
      preferences: consentSettings.preferences,
      marketing: consentSettings.marketing,
    };
    Cookies.set("cookieConsent", JSON.stringify(selectedConsent), { expires: 365 });
    updateGtagConsent(selectedConsent);
    if (selectedConsent.analytics || selectedConsent.marketing) {
      loadGtagScript();
    }
    setIsVisible(false);
  };

  const rejectAll = () => {
    const noConsent = {
      necessary: false,
      analytics: false,
      preferences: false,
      marketing: false,
    };
    Cookies.set("cookieConsent", JSON.stringify(noConsent), { expires: 365 });
    updateGtagConsent(noConsent);
    setIsVisible(false);
  };

  const toggleSettings = () => {
    setIsSettingsVisible((prev) => !prev);
  };

  const handleSettingChange = (e: { target: { name: any; checked: any; }; }) => {
    setConsentSettings({
      ...consentSettings,
      [e.target.name]: e.target.checked,
    });
  };

  const closeBanner = () => {
    setIsVisible(false); 
  };

  if (!isVisible) return null;

  return (
    <div>
  
      {!isSettingsVisible && (
        <div id="cookie-consent-banner" className={`cookie-consent-banner ${!isEEA ? 'cookie-consent-banner-non-eea' : ''}`}>
     
          {!isEEA && (
            <button className="banner-close" onClick={closeBanner}>Got it</button>
          )}
          <div className="cookie-consent-inline">
            <p>
            {isEEA 
              ? <> 
                  We use essential cookies to ensure our website functions properly. With your consent, 
                  we also use non-essential cookies to enhance your experience, personalize content, tailor ads, and analyze traffic.
                  By clicking &apos;Accept&apos;, you consent to our use of cookies as outlined in our Cookie Policy. 
                  You can adjust your cookie preferences anytime by clicking &apos;Manage options&apos;. See our 
                  <a href="#" onClick={toggleSettings}> Cookie Settings</a> for more info.
                </>
              : `We use cookies to ensure our website functions properly and enhance your experience.`}
            </p>
            {isEEA && (
              <div className="cookie-consent-buttons">
                <button onClick={acceptAll} id="btn-accept-all">Accept</button>
                <button onClick={toggleSettings} id="btn-cookie-setting">Manage options</button>
              </div>
            )}
          </div>
        </div>
      )}

      {isSettingsVisible && (
        <div className="popup-overlay">
          <div className="popup-content">
            <button className="close" onClick={toggleSettings}>×</button>
            <h2>Privacy Preference Center</h2>
            <p>
              We use cookies to enhance your experience. You can manage your preferences below.
            </p>
            <div className="cookie-consent-options">
              <div className="cookie-setting">
                <label>Necessary</label>
                <input type="checkbox" checked disabled />
              </div>
              <div className="cookie-setting">
                <label>Analytics</label>
                <input
                  type="checkbox"
                  name="analytics"
                  checked={consentSettings.analytics}
                  onChange={handleSettingChange}
                />
              </div>
              <div className="cookie-setting">
                <label>Preferences</label>
                <input
                  type="checkbox"
                  name="preferences"
                  checked={consentSettings.preferences}
                  onChange={handleSettingChange}
                />
              </div>
              <div className="cookie-setting">
                <label>Marketing</label>
                <input
                  type="checkbox"
                  name="marketing"
                  checked={consentSettings.marketing}
                  onChange={handleSettingChange}
                />
              </div>
            </div>
            <div className="cookie-consent-buttons">
              <button onClick={rejectAll} id="btn-reject-all">Reject All</button>
              <button onClick={acceptSome} id="btn-accept-some">Confirm My Choice</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CookieConsent;
