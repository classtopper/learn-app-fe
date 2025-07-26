// src/app/components/cookie/CookieBanner.tsx
import React from "react";

interface CookieBannerProps {
  isEEA: boolean;
  onAcceptAll: () => void;
  onManage: () => void;
  onClose: () => void;
}

const CookieBanner: React.FC<CookieBannerProps> = ({ isEEA, onAcceptAll, onManage, onClose }) => {
  return (
    <div id="cookie-consent-banner" className={`cookie-consent-banner ${!isEEA ? 'cookie-consent-banner-non-eea' : ''}`}>
      {!isEEA && (
        <button className="banner-close" onClick={onClose}>Got it</button>
      )}
      <div className="cookie-consent-inline">
        <p>
          {isEEA ? (
            <>
              We use essential cookies to ensure our website functions properly. With your consent,
              we also use non-essential cookies to enhance your experience, personalize content,
              tailor ads, and analyze traffic. By clicking &apos;Accept&apos;, you consent to our use of cookies
              as outlined in our Cookie Policy. You can adjust your cookie preferences anytime by clicking
              &apos;Manage options&apos;. See our <a href="#" onClick={onManage}>Cookie Settings</a> for more info.
            </>
          ) : (
            "We use cookies to ensure our website functions properly and enhance your experience."
          )}
        </p>
        {isEEA && (
          <div className="cookie-consent-buttons">
            <button onClick={onAcceptAll} id="btn-accept-all">Accept</button>
            <button onClick={onManage} id="btn-cookie-setting">Manage options</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CookieBanner;
