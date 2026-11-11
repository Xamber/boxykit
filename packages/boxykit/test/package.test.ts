import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const DIST = path.resolve(import.meta.dirname, "../dist");

/** The top-level statements of minified CSS: what sits at brace depth 0. Skips strings. */
function topLevel(css: string): string[] {
  const statements: string[] = [];
  let depth = 0;
  let start = 0;
  let quote = "";

  for (let i = 0; i < css.length; i++) {
    const c = css[i];

    if (quote) {
      if (c === quote) quote = "";
      continue;
    }

    if (c === '"' || c === "'") quote = c;
    if (c === "{") depth += 1;
    if (c === "}") depth -= 1;

    if (depth === 0 && (c === "}" || c === ";")) {
      statements.push(css.slice(start, i + 1));
      start = i + 1;
    }
  }

  return statements;
}

describe.runIf(existsSync(DIST))("built package", () => {
  it('keeps "use client" on the components with hooks', () => {
    expect(readFileSync(path.join(DIST, "react/modal.js"), "utf8").startsWith('"use client";')).toBe(true);
  });

  it("puts every rule of the bundle in a boxy layer, reset first", () => {
    const statements = topLevel(readFileSync(path.join(DIST, "css/boxy.css"), "utf8"));

    expect(statements[0]?.startsWith("@layer boxy.reset{")).toBe(true);
    expect(statements.filter((s) => !s.startsWith("@layer boxy."))).toEqual([]);
  });
});
