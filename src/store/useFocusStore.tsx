import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type {
  FocusState,
  NonNegotiableKey,
  DailyReview,
  WeeklyPlan,
  Settings
} from '../types/focus';
import { loadState, saveState } from '../utils/storage';

interface FocusContextValue {
  state: FocusState;
  toggleNonNegotiable: (date: string, key: NonNegotiableKey) => void;
  setDailyReview: (review: DailyReview) => void;
  upsertWeeklyPlan: (plan: WeeklyPlan) => void;
  lockWeeklyPlan: (weekStartISO: string) => void;
  updateSettings: (partial: Partial<Settings>) => void;
}

const FocusContext = createContext<FocusContextValue | undefined>(undefined);

export const FocusProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<FocusState>(() => loadState());

  useEffect(() => {
    saveState(state);
  }, [state]);

  const value = useMemo<FocusContextValue>(
    () => ({
      state,
      toggleNonNegotiable: (date, key) => {
        setState(prev => {
          const existing = prev.daily[date] ?? {
            date,
            completed: { movement: false, deepBlock: false, dayClosure: false }
          };
          return {
            ...prev,
            daily: {
              ...prev.daily,
              [date]: {
                ...existing,
                completed: {
                  ...existing.completed,
                  [key]: !existing.completed[key]
                }
              }
            }
          };
        });
      },
      setDailyReview: review => {
        setState(prev => ({
          ...prev,
          reviews: {
            ...prev.reviews,
            [review.date]: review
          }
        }));
      },
      upsertWeeklyPlan: plan => {
        setState(prev => ({
          ...prev,
          weeklyPlans: {
            ...prev.weeklyPlans,
            [plan.weekStartISO]: plan
          }
        }));
      },
      lockWeeklyPlan: weekStartISO => {
        setState(prev => {
          const existing = prev.weeklyPlans[weekStartISO];
          if (!existing) return prev;
          return {
            ...prev,
            weeklyPlans: {
              ...prev.weeklyPlans,
              [weekStartISO]: { ...existing, locked: true }
            }
          };
        });
      },
      updateSettings: partial => {
        setState(prev => ({
          ...prev,
          settings: { ...prev.settings, ...partial }
        }));
      }
    }),
    [state]
  );

  return <FocusContext.Provider value={value}>{children}</FocusContext.Provider>;
};

export function useFocusStore() {
  const ctx = useContext(FocusContext);
  if (!ctx) throw new Error('useFocusStore must be used within FocusProvider');
  return ctx;
}
