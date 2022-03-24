import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
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
