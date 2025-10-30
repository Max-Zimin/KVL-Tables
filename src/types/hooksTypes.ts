import type { TypeColsNames } from "./types";

export interface IUseLongPressOptions {
  onLongPress: (rowIndex: number, gameIndex: number, gameName: TypeColsNames, e: React.TouchEvent<Element>) => void;
  delay?: number;
}
