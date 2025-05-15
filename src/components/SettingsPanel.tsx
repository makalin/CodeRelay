import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsPanel: React.FC<SettingsPanelProps> = ({ isOpen, onClose }) => {
  const { theme, toggleTheme } = useTheme();

  if (!isOpen) return null;

  return (
    <div className="settings-panel" data-testid="settings-panel">
      <div className="settings-header">
        <h2>Settings</h2>
        <button onClick={onClose} className="close-button">×</button>
      </div>
      
      <div className="settings-content">
        <div className="setting-item">
          <label htmlFor="theme-toggle">Theme</label>
          <button
            id="theme-toggle"
            onClick={toggleTheme}
            className="theme-toggle"
          >
            {theme === 'dark' ? '🌙' : '☀️'} {theme === 'dark' ? 'Dark' : 'Light'}
          </button>
        </div>
        
        {/* Add more settings here */}
      </div>
    </div>
  );
}; 