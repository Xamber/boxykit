// Writes the package's version to the repo's VERSION file, after `changeset version` bumps it.
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "../../..");
const { version } = JSON.parse(readFileSync(path.join(root, "packages/boxykit/package.json"), "utf8"));

writeFileSync(path.join(root, "VERSION"), `${version}\n`);
