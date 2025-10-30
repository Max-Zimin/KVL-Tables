import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { calcLogoSize } from "../../../data/stylesFunctions";
import type { ICellProps } from "../../../types/props";

export const Cell = styled.div<ICellProps>`
  border: 1px solid #000;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  ${(
    { isChecked, colors, countGames } // логотип, игра сам с собой
  ) =>
    isChecked && countGames &&
    css`
      background-color: ${colors.main} !important;
      & > img {
        width: ${calcLogoSize(countGames)};
      }
    `}

  ${(
    { isHover } // наведение мыши
  ) =>
    isHover &&
    css`
      font-size: 113% !important;
      text-shadow: 0 0 0.5em blue;
    `}

  ${(
    { rowIndex } // четные / нечетные строки
  ) =>
    rowIndex % 2 === 0
      ? css`
          background-color: #fefefe; /*четные */
        `
      : css`
          background-color: #ebfacf; /*нечетные*/
        `}
   // столбцы
  ${({ colIndex, length, colors }) => {
    // первый столбец
    if (colIndex === 0) {
      return css`
        background-color: ${colors.main};
      `;
    }
    // второй столбец
    if (colIndex === 1) {
      return css`
        font-size: 108%;
        font-family: Verdana, Geneva, Tahoma, sans-serif;
        font-weight: 600;
      `;
    }
    // столбец Победы
    if (colIndex === length - 4) {
      return css`
        background-color: ${colors.extra};
        font-size: 14px;
      `;
    }
    // стобец Очки
    if (colIndex === length - 3) {
      return css`
        background-color: ${colors.main};
        font-size: 14px;
      `;
    }
    // столбец Партии
    if (colIndex === length - 2) {
      return css`
        background-color: ${colors.main};
        font-size: 14px;
      `;
    }
    // столбец Место
    if (colIndex === length - 1) {
      return css`
        background-color: ${colors.extra};
        font-size: 20px;
      `;
    }
    return null;
  }}
`;
