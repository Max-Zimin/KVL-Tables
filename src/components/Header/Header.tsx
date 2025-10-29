/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import Account from "./Account";
import { Skeleton, Tooltip } from "@mui/material";
import type { IHeaderProps } from "../../types";

const HeadCSS = css`
  width: 100%;
  justify-content: space-between;
  position: relative;
  display: flex;
  height: 162px;
  background: linear-gradient(to right, #ffffff, #062a76, #062a76, #1e2578);
  border-bottom: 4px solid #000000;
`;
const CSSlogo = css`
  position: absolute;
  height: 218px;
  top: 0;
  left: 0;
  z-index: 9;
`;

const CSScover = css`
  /* margin-left: 130px; */
  margin-left: 20px;
  height: 162px;
`;
const CSSvk = css`
  position: absolute;
  right: 120px;
  top: 60px;
`;
const CSSimg = css`
  height: 100px;
  &:hover {
    height: 110px;
  }
`;
const CSSskeleton = css`
  position: absolute;
  border: 2px solid black;
  right: 12px;
  top: 10px;
  background-color: #4d4d4d;
`;

export function Header({ account, setIsOpen, setAccount }: IHeaderProps) {
  return (
    <div css={HeadCSS}>
      <img css={CSSlogo} src="KVL_logo.png" alt="" />
      <img css={CSScover} alt="" src="KVLoblozhka.png"></img>
      {account ? (
        <Account name={account} setIsOpen={setIsOpen} setAccount={setAccount}></Account>
      ) : (
        <Skeleton variant="circular" width={40} height={40} css={CSSskeleton} />
      )}
      <Tooltip
        title="https://vk.com/klvl40"
        placement="top"
        slotProps={{
          popper: {
            modifiers: [
              {
                name: "offset",
                options: {
                  offset: [0, -14],
                },
              },
            ],
          },
        }}
      >
        <a css={CSSvk} href="https://vk.com/klvl40" target="_blank" rel="noopener noreferrer">
          <img css={CSSimg} src="VKicon.png" alt="VK" />
        </a>
      </Tooltip>
    </div>
  );
}
