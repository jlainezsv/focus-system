import React from 'react';
import { useFocusStore } from '../../store/useFocusStore';

export const WeeklyPlan: React.FC = () => {
  const { weeklyPlan, saveWeeklyPlan } = useFocusStore();

  const handleAddGoal = () => {
    if (!weeklyPlan) {
      const today = new Date();
      const weekStart = new Date(today.setDate(today.getDate() - today.getDay()));
      const weekEnd = new Date(today.setDate(today.getDate() + 6));
      
      saveWeeklyPlan({
        weekStart: weekStart.toISOString().split('T')[0],
        weekEnd: weekEnd.toISOString().split('T')[0],
        goals: ['New weekly goal'],
        days: {},
      });
    } else {
      saveWeeklyPlan({
        ...weeklyPlan,
        goals: [...weeklyPlan.goals, 'New weekly goal'],
      });
    }
  };

  return (
    <div className="weekly-plan">
      <h2>Weekly Plan</h2>
      {weeklyPlan && (
        <div>
          <p>Week: {weeklyPlan.weekStart} to {weeklyPlan.weekEnd}</p>
        </div>
      )}
      <button onClick={handleAddGoal}>Add Weekly Goal</button>
      <div className="weekly-goals">
        {weeklyPlan?.goals.map((goal, index) => (
          <div key={index} className="weekly-goal">
            <span>{goal}</span>
          </div>
        ))}
      </div>
      {(!weeklyPlan || weeklyPlan.goals.length === 0) && (
        <p>No weekly goals set. Add one to get started!</p>
      )}
    </div>
  );
};
