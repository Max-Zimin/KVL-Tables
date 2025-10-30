import type { TypeRowsNames, TypeColsNames, TypeTableData, TypeLevel, TypePlaces, TypeLeague } from "../types/types";

export class League {
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
  constructor({ leagueName, label, teamsCount, rowsNames, colsNames,colors, data, level, places }: TypeLeague) {
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
