import { DailyFocus, WeeklyPlan, FocusSettings } from '../types/focus';

const STORAGE_KEYS = {
  DAILY_FOCUS: 'focus-system-daily',
  WEEKLY_PLAN: 'focus-system-weekly',
  SETTINGS: 'focus-system-settings',
  HISTORY: 'focus-system-history',
} as const;

export const storage = {
  // Daily Focus
  getDailyFocus: (date: string): DailyFocus | null => {
    const data = localStorage.getItem(`${STORAGE_KEYS.DAILY_FOCUS}-${date}`);
    return data ? JSON.parse(data) : null;
  },

  saveDailyFocus: (dailyFocus: DailyFocus): void => {
    localStorage.setItem(
      `${STORAGE_KEYS.DAILY_FOCUS}-${dailyFocus.date}`,
      JSON.stringify(dailyFocus)
    );
  },

  // Weekly Plan
  getWeeklyPlan: (weekStart: string): WeeklyPlan | null => {
    const data = localStorage.getItem(`${STORAGE_KEYS.WEEKLY_PLAN}-${weekStart}`);
    return data ? JSON.parse(data) : null;
  },

  saveWeeklyPlan: (weeklyPlan: WeeklyPlan): void => {
    localStorage.setItem(
      `${STORAGE_KEYS.WEEKLY_PLAN}-${weeklyPlan.weekStart}`,
      JSON.stringify(weeklyPlan)
    );
  },

  // Settings
  getSettings: (): FocusSettings | null => {
    const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    return data ? JSON.parse(data) : null;
  },

  saveSettings: (settings: FocusSettings): void => {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  },

  // Clear all data
  clearAll: (): void => {
    Object.values(STORAGE_KEYS).forEach((key) => {
      const keysToRemove = Object.keys(localStorage).filter((k) =>
        k.startsWith(key)
      );
      keysToRemove.forEach((k) => localStorage.removeItem(k));
    });
  },
};
