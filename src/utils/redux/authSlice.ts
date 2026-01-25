import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AuthState } from "../constants/types";

const initialState: AuthState = {
  accessToken: null,
  isLoading: true,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {

    setAccessToken: (state, action: PayloadAction<string | null>) => {
      state.accessToken = action.payload;
    },
    setAuthLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
    clearAuth: (state) => {
      state.accessToken = null;
      state.isLoading = false;
      state.isAuthenticated = false;
    },
  },
});

export const { setAccessToken, setAuthLoading, setAuthenticated, clearAuth } =
  authSlice.actions;
export default authSlice.reducer;