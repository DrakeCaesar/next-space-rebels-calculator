// vite.config.js
import { defineConfig } from "vite";
import sass from "vite-plugin-sass"; // Vite-specific Sass plugin

export default defineConfig({
  plugins: [
    sass({
      // Optionally configure if needed
      // e.g., includePaths: ['./src/styles']
    }),
  ],
  build: {
    outDir: "dist",
    sourcemap: true,
    rollupOptions: {
      input: "src/main.ts",
      output: {
        entryFileNames: "main.js",
        assetFileNames: "styles.css", // for CSS output from Sass
        format: "es",
      },
    },
  },
});
