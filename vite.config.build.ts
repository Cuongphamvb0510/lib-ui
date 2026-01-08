import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
import path from "path";

export default defineConfig({
  plugins: [
    react({
      jsxRuntime: "automatic",
    }),
    // Plugin để inject CSS vào JavaScript thay vì extract ra file riêng
    // CSS sẽ tự động được inject khi import component
    cssInjectedByJsPlugin(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist",
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "VBAUI",
      formats: ["es", "cjs"],
      fileName: (format) => {
        if (format === "es") return "index.esm.js";
        if (format === "cjs") return "index.cjs";
        return `index.${format}.js`;
      },
    },
    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        "react/jsx-dev-runtime",
      ],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "react/jsx-runtime": "react/jsx-runtime",
          "react/jsx-dev-runtime": "react/jsx-dev-runtime",
        },
        preserveModules: false,
      },
    },
    // Tắt code splitting cho CSS để tất cả CSS vào một file
    cssCodeSplit: false,
    emptyOutDir: false,
    minify: false,
  },
});
