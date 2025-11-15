import axios, {
  AxiosError,
  type AxiosRequestConfig,
  type InternalAxiosRequestConfig,
} from "axios";
import { store } from "@/utils/redux/store";
import {
  setAccessToken,
  clearAuth,
  setIsAuthenticating,
} from "@/utils/redux/authSlice";
import { clearUser } from "@/utils/redux/userSlice";

const SERVER_URL = import.meta.env.VITE_SERVER_URL ?? "http://localhost:5000";

const api = axios.create({
  baseURL: SERVER_URL,
  withCredentials: true, // allow sending cookies
});

// Request Interceptor
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const isPublic = config.public ?? false;
    if (!isPublic) {
      const state = store.getState();
      const token = state.auth.accessToken;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig;

    if (!originalRequest || originalRequest.public)
      return Promise.reject(error);
    if (originalRequest.url?.includes("/auth/refresh"))
      return Promise.reject(error);

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshResponse = await api.get("/auth/refresh", {
          public: true,
        });
        const newAccessToken = refreshResponse.data.accessToken;

        store.dispatch(setAccessToken(newAccessToken));
        store.dispatch(setIsAuthenticating(false));

        if (!originalRequest.headers) {
          originalRequest.headers = {};
        }
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        store.dispatch(clearAuth());
        store.dispatch(clearUser());
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
