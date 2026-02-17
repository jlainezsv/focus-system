import React from 'react';
import { useFocusStore } from '../../store/useFocusStore';

export const DailyDashboard: React.FC = () => {
  const { currentDate, dailyFocus, addFocusItem, updateFocusItem } = useFocusStore();

  const handleAddItem = () => {
    addFocusItem({
      title: 'New Focus Item',
      description: '',
      completed: false,
      date: currentDate,
      priority: 'medium',
    });
  };

  const handleToggleComplete = (id: string, completed: boolean) => {
    updateFocusItem(id, { completed: !completed });
  };

  return (
    <div className="daily-dashboard">
      <h2>Daily Focus - {currentDate}</h2>
      <button onClick={handleAddItem}>Add Focus Item</button>
      <div className="focus-items">
        {dailyFocus?.items.map((item) => (
          <div key={item.id} className="focus-item">
            <input
              type="checkbox"
              checked={item.completed}
              onChange={() => handleToggleComplete(item.id, item.completed)}
            />
            <span className={item.completed ? 'completed' : ''}>
              {item.title}
            </span>
            <span className={`priority-${item.priority}`}>
              {item.priority}
            </span>
          </div>
        ))}
      </div>
      {(!dailyFocus || dailyFocus.items.length === 0) && (
        <p>No focus items for today. Add one to get started!</p>
      )}
    </div>
  );
};
