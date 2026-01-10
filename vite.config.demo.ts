import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  root: "./demo",
  build: {
    outDir: "../dist",
    emptyOutDir: false, // Không xóa các file library đã build
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "demo/index.html"),
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
