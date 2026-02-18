import React from 'react';
import { useFocusStore } from '../../store/useFocusStore';

interface LayoutProps {
  currentView: 'daily' | 'weekly' | 'review' | 'history' | 'settings';
  onChangeView: (view: LayoutProps['currentView']) => void;
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ currentView, onChangeView, children }) => {
  const { state } = useFocusStore();
  const theme = state.settings.theme;

  return (
    <div className={`app-root theme-${theme}`}>
      <header className="app-header">
        <h1>Focus System</h1>
        <nav className="nav-tabs">
          <button
            className={currentView === 'daily' ? 'active' : ''}
            onClick={() => onChangeView('daily')}
          >
            Hoy
          </button>
          <button
            className={currentView === 'weekly' ? 'active' : ''}
            onClick={() => onChangeView('weekly')}
          >
            Plan semanal
          </button>
          <button
            className={currentView === 'review' ? 'active' : ''}
            onClick={() => onChangeView('review')}
          >
            Cierre
          </button>
          <button
            className={currentView === 'history' ? 'active' : ''}
            onClick={() => onChangeView('history')}
          >
            Historial
          </button>
          <button
            className={currentView === 'settings' ? 'active' : ''}
            onClick={() => onChangeView('settings')}
          >
            Configuración
          </button>
        </nav>
      </header>
      <main className="app-main">{children}</main>
    </div>
  );
};
