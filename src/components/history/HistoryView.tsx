import React, { useState, useEffect } from 'react';
import { DailyFocus } from '../../types/focus';
import { storage } from '../../utils/storage';

export const HistoryView: React.FC = () => {
  const [history, setHistory] = useState<DailyFocus[]>([]);

  useEffect(() => {
    // Load history from localStorage
    const loadHistory = () => {
      const keys = Object.keys(localStorage).filter((key) =>
        key.startsWith('focus-system-daily-')
      );
      const historyData: DailyFocus[] = keys
        .map((key) => {
          const data = localStorage.getItem(key);
          return data ? JSON.parse(data) : null;
        })
        .filter(Boolean)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      
      setHistory(historyData);
    };

    loadHistory();
  }, []);

  return (
    <div className="history-view">
      <h2>History</h2>
      <div className="history-list">
        {history.map((dailyFocus) => {
          const completedCount = dailyFocus.items.filter(item => item.completed).length;
          const totalCount = dailyFocus.items.length;
          
          return (
            <div key={dailyFocus.date} className="history-item">
              <h3>{dailyFocus.date}</h3>
              <p>Completed: {completedCount} / {totalCount}</p>
              <div className="history-items">
                {dailyFocus.items.map((item) => (
                  <div key={item.id} className={item.completed ? 'completed' : ''}>
                    {item.title}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      {history.length === 0 && (
        <p>No history available yet. Start adding focus items!</p>
      )}
    </div>
  );
};
