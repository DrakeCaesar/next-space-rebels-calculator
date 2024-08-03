import { defineConfig } from "vite";

export default defineConfig({
  plugins: [],
  build: {
    outDir: "dist",
    sourcemap: true,
    rollupOptions: {
      input: "index.html",
      output: {
        entryFileNames: "index.js",
        assetFileNames: "styles.css",
        format: "es",
      },
    },
  },
  optimizeDeps: {
    include: ["toastr"],
  },
});
