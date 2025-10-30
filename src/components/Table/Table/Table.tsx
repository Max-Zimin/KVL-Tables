import styled from "@emotion/styled";
import type { ITableDivProps } from "../../../types/props";


export const Table = styled.div<ITableDivProps>`
  display: grid;
  grid-template-columns: ${(props) => props.columns};
  grid-template-rows: ${(props) => props.rows};
  margin-top: 125px;
  margin-left: 15px;
  position: absolute;
  border-radius: 10px;
  border: 10px solid ${(props) => props.colors.extra};
  text-align: center;
  justify-content: center;
  font-weight: 600;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
`;