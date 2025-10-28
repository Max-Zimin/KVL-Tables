import type { ILeague, ILevel, TColsNames, TData, TPlaces, TRowsNames } from "../types";

export class League {
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
  constructor({ leagueName, label, teamsCount, rowsNames, colsNames,colors, data, level, places }: ILeague) {
    this.leagueName = leagueName;
    this.label = label;
    this.teamsCount = teamsCount;
    this.rowsNames = rowsNames.slice(0, teamsCount);
    this.colsNames = colsNames.slice(0, teamsCount);
    this.colors = colors;
    this.data = data;
    this.level = level;
    this.places = places.slice(0, teamsCount);
  }
}
