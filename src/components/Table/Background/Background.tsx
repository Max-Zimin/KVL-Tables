/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";

import { css } from "@emotion/react";
import { useScreenshot } from "../../../hooks";
import type { IBackgroundProps } from "../../../types/props";


const src: Record<string, string> = {
  'Восход ЖЖ': "/SunriseM.png",
  'Восход МЖ': "/SunriseW.png",
  "Высшая М": "/MajorM.png",
  "Высшая Ж": "/MajorW.png",
  "Восход М": "/SunriseM.png",
  "Восход Ж": "/SunriseW.png",
};
const image = css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
`;
const childrenWrapper = css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  pointer-events: auto;
`;

const getBackgroundUrl = (label: string) => {
  const foundKey = Object.keys(src).find((key) => key === label);
  return foundKey ? src[foundKey] : "";
};

export const BackgroundCSS = styled.div`
  position: relative;
  width: 960px;
  height: 540px;
`;
export default function Background({ league, children, onClick, setHoveredCell }: IBackgroundProps) {
  const { areaRef } = useScreenshot();
  return (
    <BackgroundCSS onClick={onClick} ref={areaRef} onMouseEnter={() => setHoveredCell(null)}>
      <img css={image} alt="..." src={getBackgroundUrl(league.label)}></img>
      <div css={childrenWrapper}>{children}</div>
    </BackgroundCSS>
  );
}
