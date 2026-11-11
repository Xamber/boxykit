// VERSION is the one place to set the version: the build copies it into package.json, the docs site reads it,
// and the Release workflow publishes it when npm doesn't have it yet.
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "../../..");
const manifest = path.join(root, "packages/boxykit/package.json");
const version = readFileSync(path.join(root, "VERSION"), "utf8").trim();
const pkg = JSON.parse(readFileSync(manifest, "utf8"));

if (pkg.version !== version) {
  pkg.version = version;
  writeFileSync(manifest, `${JSON.stringify(pkg, null, 2)}\n`);
}
