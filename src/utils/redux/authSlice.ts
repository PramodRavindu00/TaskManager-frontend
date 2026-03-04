// authSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AuthState, User } from "../constants/types";

const initialState: AuthState = {
  accessToken: null,
  isLoading: true,
  isAuthenticated: false,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthSuccess: (
      state,
      action: PayloadAction<{ accessToken: string; user: User }>,
    ) => {
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
      state.isLoading = false;
      state.isAuthenticated = true;
    },
    setAuthLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    refreshAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },

    clearAuth: (state) => {
      state.accessToken = null;
      state.user = null;
      state.isLoading = false;
      state.isAuthenticated = false;
    },
  },
});

export const { setAuthSuccess, setAuthLoading, refreshAccessToken, clearAuth } =
  authSlice.actions;
export default authSlice.reducer;
