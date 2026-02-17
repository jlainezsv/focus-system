import React, { ReactNode } from 'react';
import { APP_NAME } from '../../config/constants';

interface LayoutProps {
  children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="layout">
      <header className="header">
        <h1>{APP_NAME}</h1>
        <nav>
          <a href="#daily">Daily</a>
          <a href="#weekly">Weekly</a>
          <a href="#review">Review</a>
          <a href="#history">History</a>
          <a href="#settings">Settings</a>
        </nav>
      </header>
      <main className="main-content">
        {children}
      </main>
      <footer className="footer">
        <p>&copy; 2024 {APP_NAME}. All rights reserved.</p>
      </footer>
    </div>
  );
};
