export interface FocusItem {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  date: string;
  priority: 'high' | 'medium' | 'low';
  category?: string;
  createdAt: string;
  updatedAt: string;
}

export interface DailyFocus {
  date: string;
  items: FocusItem[];
  notes?: string;
}

export interface WeeklyPlan {
  weekStart: string;
  weekEnd: string;
  goals: string[];
  days: {
    [date: string]: DailyFocus;
  };
}

export interface FocusSettings {
  theme: 'light' | 'dark';
  notificationsEnabled: boolean;
  dailyReminder?: string;
}
