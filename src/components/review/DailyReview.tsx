import React from 'react';
import { useFocusStore } from '../../store/useFocusStore';

export const DailyReview: React.FC = () => {
  const { currentDate, dailyFocus, saveDailyFocus } = useFocusStore();

  const handleSaveNotes = (notes: string) => {
    if (dailyFocus) {
      saveDailyFocus({ ...dailyFocus, notes });
    }
  };

  const completedItems = dailyFocus?.items.filter(item => item.completed) || [];
  const totalItems = dailyFocus?.items.length || 0;
  const completionRate = totalItems > 0 ? (completedItems.length / totalItems) * 100 : 0;

  return (
    <div className="daily-review">
      <h2>Daily Review - {currentDate}</h2>
      <div className="review-stats">
        <p>Completed: {completedItems.length} / {totalItems}</p>
        <p>Completion Rate: {completionRate.toFixed(0)}%</p>
      </div>
      <div className="review-items">
        <h3>Completed Items</h3>
        {completedItems.map((item) => (
          <div key={item.id} className="review-item">
            <span>{item.title}</span>
          </div>
        ))}
      </div>
      <div className="review-notes">
        <h3>Daily Notes</h3>
        <textarea
          value={dailyFocus?.notes || ''}
          onChange={(e) => handleSaveNotes(e.target.value)}
          placeholder="Add your reflections for today..."
          rows={5}
        />
      </div>
    </div>
  );
};
