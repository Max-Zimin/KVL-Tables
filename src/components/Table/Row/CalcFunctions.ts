import type { ILeague, TColsNames, TData, TScoreVariants } from "../../../types";

export const winLos = (league: ILeague, row:TData): string => {
  const resultWin = league.colsNames.reduce((acc: number, name: TColsNames) => {
    const score = row[name];
    if (score && league.level.winArray.includes(score as TScoreVariants)) {
      return acc + 1;
    }
    return acc;
  }, 0);
  const resultLos = league.colsNames.reduce((acc: number, name: TColsNames) => {
    const score = row[name];
    if (score && league.level.losArray.includes(score as TScoreVariants)) {
      return acc + 1;
    }
    return acc;
  }, 0);

  return `${resultWin}/${resultLos}`;
};
export const points = (league: ILeague, row:TData): number => {
  const result = league.colsNames.reduce((acc: number, name: TColsNames) => {
    const score = row[name];
    if (score && league.level.points[score]) {
      return acc + league.level.points[score];
    }
    return acc;
  }, 0);
  return result;
};
export const gameRatio = (league: ILeague, row:TData): string => {
  const partsWin = league.colsNames.reduce((acc: number, name: TColsNames) => {
    const score = row[name];
    if (score && (score as TScoreVariants)) {
      return acc + Number(score[0]);
    }
    return acc;
  }, 0);
  const partsLos = league.colsNames.reduce((acc: number, name: TColsNames) => {
    const score = row[name];
    if (score && (score as TScoreVariants)) {
      return acc + Number(score[2]);
    }
    return acc;
  }, 0);
  return `${partsWin}/${partsLos}`;
};
