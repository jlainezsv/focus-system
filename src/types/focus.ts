export type NonNegotiableKey = 'movement' | 'deepBlock' | 'dayClosure';

export interface NonNegotiableConfig {
  key: NonNegotiableKey;
  label: string;
}

export interface DailyNonNegotiablesState {
  date: string; // YYYY-MM-DD
  completed: Record<NonNegotiableKey, boolean>;
}

export interface DailyReview {
  date: string;
  whatWentWell: string;
  whatToAdjust: string;
  wasGoodDay: boolean;
}

export type Weekday =
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday'
  | 'sunday';

export interface WeeklyBlock {
  label: string;
  start: string; // "09:00"
  end: string;   // "17:00"
}

export interface WeeklyPlan {
  weekStartISO: string; // Monday date
  locked: boolean;
  blocks: Record<Weekday, WeeklyBlock[]>;
}

export interface Settings {
  nonNegotiables: NonNegotiableConfig[];
  notificationsEnabled: boolean;
  theme: 'light' | 'dark';
}

export interface FocusState {
  daily: Record<string, DailyNonNegotiablesState>;
  reviews: Record<string, DailyReview>;
  weeklyPlans: Record<string, WeeklyPlan>;
  settings: Settings;
}

