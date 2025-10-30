import styled from "@emotion/styled";
import { useState } from "react";
import Button from "@mui/material/Button";
import LogoutIcon from "@mui/icons-material/Logout";
import { logout } from "../../Api/apiFirebase";
import type { IAccountProps } from "../../types/props";

const Avatar = styled.div<{ isHovered: boolean }>`
  position: absolute;
  border: 2px solid black;
  background: #9c27b0;
  right: 30px;
  top: 10px;
  width: ${(props) => (props.isHovered ? "200px" : "40px")};
  height: 40px;
  border-radius: ${(props) => (props.isHovered ? "20px" : "50%")};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const Letter = styled.span<{ isHovered: boolean }>`
  color: white;
  font-size: 24px;
  font-weight: bold;
  transition: opacity 0.2s ease; /* Плавное исчезновение */
  opacity: ${(props) => (props.isHovered ? 0 : 1)}; /* Управляем через props — эквивалент .avatar:hover .letter */
`;

const FullName = styled.span<{ isHovered: boolean }>`
  position: absolute;
  opacity: ${(props) => (props.isHovered ? 1 : 0)}; /* Управляем через props — эквивалент .avatar:hover .full-name */
  color: white;
  font-size: 16px;
  font-weight: bold;
  white-space: nowrap; /* Не переносим на новую строку */
  transition: opacity 0.2s ease; /* Плавное появление */
`;

const Account = ({ name, setIsOpen, setAccount }: IAccountProps) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  if (!name) return null;

  const firstLetter = name.charAt(0).toUpperCase();
  const hasTouch = "ontouchstart" in window;

  return (
    <Avatar
      isHovered={isHovered}
      onMouseEnter={!hasTouch ? () => setIsHovered(true) : undefined}
      onMouseLeave={!hasTouch ? () => setIsHovered(false) : undefined}
    >
      <Letter isHovered={isHovered} onClick={hasTouch ? () => setIsHovered(!isHovered) : undefined}>
        {firstLetter}
      </Letter>
      <FullName isHovered={isHovered} onClick={hasTouch ? () => setIsHovered(!isHovered) : undefined}>
        {name}
        <Button
          onClick={() => logout(setIsOpen, setAccount)}
          style={{ paddingRight: "0px" }}
          endIcon={<LogoutIcon />}
        />
      </FullName>
    </Avatar>
  );
};

export default Account;
