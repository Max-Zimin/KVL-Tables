import type { TypeLevel } from "../types/types";


export const major: TypeLevel = {
  winArray: ["3:0", "3:1", "3:2"],
  losArray: ["0:3", "1:3", "2:3"],
  points: {
    "3:0": 3,
    "3:1": 3,
    "3:2": 2,
    "2:3": 1,
    "1:3": 0,
    "0:3": 0,
  },
};
export const sunrise: TypeLevel = {
  winArray: ["3:0", "2:1"],
  losArray: ["1:2", "0:3"],
  points: {
    "3:0": 3,
    "2:1": 2,
    "1:2": 1,
    "0:3": 0,
  },
};
