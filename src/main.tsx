import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./utils/redux/store.ts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const savedTheme = localStorage.getItem("theme");
const systemPrefersDark = window.matchMedia(
  "(prefers-color-scheme: dark)"
).matches;

const theme = savedTheme ? savedTheme : systemPrefersDark ? "dark" : "light";
document.documentElement.classList.toggle("dark", theme === "dark");

const queryClient = new QueryClient();
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <App />
    </Provider>
    </QueryClientProvider>
  </StrictMode>
);
