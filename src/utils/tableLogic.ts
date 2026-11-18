import { Club, INITIAL_CLUB_ORDER, MAN_UNITED_ID, UNITED_START_POSITION } from "../data/clubs";

export function buildInitialTable(): Club[] {
  return [...INITIAL_CLUB_ORDER];
}

export function getUnitedPosition(table: Club[]): number {
  const index = table.findIndex((c) => c.id === MAN_UNITED_ID);
  return index >= 0 ? index + 1 : UNITED_START_POSITION;
}

/**
 * Move Manchester United to targetPosition (1–20); other clubs shift by one.
 */
export function moveUnitedToPosition(table: Club[], targetPosition: number): Club[] {
  const pos = Math.min(20, Math.max(1, Math.round(targetPosition)));
  const currentIndex = table.findIndex((c) => c.id === MAN_UNITED_ID);
  if (currentIndex < 0) return table;

  const targetIndex = pos - 1;
  if (currentIndex === targetIndex) return [...table];

  const united = table[currentIndex];
  const rest = table.filter((c) => c.id !== MAN_UNITED_ID);
  const next = [...rest];
  next.splice(targetIndex, 0, united);
  return next;
}

export function resetTable(): Club[] {
  return buildInitialTable();
}