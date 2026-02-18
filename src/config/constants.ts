import type { Settings } from '../types/focus';

export const DEFAULT_SETTINGS: Settings = {
  nonNegotiables: [
    { key: 'movement', label: 'Movimiento' },
    { key: 'deepBlock', label: 'Bloque profundo' },
    { key: 'dayClosure', label: 'Cierre del día' }
  ],
  notificationsEnabled: false,
  theme: 'dark'
};
