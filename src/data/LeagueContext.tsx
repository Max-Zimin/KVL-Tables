import React from "react";
import type { ILeague } from "../types";

export const League = React.createContext<{
  league: ILeague;
  setLeague: React.Dispatch<React.SetStateAction<ILeague | null>>;
}>(
  {} as {
    league: ILeague;
    setLeague: React.Dispatch<React.SetStateAction<ILeague | null>>;
  }
);
