import React, { useState } from 'react';
import { Layout } from './components/layout/Layout';
import { DailyDashboard } from './components/daily/DailyDashboard';
import { WeeklyPlanView } from './components/weekly/WeeklyPlan';
import { DailyReviewView } from './components/review/DailyReview';
import { HistoryView } from './components/history/HistoryView';
import { SettingsView } from './components/settings/SettingsView';

export const App: React.FC = () => {
  const [view, setView] = useState<'daily' | 'weekly' | 'review' | 'history' | 'settings'>(
    'daily'
  );

  return (
    <Layout currentView={view} onChangeView={setView}>
      {view === 'daily' && <DailyDashboard />}
      {view === 'weekly' && <WeeklyPlanView />}
      {view === 'review' && <DailyReviewView />}
      {view === 'history' && <HistoryView />}
      {view === 'settings' && <SettingsView />}
    </Layout>
  );
};
