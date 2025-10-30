import { api } from "./api";
import { League } from "../data/classLeague";
import { major, sunrise } from "../data/levels";
import { placesArray } from "../data/places";
import { colsNamesArray, rowsNamesArray } from "../data/rowsAndColsNames";
import type { TypeApiGetData, TypeApiGetJournal, TypeLeagues, TypeLevel, TypePlaces, TypeScoreVariants, TypeTableData } from "../types/types";


export const getDataFromApi = async (): Promise<TypeLeagues> => {
  const makeDataFromArray = (value: string[][]): TypeTableData[] => {
    return value.map((data) => {
      const count = Number(data[0]);
      const teamName = data[1];
      const place = data[data.length - 1];
      const games = data.slice(2, -1);
      const result: Partial<TypeTableData> = {
        count: count,
        teamName: teamName,
      };
      games.forEach((game, index) => {
        const key = colsNamesArray[index];
        if (key) result[key] = game as TypeScoreVariants;
      });
      result.place = place as TypePlaces;

      return result as TypeTableData;
    });
  };
  const dataApi: TypeApiGetData | TypeApiGetJournal = await api.getData("data");
  return Object.fromEntries(
    Object.entries(dataApi).map(([key, value]) => {
      const level: TypeLevel = value.level === "major" ? major : value.level === "sunrise" ? sunrise : major; // если оба ложны запишитеся как высшая лига
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

export const getJournalFromApi = async (): Promise<TypeApiGetJournal> => {
  const dataApi: TypeApiGetData | TypeApiGetJournal = await api.getData("journal");
  return dataApi as TypeApiGetJournal;
};
