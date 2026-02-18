import React, { useMemo } from 'react';
import { useFocusStore } from '../../store/useFocusStore';
import type { NonNegotiableKey } from '../../types/focus';
import { todayISO, getPreviousDateISO } from '../../utils/date';


const nonNegOrder: NonNegotiableKey[] = ['movement', 'deepBlock', 'dayClosure'];



export const DailyDashboard: React.FC = () => {
  const { state, toggleNonNegotiable } = useFocusStore();
  const today = todayISO();
  const todayDaily = state.daily[today];
  const settings = state.settings;

  const allCompletedToday =
    todayDaily && nonNegOrder.every(k => todayDaily.completed[k]);

  const neverFailTwoDaysMessage = useMemo(() => {
    const yesterday = getPreviousDateISO(today);
    const yDay = state.daily[yesterday];
    const failedYesterday = yDay && !nonNegOrder.every(k => yDay.completed[k]);
    const failedToday = todayDaily && !nonNegOrder.every(k => todayDaily.completed[k]);

    if (!failedYesterday && !failedToday) return 'Vas bien. Mantén el ritmo.';
    if (failedYesterday && !failedToday) return 'Te recuperaste hoy. Bien.';
    if (!failedYesterday && failedToday) return 'Hoy puedes cerrar fuerte. No lo dejes pasar.';
    if (failedYesterday && failedToday)
      return 'Dos días seguidos sin cumplir. Revisa tu carga, no tu valor.';
    return 'Sigue simple. Un día a la vez.';
  }, [state.daily, today, todayDaily]);

  return (
    <section className="card">
      <header className="card-header">
        <h2>Hoy</h2>
        <p className="date-label">{today}</p>
      </header>

      <div className="section">
        <h3>Tres no-negociables</h3>
        <ul className="checklist">
          {nonNegOrder.map(key => {
            const config = settings.nonNegotiables.find(n => n.key === key)!;
            const checked = todayDaily?.completed[key] ?? false;
            return (
              <li key={key}>
                <label className="checkbox-row">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleNonNegotiable(today, key)}
                  />
                  <span>{config.label}</span>
                </label>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="section">
        <h3>Estado del día</h3>
        <p className={allCompletedToday ? 'status-ok' : 'status-pending'}>
          {allCompletedToday ? 'Cumplido' : 'No cumplido aún'}
        </p>
        <p className="hint">Regla: nunca fallar dos días seguidos.</p>
        <p className="message">{neverFailTwoDaysMessage}</p>
      </div>
    </section>
  );
};
