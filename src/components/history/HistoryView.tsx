import React, { useMemo } from 'react';
import { useFocusStore } from '../../store/useFocusStore';
import type { NonNegotiableKey } from '../../types/focus';

const nonNegOrder: NonNegotiableKey[] = ['movement', 'deepBlock', 'dayClosure'];

function sortDates(dates: string[]): string[] {
  return [...dates].sort();
}

export const HistoryView: React.FC = () => {
  const { state } = useFocusStore();

  const days = useMemo(() => sortDates(Object.keys(state.daily)), [state.daily]);

  const chainInfo = useMemo(() => {
    if (days.length === 0) return { longest: 0, current: 0 };
    let longest = 0;
    let current = 0;
    let prevDate: Date | null = null;

    for (const dateISO of days) {
      const d = new Date(dateISO);
      const daily = state.daily[dateISO];
      const allDone = daily && nonNegOrder.every(k => daily.completed[k]);
      if (!allDone) {
        current = 0;
        prevDate = d;
        continue;
      }
      if (!prevDate) {
        current = 1;
      } else {
        const diffDays = (d.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24);
        current = diffDays === 1 ? current + 1 : 1;
      }
      if (current > longest) longest = current;
      prevDate = d;
    }
    return { longest, current };
  }, [days, state.daily]);

  const alerts = useMemo(() => {
    if (days.length === 0) return '';
    const last = days[days.length - 1];
    const lastDaily = state.daily[last];
    const allDoneLast = lastDaily && nonNegOrder.every(k => lastDaily.completed[k]);

    const prev = days[days.length - 2];
    const prevDaily = prev ? state.daily[prev] : undefined;
    const allDonePrev = prevDaily && nonNegOrder.every(k => prevDaily.completed[k]);

    if (!allDoneLast && allDonePrev) {
      return 'Un día fallado. Observa, ajusta, sigue.';
    }
    if (!allDoneLast && !allDonePrev) {
      return 'Dos días seguidos fallados. Es una señal para revisar el sistema, no para culparte.';
    }
    return '';
  }, [days, state.daily]);

  return (
    <section className="card">
      <header className="card-header">
        <h2>Historial y consistencia</h2>
      </header>

      <div className="section">
        <p>Cadenas de días cumplidos (no gamificado, solo información):</p>
        <p>Cadena actual: {chainInfo.current} días</p>
        <p>Cadena más larga: {chainInfo.longest} días</p>
      </div>

      {alerts && (
        <div className="section alert">
          <p>{alerts}</p>
        </div>
      )}

      <div className="section history-list">
        <h3>Días pasados</h3>
        <ul>
          {days.map(date => {
            const daily = state.daily[date];
            const allDone = daily && nonNegOrder.every(k => daily.completed[k]);
            return (
              <li key={date} className={allDone ? 'day-ok' : 'day-miss'}>
                <span>{date}</span>
                <span>{allDone ? 'Cumplido' : 'Incompleto'}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};
