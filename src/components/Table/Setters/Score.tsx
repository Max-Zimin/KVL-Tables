import { useContext } from "react";
import { colorScore } from "../../../data/stylesFunctions";
import { League } from "../../../data/LeagueContext";
import { ContainerChoose, ElementChoose } from "./Choose";

import type { TPropsScore, TScoreVariants } from "../../../types";


export default function Score({ rowIndex, colIndex, gameName, setScore }: TPropsScore) {
  const {league, setLeague} = useContext(League);
  const invertResult = (text: TScoreVariants) => {
    return `${text[2]}:${text[0]}` as TScoreVariants;
  };
  const addResult = (text: TScoreVariants, event: React.MouseEvent) => {
    league.data.filter((team) => team.count === rowIndex + 1)[0][gameName] = text;

    league.data.filter((team) => team.count === colIndex + 1)[0][league.colsNames[rowIndex]] = invertResult(text);
    setLeague({...league});
    setScore({ row: null, col: null });
    event.stopPropagation();
  };

  const scoreText = league.level.winArray.concat(league.level.losArray);
  return (
    <ContainerChoose>
      {scoreText.map((text) => {
        return (
          <ElementChoose
            style={colorScore(text)}
            key={"score" + rowIndex + colIndex + text}
            onClick={(event) => addResult(text, event)}
          >
            {text}
          </ElementChoose>
        );
      })}
    </ContainerChoose>
  );
}
