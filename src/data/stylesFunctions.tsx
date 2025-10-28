import type { ILeague } from "../types";

export const colorScore = (text: string | null | undefined) => {
  if (!text) return;
  return Number(text[0]) > Number(text[2]) ? { color: "red" } : { color: "blue" };
};

export function makeArrayNumbersOfGames(league: ILeague) {
  return Array.from({ length: league.teamsCount }, (_, i) => i + 1); // [1,2,3,4,5,6,7,8]
}

export function calcColumnsWidth(countGame: number[]) {
  const widths: Record<number, number> = {
    4: 89,
    5: 79,
    6: 71,
    7: 64,
    8: 59,
    9: 55,
    10: 50,
    11: 47,
    12: 43,
    13: 40,
    14: 38,
    15: 35,
  };
  const setWidth = (count: number): number => widths[count] ?? 59;
  const addedWidths = Array(4).fill(setWidth(countGame.length));
  // Применяем минимальные значения для последних трёх элементов
  addedWidths[1] = Math.max(addedWidths[1], 42);
  addedWidths[2] = Math.max(addedWidths[2], 55);
  addedWidths[3] = Math.max(addedWidths[3], 48);
  return [23, 180]
    .concat(countGame.map(() => setWidth(countGame.length)))
    .concat(addedWidths)
    .map((size) => `${size}px`)
    .join(" ");
}

export function calcRowsHeight(countGame: number[]) {
  const heights: Record<number, number> = {
    4: 90,
    5: 72,
    6: 60,
    7: 51,
    8: 45,
    9: 40,
    10: 36,
    11: 33,
    12: 30,
    13: 28,
    14: 26,
    15: 24,
  };
  return [25]
    .concat(countGame.map(() => heights[countGame.length] ?? 45))
    .map((size) => `${size}px`)
    .join(" ");
}
export function calcLogoSize(count: number): string {
  const logoSizes: Record<number, number> = {
    4: 80,
    5: 67,
    6: 55,
    7: 46,
    8: 40,
    9: 36,
    10: 36,
    11: 33,
    12: 30,
    13: 28,
    14: 26,
    15: 21,
  };
  return `${logoSizes[count] ?? 40}px`;
}
