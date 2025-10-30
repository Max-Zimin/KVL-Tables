import type { TypeColsNames, TypeLeague, TypeScoreVariants, TypeTableData } from "../../../types/types";


export const winLos = (league: TypeLeague, row:TypeTableData): string => {
  const resultWin = league.colsNames.reduce((acc: number, name: TypeColsNames) => {
    const score = row[name];
    if (score && league.level.winArray.includes(score as TypeScoreVariants)) {
      return acc + 1;
    }
    return acc;
  }, 0);
  const resultLos = league.colsNames.reduce((acc: number, name: TypeColsNames) => {
    const score = row[name];
    if (score && league.level.losArray.includes(score as TypeScoreVariants)) {
      return acc + 1;
    }
    return acc;
  }, 0);

  return `${resultWin}/${resultLos}`;
};
export const points = (league: TypeLeague, row:TypeTableData): number => {
  const result = league.colsNames.reduce((acc: number, name: TypeColsNames) => {
    const score = row[name];
    if (score && league.level.points[score]) {
      return acc + league.level.points[score];
    }
    return acc;
  }, 0);
  return result;
};
export const gameRatio = (league: TypeLeague, row:TypeTableData): string => {
  const partsWin = league.colsNames.reduce((acc: number, name: TypeColsNames) => {
    const score = row[name];
    if (score && (score as TypeScoreVariants)) {
      return acc + Number(score[0]);
    }
    return acc;
  }, 0);
  const partsLos = league.colsNames.reduce((acc: number, name: TypeColsNames) => {
    const score = row[name];
    if (score && (score as TypeScoreVariants)) {
      return acc + Number(score[2]);
    }
    return acc;
  }, 0);
  return `${partsWin}/${partsLos}`;
};
