import React, { useState, useEffect } from 'react';
import { useFocusStore } from '../../store/useFocusStore';
import type { DailyReview } from '../../types/focus';

function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

export const DailyReviewView: React.FC = () => {
  const { state, setDailyReview } = useFocusStore();
  const today = todayISO();
  const existing = state.reviews[today];

  const [whatWentWell, setWhatWentWell] = useState(existing?.whatWentWell ?? '');
  const [whatToAdjust, setWhatToAdjust] = useState(existing?.whatToAdjust ?? '');
  const [wasGoodDay, setWasGoodDay] = useState(existing?.wasGoodDay ?? false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setSaved(false);
  }, [whatWentWell, whatToAdjust, wasGoodDay]);

  const handleSave = () => {
    const review: DailyReview = {
      date: today,
      whatWentWell,
      whatToAdjust,
      wasGoodDay
    };
    setDailyReview(review);
    setSaved(true);
  };

  return (
    <section className="card">
      <header className="card-header">
        <h2>Cierre diario</h2>
        <p className="date-label">{today}</p>
      </header>

      <div className="section">
        <label className="field">
          <span>¿Qué hice bien hoy?</span>
          <textarea
            value={whatWentWell}
            onChange={e => setWhatWentWell(e.target.value)}
            rows={3}
          />
        </label>
      </div>

      <div className="section">
        <label className="field">
          <span>¿Qué ajusto mañana?</span>
          <textarea
            value={whatToAdjust}
            onChange={e => setWhatToAdjust(e.target.value)}
            rows={3}
          />
        </label>
      </div>

      <div className="section">
        <label className="checkbox-row">
          <input
            type="checkbox"
            checked={wasGoodDay}
            onChange={e => setWasGoodDay(e.target.checked)}
          />
          <span>Hoy fue un buen día</span>
        </label>
      </div>

      <footer className="card-footer">
        <button onClick={handleSave}>Guardar cierre</button>
        {saved && <p className="hint">Guardado.</p>}
      </footer>
    </section>
  );
};
