export interface IAvatarProps {
  name: string | null; // Полная строка, например, "John Doe"
}

export type SidebarType = {
  currentLeague: string;
  setCurrentLeague: (id: string) => void;
  leagues: Record<string, ILeague> | null;
};

export type TData = {
  count: number;
  teamName: string;
  gameOne: TScoreVariants;
  gameTwo: TScoreVariants;
  gameThree: TScoreVariants;
  gameFour: TScoreVariants;
  gameFive?: TScoreVariants;
  gameSix?: TScoreVariants;
  gameSeven?: TScoreVariants;
  gameEight?: TScoreVariants;
  gameNine?: TScoreVariants;
  gameTen?: TScoreVariants;
  gameEleven?: TScoreVariants;
  gameTwelve?: TScoreVariants;
  gameThirteen?: TScoreVariants;
  gameFourteen?: TScoreVariants;
  gameFifteen?: TScoreVariants;
  place: TPlaces;
};

export type TRowsNames =
  | "rowOne"
  | "rowTwo"
  | "rowThree"
  | "rowFour"
  | "rowFive"
  | "rowSix"
  | "rowSeven"
  | "rowEight"
  | "rowNine"
  | "rowTen"
  | "rowEleven"
  | "rowTwelve"
  | "rowThirteen"
  | "rowFourteen"
  | "rowFifteen";

export type TColsNames =
  | "gameOne"
  | "gameTwo"
  | "gameThree"
  | "gameFour"
  | "gameFive"
  | "gameSix"
  | "gameSeven"
  | "gameEight"
  | "gameNine"
  | "gameTen"
  | "gameEleven"
  | "gameTwelve"
  | "gameThirteen"
  | "gameFourteen"
  | "gameFifteen";

export type TRowNamesSet = Set<TRowsNames>;
export type TColsNamesSet = Set<TColsNames>;

export type TScoreVariants = "0:3" | "1:3" | "2:3" | "3:0" | "3:1" | "3:2" | "2:1" | "1:2" | "";
export type TPlaces =
  | "I"
  | "II"
  | "III"
  | "IV"
  | "V"
  | "VI"
  | "VII"
  | "VIII"
  | "IX"
  | "X"
  | "XI"
  | "XII"
  | "XIII"
  | "XIV"
  | "XV"
  | "";
export type TPlacesSet = Set<TPlaces>;

export interface ILevel {
  winArray: TScoreVariants[];
  losArray: TScoreVariants[];
  points: Partial<Record<TScoreVariants, number>>;
}
export interface ILeague {
  leagueName: string;
  label: string;
  teamsCount: number;
  rowsNames: TRowsNames[];
  colsNames: TColsNames[];
  colors: {
    main: string;
    extra: string;
  };
  data: TData[];
  level: ILevel;
  places: TPlaces[];
}
export type TLeagues = Record<string, ILeague>;
interface TApiChildObject extends Omit<ILeague, "rowsNames" | "colsNames" | "places" | "level" | "data"> {
  level: string;
  data: string[][];
}
export type TApiGetData = Record<string, TApiChildObject>;
export type TJournalRecord= {
  name: string;
  date: string;
  time: string;
};
export type TApiGetJournal = Array<TJournalRecord>;

export type TApiPost = Record<string, (string | number)[][]> & { journal?: TJournalRecord };

export interface IChoosenLeagueProp {
  league: ILeague;
}
export interface ITableProps {
  league: ILeague;
}
export type TTableDivProps = {
  columns: string;
  rows: string;
  colors: {
    main: string;
    extra: string;
  };
};
export type TBackgroundProps = {
  league: ILeague;
  children: React.ReactNode;
  onClick: () => void;
  setHoveredCell: React.Dispatch<React.SetStateAction<IHoveredCellState | null>>;
};
export type TScoreState = {
  row: number | null;
  col: number | null;
};
export type TPlaceState = {
  row: number | null;
};
export type TPropsScore = {
  rowIndex: number;
  colIndex: number;
  gameName: TColsNames;
  setScore: React.Dispatch<React.SetStateAction<TScoreState>>;
};
export type TPropsPlace = {
  rowIndex: number;
  setPlace: React.Dispatch<React.SetStateAction<TPlaceState>>;
};
export type TRow = {
  row: TData;
  rowIndex: number;
  hoveredCell: IHoveredCellState | null;
  setHoveredCell: React.Dispatch<React.SetStateAction<IHoveredCellState | null>>;
  score: TScoreState;
  setScore: React.Dispatch<React.SetStateAction<TScoreState>>;
  place: TPlaceState;
  setPlace: React.Dispatch<React.SetStateAction<TPlaceState>>;
};
export interface IHoveredCellState {
  rowIndex: number;
  colIndex: number;
}
export interface CellHeaderProps {
  colors: {
    main: string;
    extra: string;
  };
  extraColor?: boolean;
}
export interface CellProps extends CellHeaderProps {
  colIndex: number;
  rowIndex: number;
  isChecked?: boolean;
  countGames?: number;
  length: number;
  isHover?: boolean;
}
export type TControlProps = Record<string, ILeague>;
