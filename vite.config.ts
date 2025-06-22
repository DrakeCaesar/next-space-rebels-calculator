import { defineConfig } from "vite";

export default defineConfig({
  // Add base URL for GitHub Pages deployment
  base: "/next-space-rebels-calculator/",
  
  build: {
    outDir: "dist",
    sourcemap: true,
    target: "esnext",
    // Set WASM as external assets
    assetsInlineLimit: 0,
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
  // Handle WebAssembly files correctly
  assetsInclude: ["**/*.wasm"],
  // Ensure proper file serving during development
  server: {
    fs: {
      // Allow serving files from this project directory
      allow: ["."],
      strict: false,
    },
    headers: {
      // Required for proper WASM loading
      "Cross-Origin-Opener-Policy": "same-origin",
      "Cross-Origin-Embedder-Policy": "require-corp",
    },
  },
});
