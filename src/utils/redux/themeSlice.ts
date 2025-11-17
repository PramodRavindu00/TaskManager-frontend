import { createSlice } from "@reduxjs/toolkit";
import type { Theme } from "../constants/types";

const systemTheme: Theme =
  (localStorage.getItem("theme") as Theme) ||
  (window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light");

const initialState: Theme = systemTheme;
const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => (state === "light" ? "dark" : "light"),
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
