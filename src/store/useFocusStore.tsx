import { create } from 'zustand';
import { FocusItem, DailyFocus, WeeklyPlan, FocusSettings } from '../types/focus';
import { storage } from '../utils/storage';

interface FocusStore {
  currentDate: string;
  dailyFocus: DailyFocus | null;
  weeklyPlan: WeeklyPlan | null;
  settings: FocusSettings;

  // Actions
  setCurrentDate: (date: string) => void;
  loadDailyFocus: (date: string) => void;
  saveDailyFocus: (dailyFocus: DailyFocus) => void;
  loadWeeklyPlan: (weekStart: string) => void;
  saveWeeklyPlan: (weeklyPlan: WeeklyPlan) => void;
  updateSettings: (settings: Partial<FocusSettings>) => void;
  addFocusItem: (item: Omit<FocusItem, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateFocusItem: (id: string, updates: Partial<FocusItem>) => void;
  deleteFocusItem: (id: string) => void;
}

export const useFocusStore = create<FocusStore>((set, get) => ({
  currentDate: new Date().toISOString().split('T')[0],
  dailyFocus: null,
  weeklyPlan: null,
  settings: storage.getSettings() || {
    theme: 'light',
    notificationsEnabled: false,
  },

  setCurrentDate: (date) => {
    set({ currentDate: date });
    get().loadDailyFocus(date);
  },

  loadDailyFocus: (date) => {
    const dailyFocus = storage.getDailyFocus(date);
    set({ dailyFocus });
  },

  saveDailyFocus: (dailyFocus) => {
    storage.saveDailyFocus(dailyFocus);
    set({ dailyFocus });
  },

  loadWeeklyPlan: (weekStart) => {
    const weeklyPlan = storage.getWeeklyPlan(weekStart);
    set({ weeklyPlan });
  },

  saveWeeklyPlan: (weeklyPlan) => {
    storage.saveWeeklyPlan(weeklyPlan);
    set({ weeklyPlan });
  },

  updateSettings: (newSettings) => {
    const settings = { ...get().settings, ...newSettings };
    storage.saveSettings(settings);
    set({ settings });
  },

  addFocusItem: (item) => {
    const { dailyFocus, currentDate } = get();
    const newItem: FocusItem = {
      ...item,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const updated: DailyFocus = dailyFocus
      ? { ...dailyFocus, items: [...dailyFocus.items, newItem] }
      : { date: currentDate, items: [newItem] };

    get().saveDailyFocus(updated);
  },

  updateFocusItem: (id, updates) => {
    const { dailyFocus } = get();
    if (!dailyFocus) return;

    const items = dailyFocus.items.map((item) =>
      item.id === id
        ? { ...item, ...updates, updatedAt: new Date().toISOString() }
        : item
    );

    get().saveDailyFocus({ ...dailyFocus, items });
  },

  deleteFocusItem: (id) => {
    const { dailyFocus } = get();
    if (!dailyFocus) return;

    const items = dailyFocus.items.filter((item) => item.id !== id);
    get().saveDailyFocus({ ...dailyFocus, items });
  },
}));
