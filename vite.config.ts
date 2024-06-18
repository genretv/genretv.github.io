import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  // resolve: {
  //   alias: {
  //     stream: "stream-browserify",
  //     http: "http-browserify",
  //     process: "process/browser",
  //     util: "util",
  //   },
  // },
  // define: {
  //   global: {},
  //   "process.env": process.env,
  // },
  build: { outDir: "./docs" },
  plugins: [
    react(),
    VitePWA({
      devOptions: {
        enabled: true,
        /* other options */
      },
    }),
  ],
});
