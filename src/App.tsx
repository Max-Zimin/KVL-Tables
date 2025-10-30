/** @jsxImportSource @emotion/react */

import Control from "./components/Control";
import TableContainer from "./components/Table/TableContainer";
import Sidebar from "./components/Sidebar";

import { useEffect, useRef, useState } from "react";
import { css } from "@emotion/react";

import { getDataFromApi, getJournalFromApi } from "./Api/getDataFromApi";
import { ScreenshotProvider } from "./components/ScreenshotProvider";

import { Header } from "./components/Header/Header";
import { League } from "./data/LeagueContext";
import AuthModal from "./components/Auth/Auth";
import { autoLogin, handleLogin } from "./Api/apiFirebase";

import { Skeleton } from "@mui/material";
import Journal from "./components/Journal";
import styled from "@emotion/styled";

import type { TypeApiGetJournal, TypeLeague, TypeLeagues } from "./types/types";

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
    background-image: url("/game.png");
    background-repeat: no-repeat;
    background-size: cover;
    opacity: 0.05;
    z-index: 0;
  }
`;

function App() {
  const leaguesRef = useRef<TypeLeagues | null>(null);
  const [leaguesLoaded, setLeaguesLoaded] = useState<boolean>(false);
  const [isAuthOpen, setIsAuthOpen] = useState(true);
  const [account, setAccount] = useState<string | null>(null);
  const [league, setLeague] = useState<TypeLeague | null>(null);
  const [currentLeague, setCurrentLeague] = useState<string>("Высшая М");
  const [journal, setJournal] = useState<TypeApiGetJournal | null>(null);

  useEffect(() => {
    autoLogin(setIsAuthOpen, setAccount);
    const storedLeagues = sessionStorage.getItem("leagues");
    if (storedLeagues) {
      leaguesRef.current = JSON.parse(storedLeagues) as TypeLeagues;
      setLeaguesLoaded(true);
    } else {
      getDataFromApi().then((data) => {
        leaguesRef.current = data;
        setLeaguesLoaded(true);
      });
    }
    getJournalFromApi().then((journal) => {
      setJournal(journal);
    });
  }, []);

  useEffect(() => {
    const leagues = leaguesRef.current;
    if (leagues) {
      const leagueKey = Object.keys(leagues).find((key) => leagues[key].label === currentLeague);
      setLeague(leagueKey ? leagues[leagueKey] : null);
    }
  }, [leaguesLoaded, currentLeague]);

  useEffect(() => {
    if (leaguesRef.current) {
      sessionStorage.setItem("leagues", JSON.stringify(leaguesRef.current));
    }
  }, [league]);

  useEffect(() => {
    getJournalFromApi().then((journal) => {
      setJournal(journal);
    });
  }, [journal]);

  return (
    <>
      {isAuthOpen && (
        <div>
          <AuthModal setIsOpen={setIsAuthOpen} onSubmit={handleLogin} setAccount={setAccount} />
        </div>
      )}
      <ScreenshotProvider>
        <div css={AppWrapperCSS}>
          <Header account={account} setIsOpen={setIsAuthOpen} setAccount={setAccount} />
          <div css={ContainerCSS}>
            <Sidebar currentLeague={currentLeague} setCurrentLeague={setCurrentLeague} leagues={leaguesRef.current} />
            <Back>
              {!leaguesRef.current ? (
                <Skeleton variant="rectangular" width={960} height={540} sx={{ backgroundColor: "#4d4d4d" }} />
              ) : (
                <>
                  {league && leaguesRef ? (
                    <League.Provider value={{ league, setLeague }}>
                      <TableContainer league={league} />
                    </League.Provider>
                  ) : null}
                </>
              )}
              <div css={ControlsWrapper}>
                <Journal journal={journal}></Journal>
                <Control leagues={leaguesRef.current} account={account} setJournal={setJournal} />
              </div>
            </Back>
          </div>
        </div>
      </ScreenshotProvider>
    </>
  );
}

export default App;
