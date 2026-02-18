import React, { useState } from 'react';
import { useFocusStore } from '../../store/useFocusStore';
import type { NonNegotiableConfig } from '../../types/focus';

export const SettingsView: React.FC = () => {
  const { state, updateSettings } = useFocusStore();
  const [nonNegs, setNonNegs] = useState<NonNegotiableConfig[]>(state.settings.nonNegotiables);
  const [notificationsEnabled, setNotificationsEnabled] = useState(
    state.settings.notificationsEnabled
  );
  const [theme, setTheme] = useState<'light' | 'dark'>(state.settings.theme);

  const handleSave = () => {
    updateSettings({
      nonNegotiables: nonNegs,
      notificationsEnabled,
      theme
    });
  };

  const handleChangeLabel = (index: number, label: string) => {
    setNonNegs(prev => prev.map((n, i) => (i === index ? { ...n, label } : n)));
  };

  return (
    <section className="card">
      <header className="card-header">
        <h2>Configuración</h2>
      </header>

      <div className="section">
        <h3>No-negociables</h3>
        <p className="hint">Puedes renombrar los tres no-negociables, pero manténlos simples.</p>
        {nonNegs.map((n, index) => (
          <label key={n.key} className="field">
            <span>{n.key}</span>
            <input
              type="text"
              value={n.label}
              onChange={e => handleChangeLabel(index, e.target.value)}
            />
          </label>
        ))}
      </div>

      <div className="section">
        <label className="checkbox-row">
          <input
            type="checkbox"
            checked={notificationsEnabled}
            onChange={e => setNotificationsEnabled(e.target.checked)}
          />
          <span>Notificaciones (placeholder, para backend futuro)</span>
        </label>
      </div>

      <div className="section">
        <h3>Tema</h3>
        <div className="radio-row">
          <label>
            <input
              type="radio"
              checked={theme === 'light'}
              onChange={() => setTheme('light')}
            />
            <span>Claro</span>
          </label>
          <label>
            <input
              type="radio"
              checked={theme === 'dark'}
              onChange={() => setTheme('dark')}
            />
            <span>Oscuro</span>
          </label>
        </div>
      </div>

      <footer className="card-footer">
        <button onClick={handleSave}>Guardar configuración</button>
      </footer>
    </section>
  );
};
