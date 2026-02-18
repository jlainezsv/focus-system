import React, { useMemo, useState } from 'react';
import { useFocusStore } from '../../store/useFocusStore';
import type { Weekday, WeeklyBlock, WeeklyPlan } from '../../types/focus';

const weekdays: { key: Weekday; label: string }[] = [
  { key: 'monday', label: 'Lunes' },
  { key: 'tuesday', label: 'Martes' },
  { key: 'wednesday', label: 'Miércoles' },
  { key: 'thursday', label: 'Jueves' },
  { key: 'friday', label: 'Viernes' },
  { key: 'saturday', label: 'Sábado' },
  { key: 'sunday', label: 'Domingo' }
];

function getWeekStartISO(date = new Date()): string {
  const d = new Date(date);
  const day = d.getDay(); // 0 Sunday
  const diff = (day === 0 ? -6 : 1) - day;
  d.setDate(d.getDate() + diff);
  return d.toISOString().slice(0, 10);
}

const defaultBlocks: WeeklyBlock[] = [
  { label: 'Trabajo full-time', start: '09:00', end: '17:00' },
  { label: 'BrandBox / Ingreso', start: '18:00', end: '20:00' },
  { label: 'Movimiento', start: '07:30', end: '08:00' },
  { label: 'Descanso', start: '22:30', end: '23:30' }
];

export const WeeklyPlanView: React.FC = () => {
  const { state, upsertWeeklyPlan, lockWeeklyPlan } = useFocusStore();
  const weekStartISO = getWeekStartISO();
  const existing = state.weeklyPlans[weekStartISO];

  const [draft, setDraft] = useState<WeeklyPlan>(() => {
    if (existing) return existing;
    const blocksByDay: Record<Weekday, WeeklyBlock[]> = {
      monday: defaultBlocks,
      tuesday: defaultBlocks,
      wednesday: defaultBlocks,
      thursday: defaultBlocks,
      friday: defaultBlocks,
      saturday: defaultBlocks,
      sunday: defaultBlocks
    };
    return {
      weekStartISO,
      locked: false,
      blocks: blocksByDay
    };
  });

  const locked = existing?.locked ?? draft.locked;

  const canEdit = useMemo(() => !locked, [locked]);

  const handleChangeBlockLabel = (day: Weekday, index: number, label: string) => {
    if (!canEdit) return;
    setDraft(prev => ({
      ...prev,
      blocks: {
        ...prev.blocks,
        [day]: prev.blocks[day].map((b, i) => (i === index ? { ...b, label } : b))
      }
    }));
  };

  const handleSave = () => {
    if (!canEdit) return;
    upsertWeeklyPlan(draft);
  };

  const handleLock = () => {
    lockWeeklyPlan(weekStartISO);
  };

  return (
    <section className="card">
      <header className="card-header">
        <h2>Plan semanal</h2>
        <p className="hint">Editable solo una vez por semana. Semana que inicia: {weekStartISO}</p>
      </header>

      <div className="weekly-grid">
        <div className="weekly-grid-header">
          <span>Día</span>
          <span>Bloques</span>
        </div>
        {weekdays.map(day => (
          <div key={day.key} className="weekly-grid-row">
            <div className="day-label">{day.label}</div>
            <div className="blocks-column">
              {draft.blocks[day.key].map((block, index) => (
                <div key={index} className="block-row">
                  <input
                    type="text"
                    value={block.label}
                    disabled={!canEdit}
                    onChange={e =>
                      handleChangeBlockLabel(day.key, index, e.target.value)
                    }
                  />
                  <span className="time-range">
                    {block.start} - {block.end}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <footer className="card-footer">
        <button onClick={handleSave} disabled={!canEdit}>
          Guardar plan semanal
        </button>
        <button onClick={handleLock} disabled={locked}>
          Bloquear edición esta semana
        </button>
        {locked && <p className="hint">Esta semana ya está bloqueada.</p>}
      </footer>
    </section>
  );
};
