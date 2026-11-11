// The code an example's panel shows, read at build time.
import { readFileSync } from "node:fs";
import path from "node:path";

const EXAMPLES_DIR = path.join(process.cwd(), "src/_pages/showcase/examples");

/** The example's own source: `file` is its path under examples/. */
export function exampleSource(file: string): string {
  return readFileSync(path.join(EXAMPLES_DIR, file), "utf8").trimEnd();
}

/** The CSS files a component needs, the tokens first. */
export function cssImports(css: string[]): string {
  return ["tokens", ...css].map((name) => `import "boxykit/css/${name}";`).join("\n");
}
