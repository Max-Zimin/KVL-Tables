/** @jsxImportSource @emotion/react */

import React, { useState } from "react";
import LoginIcon from "@mui/icons-material/Login";
import { CSSTextField } from "./Inputs";
import { ModalAuth } from "./Modal";
import { OverlayAuth } from "./Overlay";
import Button from "@mui/material/Button";
import { FormControlLabel, TextField } from "@mui/material";
import type { IAuthProps } from "../../types/props";

const AuthModal: React.FC<IAuthProps> = ({ setIsOpen, onSubmit, setAccount }) => {
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<"password" | "text">("password");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(false);
    try {
      await onSubmit(login, password, setIsOpen, setAccount);
      setLogin("");
      setPassword("");
    } catch (error) {
      console.error("Ошибка при входе:", error);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <OverlayAuth>
      <ModalAuth>
        <h2>Вход</h2>
        <p style={{ color: "red" }}>{error ? "Неверный логин или пароль" : ""}</p>
        <form onSubmit={handleSubmit}>
          <TextField
            id="login"
            label="Логин"
            variant="outlined"
            autoComplete="username"
            css={CSSTextField}
            onChange={(e) => setLogin(e.target.value)}
            disabled={isLoading}
            required
          />
          <FormControlLabel
            style={{ marginLeft: "5px", marginBottom: "15px" }}
            control={
              <input
                type="checkbox"
                id="showPasswordCheckbox"
                checked={showPassword === "text" ? true : false}
                onChange={() => setShowPassword(showPassword === "password" ? "text" : "password")}
              />
            }
            label="Показать пароль"
          />

          <TextField
            id="password"
            label="Пароль"
            type={showPassword}
            autoComplete="current-password"
            variant="outlined"
            css={CSSTextField}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
            required
          />
          <Button
            size="small"
            type="submit"
            endIcon={<LoginIcon />}
            loading={isLoading}
            loadingPosition="end"
            variant="contained"
          >
            Войти
          </Button>
          {/* <ButtonAuth type="submit">Войти</ButtonAuth> */}
        </form>
      </ModalAuth>
    </OverlayAuth>
  );
};

export default AuthModal;
