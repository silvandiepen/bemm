import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  sourcemap: true,
  clean: true,
  outDir: "dist",
  format: ["cjs", "esm"],
  dts: true,
  shims: true,
  outExtension({ format }) {
    return {
      js: format === 'cjs' ? '.js' : '.mjs'
    }
  },
  platform: 'browser',
  treeshake: true,
  splitting: false,
  minify: false,
  esbuildOptions(options) {
    options.mainFields = ['module', 'main'];
    options.format = 'cjs';
  }
});
