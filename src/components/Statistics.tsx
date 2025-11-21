// import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import type { IStatisticsProps } from "../types/props";
import type { TypeTableData } from "../types/types";
import Skeleton from "@mui/material/Skeleton";

const StatisticsContainer = styled.div`
  width: 948px;
  color: #cacaca;
  border: 2px solid grey;
  margin-top: 10px;
  padding-left: 5px;
  padding-right: 5px;
  background-color: #444444;
  border-radius: 5px;
`;
export default function Statistics({ data }: IStatisticsProps) {
  const calculateGames = (data: TypeTableData[]) => {
    const n = data.length;
    const totalGames = (n * (n - 1)) / 2;
    let playedGames = 0;
    const gameFields = [
      "gameOne",
      "gameTwo",
      "gameThree",
      "gameFour",
      "gameFive",
      "gameSix",
      "gameSeven",
      "gameEight",
      "gameNine",
      "gameTen",
      "gameEleven",
      "gameTwelve",
      "gameThirteen",
      "gameFourteen",
      "gameFifteen",
    ];

    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        const gameField = gameFields[j];
        if (gameField && data[i][gameField as keyof TypeTableData] !== "") {
          playedGames++;
        }
      }
    }

    return { totalGames, playedGames };
  };

  if (!data || data.length === 0) {
    return (
      <Skeleton
        variant="rectangular"
        width={960}
        height={250}
        sx={{ backgroundColor: "rgb(106, 106, 106)", marginTop: "10px", borderRadius: "5px" }}
      />
    );
  }
  const { totalGames, playedGames } = calculateGames(data);

  return (
    <StatisticsContainer>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ marginLeft: "140px" }}>
          <h2>Статистика турнира</h2>
          <h3>Общее количество игр: {totalGames}</h3>
          <h3>Сыгранных игр: {playedGames}</h3>
          <h3>Осталось сыграть: {totalGames - playedGames}</h3>
        </div>
        <div style={{ marginLeft: "10px", marginRight: "140px" }}>
          <h2>Статистика по командам</h2>
          <div>
            <ul>
              {data.map((team, index) => (
                <li key={index} style={{ display: "flex", justifyContent: "space-between" }}>
                  <strong>{team.teamName + ": "}</strong>
                  {
                    Object.keys(team).filter(
                      (key) => key.startsWith("game") && team[key as keyof TypeTableData] !== ""
                    ).length
                  }{" "}
                  сыграно
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </StatisticsContainer>
  );
}
