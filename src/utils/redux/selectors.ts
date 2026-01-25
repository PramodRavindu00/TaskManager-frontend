// authSelectors.ts or inside your existing selectors file
import type { RootState } from "./store";

export const selectAccessToken = (state: RootState) => state.auth.accessToken;
export const selectIsAuthenticated = (state: RootState) =>
  !!state.auth.accessToken;
export const selectIsAuthenticating = (state: RootState) =>
  state.auth.isAuthenticating;

export const selectAuthInitialized = (state: RootState) =>
  state.auth.authInitialized; 

export const selectLoggedUser = (state: RootState) => state.user.data;
export const selectLoggedUserRole = (state: RootState) => state.user.data?.role;

export const selectTheme = (state: RootState) => state.theme;
