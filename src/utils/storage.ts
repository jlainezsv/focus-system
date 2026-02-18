import type { FocusState } from '../types/focus';
import { DEFAULT_SETTINGS } from '../config/constants';

const STORAGE_KEY = 'focus-system-state-v1';

export function loadState(): FocusState {
  if (typeof window === 'undefined') {
    return createInitialState();
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return createInitialState();
    const parsed = JSON.parse(raw) as FocusState;
    return {
      ...createInitialState(),
      ...parsed,
      settings: { ...createInitialState().settings, ...parsed.settings }
    };
  } catch {
    return createInitialState();
  }
}

export function saveState(state: FocusState) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function createInitialState(): FocusState {
  return {
    daily: {},
    reviews: {},
    weeklyPlans: {},
    settings: DEFAULT_SETTINGS
  };
}
