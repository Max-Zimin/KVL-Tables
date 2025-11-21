import type {
  TypeHoveredCellState,
  TypePlaceState,
  TypeScoreState,
  TypeSetAccount,
  TypeSetHoveredCell,
  TypeSetIsOpen,
  TypeSetJournal,
  TypeSetPlace,
  TypeSetScore,
} from "./states";
import type { TypeColsNames, TypeLeague, TypeLeagues, TypeTableData } from "./types";

export interface IAuthProps {
  setIsOpen: TypeSetIsOpen;
  setAccount: TypeSetAccount;
  onSubmit: (
    login: string,
    password: string,
    setIsOpen: TypeSetIsOpen,
    setAccount: TypeSetAccount
  ) => Promise<void>;
}
export interface IHeaderProps {
  account: string | null;
  setIsOpen: TypeSetIsOpen;
  setAccount: TypeSetAccount;
}
export interface IAccountProps {
  name: string | null;
  setIsOpen: TypeSetIsOpen;
  setAccount: TypeSetAccount;
}
export interface ISidebarProps {
  currentLeague: string;
  setCurrentLeague: (id: string) => void;
  leagues: TypeLeagues | null;
}
export interface ITableProps {
  league: TypeLeague;
}
export interface IBackgroundProps {
  league: TypeLeague;
  children: React.ReactNode;
  onClick: () => void;
  setHoveredCell: TypeSetHoveredCell;
}
export interface ITableDivProps {
  columns: string;
  rows: string;
  colors: {
    main: string;
    extra: string;
  };
}
export interface ICellHeaderProps {
  colors: {
    main: string;
    extra: string;
  };
  extraColor?: boolean;
}
export interface ICellProps extends ICellHeaderProps {
  colIndex: number;
  rowIndex: number;
  isChecked?: boolean;
  countGames?: number;
  length: number;
  isHover?: boolean;
}
export interface IRowProps {
  row: TypeTableData;
  rowIndex: number;
  hoveredCell: TypeHoveredCellState | null;
  setHoveredCell: TypeSetHoveredCell;
  score: TypeScoreState;
  setScore: TypeSetScore;
  place: TypePlaceState;
  setPlace: TypeSetPlace;
}
export interface IScoreProps {
  rowIndex: number;
  colIndex: number;
  gameName: TypeColsNames;
  setScore: TypeSetScore;
}
export interface IPlaceProps {
  rowIndex: number;
  setPlace: TypeSetPlace;
}
export interface IStatisticsProps {
  data: TypeTableData[] | undefined;
}
export interface IControlProps {
  leagues: TypeLeagues | null;
  account: string | null;
  setJournal: TypeSetJournal;
  currentLeague: string;
}
