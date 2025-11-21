import RenderRow from "./Row/RenderRow";
import Background from "./Background/Background";

import { useState } from "react";
import { calcColumnsWidth, calcRowsHeight, makeArrayNumbersOfGames } from "../../data/stylesFunctions";
import { Table } from "./Table/Table";
import { CellHeader } from "./Header/CellHeader";
import { RowHeader } from "./Header/RowHeader";
import type { ITableProps } from "../../types/props";
import type { TypeHoveredCellState, TypePlaceState, TypeScoreState } from "../../types/states";
import Statistics from "../Statistics";

export default function TableContainer({ league }: ITableProps) {
  const [hoveredCell, setHoveredCell] = useState<TypeHoveredCellState | null>(null);
  const [score, setScore] = useState<TypeScoreState>({ row: null, col: null });
  const [place, setPlace] = useState<TypePlaceState>({ row: null });
  const deleteScoreAndPlace = () => {
    setScore({ row: null, col: null });
    setPlace({ row: null });
  };

  const countGame: number[] = makeArrayNumbersOfGames(league);
  const columnsWight = calcColumnsWidth(countGame);
  const rowsHeight = calcRowsHeight(countGame);

  return (
    <div>
      <Background league={league} setHoveredCell={setHoveredCell} onClick={deleteScoreAndPlace}>
        <Table columns={columnsWight} rows={rowsHeight} colors={league.colors}>
          <RowHeader>
            <CellHeader colors={league.colors}>№</CellHeader>
            <CellHeader colors={league.colors}>Название команды</CellHeader>
            {countGame.map((num: number) => (
              <CellHeader colors={league.colors} key={"headColsNumber" + num}>
                {num}
              </CellHeader>
            ))}
            <CellHeader colors={league.colors} extraColor={true}>
              П/п
            </CellHeader>
            <CellHeader colors={league.colors}>Очки</CellHeader>
            <CellHeader colors={league.colors}>Партии</CellHeader>
            <CellHeader colors={league.colors} extraColor={true}>
              Место
            </CellHeader>
          </RowHeader>
          {league.data.map((row, index) => (
            <RenderRow
              key={"row" + index}
              row={row}
              rowIndex={index}
              hoveredCell={hoveredCell}
              setHoveredCell={setHoveredCell}
              score={score}
              setScore={setScore}
              place={place}
              setPlace={setPlace}
            />
          ))}
        </Table>
      </Background>
      <div style={{ display: "flex", width: "100%" }}>

        <Statistics data={league?.data}/>
      </div>
    </div>
  );
}
