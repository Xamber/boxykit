import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const root = path.resolve(import.meta.dirname, "../../..");

describe("VERSION", () => {
  it("matches the package's version", () => {
    const pkg = JSON.parse(readFileSync(path.join(root, "packages/boxykit/package.json"), "utf8")) as { version: string };

    expect(readFileSync(path.join(root, "VERSION"), "utf8").trim()).toBe(pkg.version);
  });
});
