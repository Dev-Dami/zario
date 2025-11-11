const { build } = require("esbuild");

build({
  entryPoints: ["src/index.ts"],
  bundle: true,
  platform: "node",
  target: "node16",
  outfile: "dist/index.js",
  format: "cjs",
  sourcemap: false,
  minify: true,
}).catch(() => process.exit(1));
