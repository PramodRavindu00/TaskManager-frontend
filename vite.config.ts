import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import { env } from "process";
import path from "path";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: env.APP_PORT ? parseInt(env.APP_PORT) : 3000, //configuring development server port
  },
  preview: {
    port: env.APP_PORT ? parseInt(env.APP_PORT) : 3000,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@assets": path.resolve(__dirname, "src/assets"),
      "@components": path.resolve(__dirname, "src/components"),
      "@layouts": path.resolve(__dirname, "src/layouts"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@utils": path.resolve(__dirname, "src/utils"),
    },
  },
});
