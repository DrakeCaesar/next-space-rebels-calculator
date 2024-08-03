import { defineConfig } from "vite";

export default defineConfig({
  plugins: [],
  build: {
    outDir: "dist",
    sourcemap: true,
    rollupOptions: {
      input: "src/index.ts",
      output: {
        entryFileNames: "main.js",
        assetFileNames: "styles.css", // for CSS output from Sass
        format: "es",
      },
    },
  },
  optimizeDeps: {
    include: ["toastr"],
  },
});
