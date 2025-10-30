import React from "react";
import type { TypeLeague } from "../types/types";
import type { TypeSetLeague } from "../types/states";


export const League = React.createContext<{
  league: TypeLeague;
  setLeague: TypeSetLeague;
}>(
  {} as {
    league: TypeLeague;
    setLeague: TypeSetLeague;
  }
);
