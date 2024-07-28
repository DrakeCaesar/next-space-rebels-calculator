import typescript from "@rollup/plugin-typescript";

export default {
  input: "src/main.ts", // Your main TypeScript file
  output: {
    file: "dist/main.js", // Output bundle file
    format: "cjs",
    sourcemap: true,
  },
  plugins: [typescript()],
};
