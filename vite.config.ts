import { defineConfig } from "vite";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig({
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: "output.wasm", // Adjust the path to your actual wasm file location
          dest: "", // Destination directory within the output directory
        },
      ],
    }),
  ],
  build: {
    outDir: "dist",
    sourcemap: true,
    target: "esnext",
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
