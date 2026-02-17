import React from 'react';
import { Layout } from './components/layout/Layout';
import { DailyDashboard } from './components/daily/DailyDashboard';

function App() {
  return (
    <Layout>
      <DailyDashboard />
    </Layout>
  );
}

export default App;
