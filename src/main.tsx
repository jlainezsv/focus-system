import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import './styles.css';
import { FocusProvider } from './store/useFocusStore';
import { registerServiceWorker } from './service-worker';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <FocusProvider>
      <App />
    </FocusProvider>
  </React.StrictMode>
);

registerServiceWorker();
