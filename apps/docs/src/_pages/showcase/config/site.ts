// Read at build time, on the server: the page is a static export.
import { readFileSync } from "node:fs";
import path from "node:path";

export const REPO_URL = "https://github.com/Xamber/boxykit";

/** The repo's VERSION, which mirrors the package's. */
export const VERSION = readFileSync(path.join(process.cwd(), "../../VERSION"), "utf8").trim();
