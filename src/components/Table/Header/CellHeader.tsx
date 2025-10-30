import styled from "@emotion/styled";
import type { ICellHeaderProps } from "../../../types/props";


export const CellHeader = styled.div<ICellHeaderProps>`
  border: 1px solid #000;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background-color: ${(props) => (props.extraColor ? props.colors.extra : props.colors.main)};
  font-size: 13px;
`;