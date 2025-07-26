// src/app/components/cookie/CookieSettingsPopup.tsx
import React from "react";

interface CookieSettingsPopupProps {
  settings: {
    analytics: boolean;
    preferences: boolean;
    marketing: boolean;
    necessary: boolean;
  };
  onChange: (newSettings: CookieSettingsPopupProps['settings']) => void;
  onConfirm: () => void;
  onReject: () => void;
  onClose: () => void;
}

const CookieSettingsPopup: React.FC<CookieSettingsPopupProps> = ({ settings, onChange, onConfirm, onReject, onClose }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    onChange({ ...settings, [name]: checked });
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <button className="close" onClick={onClose}>×</button>
        <h2>Privacy Preference Center</h2>
        <p>We use cookies to enhance your experience. You can manage your preferences below.</p>

        <div className="cookie-consent-options">
          <div className="cookie-setting">
            <label>Necessary</label>
            <input type="checkbox" checked disabled />
          </div>
          <div className="cookie-setting">
            <label>Analytics</label>
            <input type="checkbox" name="analytics" checked={settings.analytics} onChange={handleChange} />
          </div>
          <div className="cookie-setting">
            <label>Preferences</label>
            <input type="checkbox" name="preferences" checked={settings.preferences} onChange={handleChange} />
          </div>
          <div className="cookie-setting">
            <label>Marketing</label>
            <input type="checkbox" name="marketing" checked={settings.marketing} onChange={handleChange} />
          </div>
        </div>

        <div className="cookie-consent-buttons">
          <button onClick={onReject} id="btn-reject-all">Reject All</button>
          <button onClick={onConfirm} id="btn-accept-some">Confirm My Choice</button>
        </div>
      </div>
    </div>
  );
};

export default CookieSettingsPopup;