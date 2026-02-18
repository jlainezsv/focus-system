export function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

export function getPreviousDateISO(dateISO: string): string {
  const d = new Date(dateISO);
  d.setDate(d.getDate() - 1);
  return d.toISOString().slice(0, 10);
}
