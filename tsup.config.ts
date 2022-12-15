import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  sourcemap: true,
  clean: true,
  outDir: "dist/module",
  format: ["cjs", "esm", "iife"],
  shims: true,
});
