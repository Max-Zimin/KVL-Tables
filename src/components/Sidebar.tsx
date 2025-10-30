/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Skeleton } from "@mui/material";
import type { ISidebarProps } from "../types/props";

const container = css`
  height: 100vh;
  background-color: #222222;
  min-width: 250px;
  padding-top: 50px;
  border-right: 3px solid #000000;
`;
const buttonsGroup = css`
  position: sticky;
  top: 150px;
`;
const buttonCSS = (checked: boolean) => css`
  width: 250px;
  height: 90px;
  min-width: 180px;
  border: 1px solid ${checked ? "#0022ff" : "#ff005d"};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  user-select: none;
  font-size: 25px;
  font-weight: bold;
  color: ${checked ? "#ffffff" : "#333"};
  background-color: ${checked ? " #142da4" : "#eff4ff"};
  box-sizing: border-box;
  line-height: 1;
  padding: 10px;
  padding-left: 40px;
  &:hover {
    background-color: ${checked ? null : "#dedede"};
  }
`;

const leagueNameRadio = css`
  display: none;
`;

export default function Sidebar({ currentLeague, setCurrentLeague, leagues }: ISidebarProps) {
  return (
    <>
      <div css={container}>
        <div css={buttonsGroup}>
          {leagues
            ? Object.values(leagues).map(({ leagueName, label }) => (
                <label key={leagueName} css={buttonCSS(currentLeague === label)}>
                  <input
                    css={leagueNameRadio}
                    type="radio"
                    name="league"
                    // value={leagueName}
                    onChange={() => setCurrentLeague(label)}
                    checked={currentLeague === label}
                  ></input>
                  {leagueName}
                </label>
              ))
            : [1, 2, 3, 4].map((n) => {
                return (
                  <Skeleton
                    variant="rectangular"
                    width={250}
                    height={90}
                    sx={{ backgroundColor: "#4d4d4d", margin: "1px" }}
                    key={"Skeleton_sidebar" + n}
                  />
                );
              })}
        </div>
      </div>
    </>
  );
}
