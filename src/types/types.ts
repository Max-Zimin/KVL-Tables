import type { RefObject } from "react";

export type TypeLeagues = Record<string, TypeLeague>;
export type TypeTableData = {
  count: number;
  teamName: string;
  gameOne: TypeScoreVariants;
  gameTwo: TypeScoreVariants;
  gameThree: TypeScoreVariants;
  gameFour: TypeScoreVariants;
  gameFive?: TypeScoreVariants;
  gameSix?: TypeScoreVariants;
  gameSeven?: TypeScoreVariants;
  gameEight?: TypeScoreVariants;
  gameNine?: TypeScoreVariants;
  gameTen?: TypeScoreVariants;
  gameEleven?: TypeScoreVariants;
  gameTwelve?: TypeScoreVariants;
  gameThirteen?: TypeScoreVariants;
  gameFourteen?: TypeScoreVariants;
  gameFifteen?: TypeScoreVariants;
  place: TypePlaces;
};
export type TypeLeague = {
  leagueName: string;
  label: string;
  teamsCount: number;
  rowsNames: TypeRowsNames[];
  colsNames: TypeColsNames[];
  colors: {
    main: string;
    extra: string;
  };
  data: TypeTableData[];
  level: TypeLevel;
  places: TypePlaces[];
};
export type TypeLevel = {
  winArray: TypeScoreVariants[];
  losArray: TypeScoreVariants[];
  points: Partial<Record<TypeScoreVariants, number>>;
};
export type TypeRowsNames =
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

export type TypeColsNames =
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

export type TypeRowNamesSet = Set<TypeRowsNames>;
export type TypeColsNamesSet = Set<TypeColsNames>;

export type TypeScoreVariants = "0:3" | "1:3" | "2:3" | "3:0" | "3:1" | "3:2" | "2:1" | "1:2" | "";
export type TypePlaces =
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
export type TypePlacesSet = Set<TypePlaces>;

interface IApiChildObject extends Omit<TypeLeague, "rowsNames" | "colsNames" | "places" | "level" | "data"> {
  level: string;
  data: string[][];
}
type TypeJournalRecord = {
  name: string;
  date: string;
  time: string;
};
export type TypeApiGetJournal = Array<TypeJournalRecord>;
export type TypeApiGetData = Record<string, IApiChildObject>;
export type TypeApiPost = Record<string, (string | number)[][]> & { journal?: TypeJournalRecord };
export type TypeScreenshotContext = {
  areaRef: RefObject<HTMLDivElement | null>;
}

// export interface IChoosenLeagueProp {
//   league: ILeague;
// }
