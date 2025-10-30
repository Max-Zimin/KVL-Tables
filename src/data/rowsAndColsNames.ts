import type { TypeRowNamesSet, TypeColsNamesSet } from "../types/types";


const rowsNamesSet: TypeRowNamesSet = new Set([
  "rowOne",
  "rowTwo",
  "rowThree",
  "rowFour",
  "rowFive",
  "rowSix",
  "rowSeven",
  "rowEight",
  "rowNine",
  "rowTen",
  "rowEleven",
  "rowTwelve",
  "rowThirteen",
  "rowFourteen",
  "rowTwelve",
]);

const colsNameSet: TypeColsNamesSet = new Set([
  "gameOne",
  "gameTwo",
  "gameThree",
  "gameFour",
  "gameFive",
  "gameSix",
  "gameSeven",
  "gameEight",
  "gameNine",
  "gameTen",
  "gameEleven",
  "gameTwelve",
  "gameThirteen",
  "gameFourteen",
  "gameFifteen",
]);
export const rowsNamesArray = Array.from(rowsNamesSet);
export const colsNamesArray = Array.from(colsNameSet);
