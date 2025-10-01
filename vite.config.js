import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  base: "/user-auth-ui-using-react.js/",
  plugins: [react()],
});
