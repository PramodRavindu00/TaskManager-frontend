import type { RootState } from "./store";

export const selectAccessToken = (state: RootState) => state.auth.accessToken;
export const selectIsAuthenticated = (state: RootState) =>
  !!state.auth.accessToken;

export const selectLoggedUser = (state: RootState) => state.user.data;
export const selectLoggedUserRole = (state: RootState) => state.user.data?.role;
