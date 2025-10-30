import type { TypeApiGetJournal, TypeLeague } from "./types";

export type TypeScoreState = {
  row: number | null;
  col: number | null;
};
export type TypePlaceState = {
  row: number | null;
};
export type TypeHoveredCellState = {
  rowIndex: number;
  colIndex: number;
};
export type TypeSetIsOpen = React.Dispatch<React.SetStateAction<boolean>>;
export type TypeSetAccount = React.Dispatch<React.SetStateAction<string | null>>;
export type TypeSetHoveredCell = React.Dispatch<React.SetStateAction<TypeHoveredCellState | null>>;
export type TypeSetScore = React.Dispatch<React.SetStateAction<TypeScoreState>>;
export type TypeSetPlace = React.Dispatch<React.SetStateAction<TypePlaceState>>;
export type TypeSetJournal = React.Dispatch<React.SetStateAction<TypeApiGetJournal | null>>;
export type TypeSetLeague = React.Dispatch<React.SetStateAction<TypeLeague | null>>;
