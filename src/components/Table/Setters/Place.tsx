import { useContext } from "react";
import { colorScore } from "../../../data/stylesFunctions";
import { League } from "../../../data/LeagueContext";
import { ContainerChoose, ElementChoose } from "./Choose";

import type { TPropsPlace, TPlaces } from "../../../types";




export default function Place({ rowIndex, setPlace }: TPropsPlace) {
  const {league} = useContext(League);
  const addPlace = (text: TPlaces, e: React.MouseEvent) => {
    if (text) {
      league.data.filter((team) => team.count === rowIndex + 1)[0].place = text;
      setPlace({ row: null });
    }
    e.stopPropagation();
  };
  return (
    <ContainerChoose>
      {league.places.map((text) => {
        return (
          <ElementChoose
            style={colorScore(text)}
            key={"place" + rowIndex + text}
            onClick={(event) => addPlace(text, event)}
          >
            {text}
          </ElementChoose>
        );
      })}
    </ContainerChoose>
  );
}
