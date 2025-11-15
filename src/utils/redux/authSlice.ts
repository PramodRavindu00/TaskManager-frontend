import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AuthState } from "../constants/types";

const initialState: AuthState = {
  accessToken: null,
  isAuthenticating: true,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<string | null>) => {
      state.accessToken = action.payload;
    },
    setIsAuthenticating: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticating = action.payload;
    },
    clearAuth: (state) => {
      state.accessToken = null;
      state.isAuthenticating = true;
    },
  },
});

export const { setAccessToken, setIsAuthenticating, clearAuth } =
  authSlice.actions;
export default authSlice.reducer;
