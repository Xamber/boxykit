// Renders every example to static HTML for the docs' HTML tab: generated/examples.json, keyed by file.
// A script, because Next.js doesn't allow react-dom/server inside server components.
import { mkdirSync, writeFileSync } from "node:fs";
import { renderToStaticMarkup } from "react-dom/server";
import { COMPONENTS } from "../examples/registry";
import { formatHtml } from "../lib/format-html";

const html: Record<string, string> = {};

for (const doc of COMPONENTS) {
  for (const { file, Component } of doc.examples) {
    html[file] = formatHtml(renderToStaticMarkup(<Component />));
  }
}

mkdirSync("generated", { recursive: true });
writeFileSync("generated/examples.json", `${JSON.stringify(html, null, 2)}\n`);
console.log(`Rendered ${String(Object.keys(html).length)} examples to generated/examples.json`);
