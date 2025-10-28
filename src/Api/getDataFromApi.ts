import { api } from "./api";
import { League } from "../data/classLeague";
import { major, sunrise } from "../data/levels";
import { placesArray } from "../data/places";
import { colsNamesArray, rowsNamesArray } from "../data/rowsAndColsNames";

import type { ILevel, TApiGetData, TApiGetJournal, TData, TLeagues, TPlaces, TScoreVariants } from "../types";

export const getDataFromApi = async (): Promise<TLeagues> => {
  const makeDataFromArray = (value: string[][]): TData[] => {
    return value.map((data) => {
      const count = Number(data[0]);
      const teamName = data[1];
      const place = data[data.length - 1];
      const games = data.slice(2, -1);
      const result: Partial<TData> = {
        count: count,
        teamName: teamName,
      };
      games.forEach((game, index) => {
        const key = colsNamesArray[index];
        if (key) result[key] = game as TScoreVariants;
      });
      result.place = place as TPlaces;

      return result as TData;
    });
  };
  const dataApi: TApiGetData | TApiGetJournal = await api.getData("data");
  return Object.fromEntries(
    Object.entries(dataApi).map(([key, value]) => {
      const level: ILevel = value.level === "major" ? major : value.level === "sunrise" ? sunrise : major; // если оба ложны запишитеся как высшая лига
      const data = makeDataFromArray(value.data);
      return [
        key,
        new League({
          leagueName: value.leagueName,
          label: value.label,
          teamsCount: value.teamsCount,
          rowsNames: rowsNamesArray,
          colsNames: colsNamesArray,
          colors: {
            main: value.colors.main,
            extra: value.colors.extra,
          },
          data: data,
          level: level,
          places: placesArray,
        }),
      ];
    })
  );
};

export const getJournalFromApi = async (): Promise<TApiGetJournal> => {
  const dataApi: TApiGetData | TApiGetJournal = await api.getData("journal");
  return dataApi as TApiGetJournal;
};
