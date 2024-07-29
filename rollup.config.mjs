import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";

export default {
  input: "src/main.ts", // Your main TypeScript file
  output: {
    file: "dist/main", // Output bundle file
    format: "cjs",
    sourcemap: true,
  },
  plugins: [resolve(), commonjs(), typescript()],
};
