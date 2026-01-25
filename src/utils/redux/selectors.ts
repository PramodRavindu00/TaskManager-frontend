// authSelectors.ts or inside your existing selectors file
import type { RootState } from "./store";

export const selectAccessToken = (state: RootState) => state.auth.accessToken;
export const selectAuthLoading = (state:RootState)=>state.auth.isLoading;
export const selectAuthenticated = (state: RootState) =>state.auth.isAuthenticated;

export const selectLoggedUser = (state: RootState) => state.user.data;
export const selectLoggedUserRole = (state: RootState) => state.user.data?.role;

export const selectTheme = (state: RootState) => state.theme;
