import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  sourcemap: true,
  clean: true,
  outDir: "dist",
  format: ["cjs", "esm"],
  dts: true,
  shims: true,
  target: "es2015",
  platform: "neutral",
  outExtension({ format }) {
    return {
      js: format === 'cjs' ? '.js' : '.mjs'
    }
  },
  esbuildOptions(options, { format }) {
    if (format === 'cjs') {
      options.format = 'cjs'
      options.target = 'es2015'
      // Ensure proper exports for CommonJS
      options.banner = {
        js: `
          "use strict";
          if (typeof module !== 'undefined' && module.exports) {
            module.exports = exports;
          }
        `
      }
    }
  },
  noExternal: []
});
