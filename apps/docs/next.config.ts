import path from "node:path";
import type { NextConfig } from "next";

const config: NextConfig = {
  // A static site: deployable to Vercel or GitHub Pages.
  output: "export",
  // The workspace root, so Turbopack follows the symlinked boxykit package.
  turbopack: { root: path.resolve(process.cwd(), "../..") },
};

export default config;
