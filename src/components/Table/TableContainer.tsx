import RenderRow from "./Row/RenderRow";
import Background from "./Background/Background";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

import { useState } from "react";
import { calcColumnsWidth, calcRowsHeight, makeArrayNumbersOfGames } from "../../data/stylesFunctions";
import { Table } from "./Table/Table";
import { CellHeader } from "./Header/CellHeader";
import { RowHeader } from "./Header/RowHeader";
import { Button, Tooltip, Zoom } from "@mui/material";

import type { IHoveredCellState, ITableProps, TPlaceState, TScoreState } from "../../types";

export default function TableContainer({ league }: ITableProps) {
  const [hoveredCell, setHoveredCell] = useState<IHoveredCellState | null>(null);
  const [score, setScore] = useState<TScoreState>({ row: null, col: null });
  const [place, setPlace] = useState<TPlaceState>({ row: null });
  const deleteScoreAndPlace = () => {
    setScore({ row: null, col: null });
    setPlace({ row: null });
  };

  const countGame: number[] = makeArrayNumbersOfGames(league);
  const columnsWight = calcColumnsWidth(countGame);
  const rowsHeight = calcRowsHeight(countGame);

  const helperText = `1. Выберите нужную лигу в левой части страницы.

2. Чтобы добавить результат матча нажмите на ячейку нужного матча. 
   В появившемся окне выберите верный счет. 
   Счет в столбце второй команды проставится автоматически.

3. При необходимости удалить результат из таблицы: 
    * для ПК: необходимо сделать двойной щелчок мыши на нужной ячейке
    * для телефона необходимо сделать длительное нажатие на нужной ячейке.
Результат в столбце второй команды удалится автоматически.

4. Аналогичным образом заполняется столбец "Место".

5. Столбцы: "П/п", "Очки", "Партии" расчитываются автоматически.

6. По завершению заполнения таблиц нажмите кнопку "СОХРАНИТЬ РЕЗУЛЬТАТЫ".
   Нет необходимости нажимать ее после заполнения каждой таблицы,
   достаточно нажать после заполнения всех таблиц.
   
7. Не закрывайте страницу до завершения сохранения.
  `;

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
        <Tooltip
          title={
            <p
              style={{
                fontSize: "18px",
                whiteSpace: "pre-wrap",
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              {helperText}
            </p>
          }
          placement="right-end"
          slots={{
            transition: Zoom,
          }}
          slotProps={{
            tooltip: {
              sx: {
                backgroundColor: "rgba(0, 0, 0, 0.9)",
                maxWidth: "1000px",
                padding: "40px",
              },
            },
          }}
        >
          <Button>
            <HelpOutlineIcon style={{ fontSize: "40px" }} />
          </Button>
        </Tooltip>
      </div>
    </div>
  );
}
