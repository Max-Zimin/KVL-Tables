import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://script.google.com",
        changeOrigin: true,
        rewrite: (path) =>
          path.replace(
            /^\/api/,
            "/macros/s/AKfycbxtKH-1R_rFs5JSiYWcZceak_IepVomlMs_lt-ZFrsPcr3rqiq7f0OZSKf_UP_ZqZJ13g/exec"
          ),
      },
    },
  },
});