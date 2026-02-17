export const APP_NAME = 'Focus System';
export const APP_VERSION = '1.0.0';

export const PRIORITIES = {
  HIGH: 'high',
  MEDIUM: 'medium',
  LOW: 'low',
} as const;

export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
} as const;

export const DATE_FORMAT = 'YYYY-MM-DD';

export const DEFAULT_SETTINGS = {
  theme: THEMES.LIGHT,
  notificationsEnabled: false,
};

export const MAX_DAILY_ITEMS = 10;
export const MAX_WEEKLY_GOALS = 5;
