// Renders every example to static HTML for the CSS mode: the showcase's generated/examples.json, keyed by file.
// A script, because Next.js doesn't allow react-dom/server inside server components.
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import { COMPONENTS } from "../src/_pages/showcase/examples";
import { formatHtml } from "./format-html";

const OUT_DIR = path.join(import.meta.dirname, "../src/_pages/showcase/generated");
const html: Record<string, string> = {};

for (const doc of COMPONENTS) {
  for (const { file, Component } of doc.examples) {
    html[file] = formatHtml(renderToStaticMarkup(<Component />));
  }
}

mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(path.join(OUT_DIR, "examples.json"), `${JSON.stringify(html, null, 2)}\n`);
console.log(`Rendered ${String(Object.keys(html).length)} examples to ${path.relative(process.cwd(), OUT_DIR)}/examples.json`);
