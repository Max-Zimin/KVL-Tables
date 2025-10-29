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

import type { TApiPost, TLeagues } from "../types";
import { Skeleton, Tooltip } from "@mui/material";
import { savePrintScreen } from "../savePrintScreen";

const Controls = styled.div``;

export default function Control({ leagues, account }: { leagues: TLeagues | null; account: string | null }) {
  const [loadingSave, setLoadingSave] = useState(false);
  const [loadingPrintScreen, setLoadingPrintScreen] = useState(false);
  const [loadingSavePrintScreen, setLoadingSavePrintScreen] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const { areaRef } = useScreenshot();

  const closeMolal = () => {
    setMessage(null);
    setLoadingSave(false);
    setLoadingPrintScreen(false);
    setLoadingSavePrintScreen(false);
  };
  const handleSavePrintScreen = async () => {
    if (areaRef.current) {
      setLoadingSavePrintScreen(true);
      const result = await savePrintScreen(areaRef.current);
      setMessage(result);
    }
  };
  const handlePrintScreen = async () => {
    if (areaRef.current) {
      setLoadingPrintScreen(true);
      const result = await printScreen(areaRef.current);
      setMessage(result);
    }
  };
  const handleSave = async (leagues: TLeagues, account: string | null) => {
    setLoadingSave(true);
    const makeApiSendObject = (leaguesData: TLeagues) => {
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
        const year = today.getFullYear(); // Год
        return `${day}.${month}.${year}`;
      }
      function getCurrentTimeString(): string {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, "0"); // Часы с ведущим нулем
        const minutes = String(now.getMinutes()).padStart(2, "0"); // Минуты с ведущим нулем
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

    const apiData: TApiPost = makeApiSendObject(leagues);
    apiData.journal = makeRecordInJournal(account);
    try {
      const res = await api.saveData(apiData);
      console.log(res);
      setMessage("Сохранено");
    } catch (err) {
      if (err instanceof Error) setMessage(err.message);
      throw err;
    }
  };
  const helperText = `Чтобы создать скриншот в буфер обмена, нажмите "СОЗДАТЬ СКРИНШОТ".
(Удобно для отправки изображений).

Чтобы сохранить изображение в галерею или на компьютер нажмите "СОХРАНИТЬ КАРТИНКУ".
(Удобно, если необходимо выложить пост из галереи).

Для удобства перехода к группе КВЛ на страницу ВК есть ссылка в правом верхнем углу страницы.`;
  return (
    <Controls>
      <div style={{ display: "flex", width: "100%" }}>
        <Tooltip
          sx={{ marginLeft: "auto", fontSize: "16px" }}
          title={
            <p
              style={{
                fontSize: "18px",
                whiteSpace: "pre-wrap",
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              {helperText}
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

      <fieldset style={{ borderColor: "grey", marginTop: "30px" }}>
        <legend style={{ color: "#b4b4b4" }}>Получить изображение</legend>
        {leagues ? (
          <Button
            style={{ width: "126px", height: "60px", margin: "10px" }}
            color="secondary"
            onClick={handlePrintScreen}
            loading={loadingPrintScreen}
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
            onClick={handleSavePrintScreen}
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
          onClick={() => handleSave(leagues, account)}
          loading={loadingSave}
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
