import React from 'react';
import { useFocusStore } from '../../store/useFocusStore';
import { storage } from '../../utils/storage';

export const SettingsView: React.FC = () => {
  const { settings, updateSettings } = useFocusStore();

  const handleThemeChange = (theme: 'light' | 'dark') => {
    updateSettings({ theme });
  };

  const handleNotificationsToggle = () => {
    updateSettings({ notificationsEnabled: !settings.notificationsEnabled });
  };

  const handleClearData = () => {
    if (window.confirm('Are you sure you want to clear all data? This cannot be undone.')) {
      storage.clearAll();
      window.location.reload();
    }
  };

  return (
    <div className="settings-view">
      <h2>Settings</h2>
      <div className="settings-section">
        <h3>Theme</h3>
        <div className="theme-options">
          <button
            onClick={() => handleThemeChange('light')}
            className={settings.theme === 'light' ? 'active' : ''}
          >
            Light
          </button>
          <button
            onClick={() => handleThemeChange('dark')}
            className={settings.theme === 'dark' ? 'active' : ''}
          >
            Dark
          </button>
        </div>
      </div>
      <div className="settings-section">
        <h3>Notifications</h3>
        <label>
          <input
            type="checkbox"
            checked={settings.notificationsEnabled}
            onChange={handleNotificationsToggle}
          />
          Enable notifications
        </label>
      </div>
      <div className="settings-section">
        <h3>Data Management</h3>
        <button onClick={handleClearData} className="danger">
          Clear All Data
        </button>
      </div>
    </div>
  );
};
