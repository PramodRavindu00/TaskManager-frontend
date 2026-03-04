import type { RootState } from "./store";

export const selectAccessToken = (state: RootState) => state.auth.accessToken;
export const selectAuthLoading = (state: RootState) => state.auth.isLoading;
export const selectAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;

export const selectLoggedUser = (state: RootState) => state.auth.user;
export const selectLoggedUserRole = (state: RootState) => state.auth.user?.role;

export const selectTheme = (state: RootState) => state.theme;
