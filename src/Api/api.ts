import type { TApiGetData, TApiGetJournal, TApiPost } from "../types";

export const api = {
  getData: async (type: "data" | "journal" = "data"): Promise<TApiGetData | TApiGetJournal> => {
    try {
      const res = await fetch(`/api?type=${type}`);
      if (!res.ok) {
        throw new Error(`Ошибка HTTP: ${res.status}`);
      }
      const data: TApiGetData | TApiGetJournal = await res.json();
      return data;
    } catch (err) {
      console.error("Ошибка fetch:", err);
      throw err;
    }
  },

  saveData: async (newItem: TApiPost ): Promise<string> => {
    try {
      const res = await fetch("/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newItem),
      });
      if (!res.ok) {
        throw new Error(`Ошибка HTTP: ${res.status}`);
      }
      const result = await res.text();
      return result;
    } catch (err) {
      console.error("Ошибка save:", err);
      throw err;
    }
  },
};
