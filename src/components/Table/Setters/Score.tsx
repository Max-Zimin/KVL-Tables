import { useContext } from "react";
import { colorScore } from "../../../data/stylesFunctions";
import { League } from "../../../data/LeagueContext";
import { ContainerChoose, ElementChoose } from "./Choose";
import type { IScoreProps } from "../../../types/props";
import type { TypeScoreVariants } from "../../../types/types";

export default function Score({ rowIndex, colIndex, gameName, setScore }: IScoreProps) {
  const {league, setLeague} = useContext(League);
  const invertResult = (text: TypeScoreVariants) => {
    return `${text[2]}:${text[0]}` as TypeScoreVariants;
  };
  const addResult = (text: TypeScoreVariants, event: React.MouseEvent) => {
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
