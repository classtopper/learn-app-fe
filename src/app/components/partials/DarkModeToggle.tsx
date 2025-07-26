// components/partials/DarkModeToggle.tsx
import React from 'react';

const DarkModeToggle: React.FC<{ isDark: boolean; onToggle: () => void }> = ({ isDark, onToggle }) => (
  <div className="dark-mode-toggle" onClick={onToggle}>
    {isDark ? '🌞' : '🌜'}
  </div>
);

export default DarkModeToggle;