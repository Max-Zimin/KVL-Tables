/** @jsxImportSource @emotion/react */

import Control from "./components/Control";
import TableContainer from "./components/Table/TableContainer";
import Sidebar from "./components/Sidebar";

import { useEffect, useState } from "react";
import { getDataFromApi, getJournalFromApi } from "./Api/getDataFromApi";
import { css } from "@emotion/react";
import { ScreenshotProvider } from "./components/ScreenshotProvider";

import type { ILeague, TApiGetJournal, TLeagues } from "./types";
import { Header } from "./components/Header/Header";
import { League } from "./data/LeagueContext";
import AuthModal from "./components/Auth/Auth";
import { handleLogin } from "./Api/apiFirebase";

import { Skeleton } from "@mui/material";
import Journal from "./components/Journal";
import styled from "@emotion/styled";

const AppWrapperCSS = css`
  display: flex;
  flex-direction: column;
  min-width: 100vw;
  width: 100%;
  box-sizing: border-box;
`;

const ContainerCSS = css`
  display: flex;
  flex-direction: row;
  z-index: 0;
  width: fit-content;
  min-width: 100vw;
  height: 100%;
  background-color: #333333;
`;

const ControlsWrapper = css`
  padding: 0;
  margin: 0;
`;
const Back = styled.div`
  display: flex;
  position: relative;
  opacity: "0.1";
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url("public/game.png");
    background-repeat: no-repeat;
    background-size: cover;
    opacity: 0.05;
    z-index: 0;
  }
`;

function App() {
  const [isAuthOpen, setIsAuthOpen] = useState(true);
  const [account, setAccount] = useState<string | null>(null);
  const [leagues, setLeagues] = useState<TLeagues | null>(null);
  const [league, setLeague] = useState<ILeague | null>(null);
  const [currentLeague, setCurrentLeague] = useState<string>("Высшая М");
  const [journal, setJournal] = useState<TApiGetJournal | null>(null);

  useEffect(() => {
    getDataFromApi().then((data) => {
      setLeagues(data);
    });
    getJournalFromApi().then((journal) => {
      setJournal(journal);
    });
  }, []);
  useEffect(() => {
    const leagueKey = leagues ? Object.keys(leagues).find((key) => leagues[key].label === currentLeague) : null;
    setLeague(leagueKey && leagues ? leagues[leagueKey] : null);
  }, [leagues, currentLeague]);

  
  return (
    <>
      {isAuthOpen && (
        <div>
          <AuthModal setIsOpen={setIsAuthOpen} onSubmit={handleLogin} setAccount={setAccount} />
        </div>
      )}
      <ScreenshotProvider>
        <div css={AppWrapperCSS}>
          <Header account={account} />
          <div css={ContainerCSS}>
            <Sidebar currentLeague={currentLeague} setCurrentLeague={setCurrentLeague} leagues={leagues} />
            <Back>
              {!leagues ? (
                <Skeleton variant="rectangular" width={960} height={540} sx={{ backgroundColor: "#4d4d4d" }} />
              ) : (
                <>
                  {league ? (
                    <League.Provider value={{ league, setLeague }}>
                      <TableContainer league={league} />
                    </League.Provider>
                  ) : null}
                </>
              )}
              <div css={ControlsWrapper}>
                <Journal journal={journal}></Journal>
                <Control leagues={leagues} account={account} />
              </div>
            </Back>
          </div>
        </div>
      </ScreenshotProvider>
    </>
  );
}

export default App;
