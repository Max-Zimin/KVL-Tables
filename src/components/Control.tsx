import styled from "@emotion/styled";
import Button from "@mui/material/Button";
import SaveIcon from "@mui/icons-material/Save";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import ScreenshotMonitorIcon from "@mui/icons-material/ScreenshotMonitor";
import Snackbar from "@mui/material/Snackbar";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import Zoom from "@mui/material/Zoom";

import { printScreen } from "../printScreen";
import { useScreenshot } from "../hooks";
import { useState } from "react";
import { api } from "../Api/api";

import type { TypeApiPost, TypeLeagues } from "../types/types";
import { Skeleton, Tooltip } from "@mui/material";
import { savePrintScreen } from "../savePrintScreen";
import type { IControlProps } from "../types/props";
import type { TypeSetJournal } from "../types/states";

const Controls = styled.div``;

export default function Control({ leagues, account, setJournal, currentLeague }: IControlProps) {
  const [loadingButtonSave, setLoadingButtonSave] = useState(false);
  const [loadingButtonPrintScreen, setLoadingButtonPrintScreen] = useState(false);
  const [loadingSavePrintScreen, setLoadingButtonSavePrintScreen] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const { areaRef } = useScreenshot();

  const closeMolal = () => {
    setMessage(null);
    setLoadingButtonSave(false);
    setLoadingButtonPrintScreen(false);
    setLoadingButtonSavePrintScreen(false);
  };
  const handleSavePrintScreen = async (currentLeague: string) => {
    if (areaRef.current) {
      setLoadingButtonSavePrintScreen(true);
      const result = await savePrintScreen(areaRef.current, currentLeague);
      setMessage(result);
    }
  };
  const handlePrintScreen = async () => {
    if (areaRef.current) {
      setLoadingButtonPrintScreen(true);
      const result = await printScreen(areaRef.current);
      setMessage(result);
    }
  };
  const handleSave = async (
    leagues: TypeLeagues,
    account: string | null,
    setJournal: TypeSetJournal
  ) => {
    setLoadingButtonSave(true);
    const convertObjectForSendToApi = (leaguesData: TypeLeagues) => {
      const keys = Object.keys(leaguesData);

      const result = Object.fromEntries(
        keys.map((key) => [key, leaguesData[key].data.map((obj) => Object.values(obj))])
      );

      return result;
    };
    const makeRecordInJournal = (account: string | null) => {
      if (!account) return;
      function getTodayDateString(): string {
        const today = new Date();
        const day = String(today.getDate()).padStart(2, "0");
        const month = String(today.getMonth() + 1).padStart(2, "0");
        const year = today.getFullYear();
        return `${day}.${month}.${year}`;
      }
      function getCurrentTimeString(): string {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, "0");
        const minutes = String(now.getMinutes()).padStart(2, "0");
        return `${hours}:${minutes}`;
      }

      const name = account;
      const date = getTodayDateString();
      const time = getCurrentTimeString();
      const journal = {
        name: name,
        date: date,
        time: time,
      };
      return journal;
    };

    const apiData: TypeApiPost = convertObjectForSendToApi(leagues);
    apiData.journal = makeRecordInJournal(account);
    try {
      await api.saveData(apiData);
      setJournal(null);
      setMessage("Сохранено");
    } catch (err) {
      if (err instanceof Error) setMessage(err.message);
      throw err;
    }
  };
  const helperTextSave = `Чтобы создать скриншот в буфер обмена, нажмите "СОЗДАТЬ СКРИНШОТ".
(Удобно для отправки изображений).

Чтобы сохранить изображение в галерею или на компьютер нажмите "СОХРАНИТЬ КАРТИНКУ".
(Удобно, если необходимо выложить пост из галереи).

Для удобства перехода к группе КВЛ на страницу ВК есть ссылка в правом верхнем углу страницы.`;
  const helperTextTable = `1. Выберите нужную лигу в левой части страницы.

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
    <Controls>
      <div style={{ display: "flex", width: "100%" }}>
        <Tooltip
          enterTouchDelay={200}
          leaveTouchDelay={6000}
          title={
            <p
              style={{
                fontSize: "18px",
                whiteSpace: "pre-wrap",
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              {helperTextTable}
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
        <Tooltip
          sx={{ marginLeft: "auto", fontSize: "16px" }}
          enterTouchDelay={200}
          leaveTouchDelay={6000}
          title={
            <p
              style={{
                fontSize: "18px",
                whiteSpace: "pre-wrap",
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              {helperTextSave}
            </p>
          }
          placement="left"
          slots={{
            transition: Zoom,
          }}
          slotProps={{
            tooltip: {
              sx: {
                backgroundColor: "rgb(28, 28, 28, 0.95)",
                padding: "20px",
                paddingLeft: "30px",
              },
            },
          }}
        >
          <Button startIcon={<HelpOutlineIcon />}></Button>
        </Tooltip>
      </div>

      <fieldset style={{ borderColor: "grey", marginTop: "30px", width: "292px" }}>
        <legend style={{ color: "#b4b4b4" }}>Получить изображение</legend>
        {leagues ? (
          <Button
            style={{ width: "126px", height: "60px", margin: "10px" }}
            color="secondary"
            onClick={handlePrintScreen}
            loading={loadingButtonPrintScreen}
            loadingPosition="start"
            startIcon={<ScreenshotMonitorIcon />}
            variant="contained"
          >
            Создать скриншот
          </Button>
        ) : (
          <>
            <Skeleton
              variant="rounded"
              width={130}
              height={60}
              sx={{ backgroundColor: "#4d4d4d", margin: "10px" }}
            ></Skeleton>
          </>
        )}
        {leagues ? (
          <Button
            style={{ width: "126px", height: "60px", margin: "10px" }}
            color="secondary"
            onClick={() => handleSavePrintScreen(currentLeague)}
            loading={loadingSavePrintScreen}
            loadingPosition="start"
            startIcon={<SaveAltIcon />}
            variant="contained"
          >
            Сохранить картинку
          </Button>
        ) : (
          <>
            <Skeleton
              variant="rounded"
              width={130}
              height={60}
              sx={{ backgroundColor: "#4d4d4d", margin: "10px" }}
            ></Skeleton>
          </>
        )}
      </fieldset>
      {leagues ? (
        <Button
          style={{ width: "272px", marginLeft: "25px", marginTop: "30px", height: "60px" }}
          color="secondary"
          onClick={() => handleSave(leagues, account, setJournal)}
          loading={loadingButtonSave}
          loadingPosition="start"
          startIcon={<SaveIcon />}
          variant="contained"
        >
          Сохранить результаты
        </Button>
      ) : (
        <>
          <Skeleton
            variant="rounded"
            width={130}
            height={60}
            sx={{ backgroundColor: "#4d4d4d", margin: "10px" }}
          ></Skeleton>
        </>
      )}
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        autoHideDuration={2000}
        open={message ? true : false}
        onClose={closeMolal}
        message={message}
        key="message"
      />
    </Controls>
  );
}
