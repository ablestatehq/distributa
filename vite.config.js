import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";

export default defineConfig({
  // depending on your application, base can also be "/"
  base: "/",
  build: {
    outDir: "dist",
    assetsDir: "assets",
    sourcemap: true,
  },
  plugins: [react()],
  define: {
    "global.Buffer": Buffer, // Polyfill Buffer globally
  },
  css: {
    postcss: { plugins: [tailwindcss()] },
  },
  server: {
    // this ensures that the browser opens upon server start
    open: true,
    // this sets a default port to 3000
    port: 3000,
  },
});
