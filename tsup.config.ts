import { defineConfig } from "tsup";
import { sassPlugin } from "esbuild-sass-plugin";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  dts: true,
  sourcemap: true,
  clean: true,
  external: ["react", "react-dom", "govuk-frontend"],
  esbuildPlugins: [
    sassPlugin({
      type: "css-text", // Inline CSS as strings, don't try to resolve URLs
    }),
  ],
});
