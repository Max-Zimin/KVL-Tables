import Score from "../Setters/Score";
import Place from "../Setters/Place";

import { Cell } from "./Cell";
import { Row } from "./Row";
import { colorScore } from "../../../data/stylesFunctions";
import { useContext, useRef } from "react";
import { League } from "../../../data/LeagueContext";

import { winLos, points, gameRatio } from "./CalcFunctions";
import type { IRowProps } from "../../../types/props";
import type { TypeColsNames } from "../../../types/types";
import { useLongPress } from "../../../hooks";

export default function RenderRow({
  row,
  rowIndex,
  hoveredCell,
  setHoveredCell,
  score,
  setScore,
  place,
  setPlace,
}: IRowProps) {
  const { league, setLeague } = useContext(League);
  const clickTimeoutScore = useRef<NodeJS.Timeout | number | null>(null);
  const clickTimeoutPlace = useRef<NodeJS.Timeout | number | null>(null);

  const handleLongPress = (
    rowIndex: number,
    gameIndex: number,
    gameName: TypeColsNames,
    e: React.TouchEvent<Element>
  ) => {
    if (navigator.vibrate) navigator.vibrate(100); // Вибрация 100 мс
    handleClickScore(rowIndex, gameIndex, gameName, e);
  };
  const { handleTouchStart, handleTouchEnd, handleTouchMove } = useLongPress({
    onLongPress: handleLongPress,
    delay: 500,
    isMobileOnly: true,
  });

  const handleClickScore = (
    rowIndex: number,
    gameIndex: number,
    gameName: TypeColsNames,
    e: React.MouseEvent | React.TouchEvent<Element>
  ) => {
    const setResult = (rowIndex: number, gameIndex: number) => {
      setScore({ row: rowIndex, col: gameIndex });
      setPlace({ row: null });
    };
    const clearResult = (rowIndex: number, gameIndex: number, gameName: TypeColsNames) => {
      league.data.filter((team) => team.count === rowIndex + 1)[0][gameName] = "";
      league.data.filter((team) => team.count === gameIndex + 1)[0][league.colsNames[rowIndex]] = "";
      setLeague({ ...league });
      setScore({ row: null, col: null });
      setPlace({ row: null });
    };
    if (clickTimeoutScore.current) {
      clearTimeout(clickTimeoutScore.current);
      clickTimeoutScore.current = null;
      clearResult(rowIndex, gameIndex, gameName);
    } else {
      clickTimeoutScore.current = setTimeout(() => {
        setResult(rowIndex, gameIndex);
        clickTimeoutScore.current = null;
      }, 300);
    }
    e.stopPropagation();
  };
  const handleClickPlace = (rowIndex: number, e: React.MouseEvent) => {
    const setResult = (rowIndex: number) => {
      setPlace({ row: rowIndex });
      setScore({ row: null, col: null });
    };
    const clearResult = (rowIndex: number) => {
      league.data.filter((team) => team.count === rowIndex + 1)[0].place = "";
      setScore({ row: null, col: null });
      setPlace({ row: null });
    };
    if (clickTimeoutPlace.current) {
      clearTimeout(clickTimeoutPlace.current);
      clickTimeoutPlace.current = null;
      clearResult(rowIndex);
    } else {
      clickTimeoutPlace.current = setTimeout(() => {
        setResult(rowIndex);
        clickTimeoutPlace.current = null;
      }, 300);
    }
    e.stopPropagation();
  };

  return (
    <Row key={league.rowsNames[row.count - 1]}>
      <Cell
        key={"team " + row.count}
        colIndex={0}
        rowIndex={rowIndex}
        colors={league.colors}
        length={league.colsNames.length + 6}
      >
        {row.count}
      </Cell>
      <Cell
        key={row.teamName}
        isHover={hoveredCell?.rowIndex === rowIndex || hoveredCell?.colIndex === rowIndex + 1 ? true : false}
        colIndex={1}
        rowIndex={rowIndex}
        colors={league.colors}
        length={league.colsNames.length + 6}
      >
        {row.teamName}
      </Cell>
      {league.colsNames.map((gameName: TypeColsNames, gameIndex: number) => {
        if (row.count === gameIndex + 1) {
          // игры сам с собой
          return (
            <Cell
              key={"logo" + row.count}
              countGames={league.colsNames.length}
              colIndex={gameIndex + 2}
              rowIndex={rowIndex}
              isChecked={true}
              colors={league.colors}
              length={league.colsNames.length + 6}
            >
              <img src="/KVL_logo.png" alt="" />
            </Cell>
          );
        }
        return (
          <Cell
            key={gameName}
            onMouseEnter={() => setHoveredCell({ rowIndex: rowIndex, colIndex: gameIndex + 1 })}
            onMouseLeave={() => setHoveredCell(null)}
            onClick={(event: React.MouseEvent) => handleClickScore(rowIndex, gameIndex, gameName, event)}
            onTouchStart={(event: React.TouchEvent<Element>) => handleTouchStart(rowIndex, gameIndex, gameName, event)}
            onTouchEnd={handleTouchEnd}
            onTouchMove={handleTouchMove}
            style={{ userSelect: "none" }}
            colIndex={gameIndex + 2}
            rowIndex={rowIndex}
            colors={league.colors}
            length={league.colsNames.length + 6}
          >
            <p style={colorScore(row[gameName])}> {row[gameName]}</p>
            {rowIndex === score.row && gameIndex === score.col && (
              <Score rowIndex={rowIndex} colIndex={gameIndex} gameName={gameName} setScore={setScore} />
            )}
          </Cell>
        );
      })}
      <Cell
        key={"winLos" + row.count}
        colIndex={league.colsNames.length + 2}
        rowIndex={rowIndex}
        colors={league.colors}
        length={league.colsNames.length + 6}
      >
        {winLos(league, row)}
      </Cell>
      <Cell
        key={"points" + row.count}
        colIndex={league.colsNames.length + 3}
        rowIndex={rowIndex}
        colors={league.colors}
        length={league.colsNames.length + 6}
      >
        {points(league, row)}
      </Cell>
      <Cell
        key={"gameRatio" + row.count}
        colIndex={league.colsNames.length + 4}
        rowIndex={rowIndex}
        colors={league.colors}
        length={league.colsNames.length + 6}
      >
        {gameRatio(league, row)}
      </Cell>
      <Cell
        key={"place" + row.count}
        onClick={(event: React.MouseEvent) => handleClickPlace(rowIndex, event)}
        colIndex={league.colsNames.length + 5}
        rowIndex={rowIndex}
        colors={league.colors}
        length={league.colsNames.length + 6}
      >
        {row.place}
        {rowIndex === place.row && <Place rowIndex={rowIndex} setPlace={setPlace}></Place>}
      </Cell>
    </Row>
  );
}
