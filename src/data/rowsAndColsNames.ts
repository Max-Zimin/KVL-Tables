import type { TRowNamesSet, TColsNamesSet } from "../types";


const rowsNamesSet: TRowNamesSet = new Set([
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

const colsNameSet: TColsNamesSet = new Set([
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
