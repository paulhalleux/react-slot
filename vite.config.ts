import { defineConfig } from "vite";
import { resolve } from "path";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import eslint from "vite-plugin-eslint";

export default defineConfig({
  plugins: [
    react(),
    eslint(),
    dts({
      insertTypesEntry: true,
    }),
  ],
  build: {
    minify: true,
    sourcemap: true,
    lib: {
      entry: resolve(__dirname, "src/index.lib.ts"),
      name: "index",
      formats: ["es", "umd"],
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: ["react", "react-dom", "react-router-dom", "react-router"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
});
