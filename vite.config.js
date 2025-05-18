import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";
import path from "path";

export default defineConfig({
  // depending on your application, base can also be "/"
  base: "/",
  build: {
    outDir: "dist",
    assetsDir: "assets",
    sourcemap: true,
  },
  optimizeDeps: {
    include: ["@react-pdf-viewer/core", "pdfjs-dist", "react-pdf"],
    exclude: [],
  },
  plugins: [react()],
  resolve: {
    extensions: [".js", ".jsx", ".json"],
    alias: {
      // No problematic alias for PDF.js
    },
  },
  css: {
    postcss: { plugins: [tailwindcss()] },
  },
  server: {
    // this ensures that the browser opens upon server start
    open: true,
    // this sets a default port to 3000
    port: 3000,
    fs: {
      // Allow serving files from one level up to the project root
      allow: [".."],
    },
  },
  test: {
    environment: "jsdom", // Use jsdom for testing React components
    globals: true, // Enable global APIs like `describe`, `it`
    setupFiles: "./src/setupTests.js", // For custom setup (e.g., jest-dom)
    css: true, // Include CSS for component styling (optional)
    coverage: {
      provider: "v8", // For coverage reports
      reporter: ["text", "json", "html"],
    },
  },
});
