// The CSS bundle the site serves for download, copied into public/ by scripts/copy-css.ts before the build.
import { statSync } from "node:fs";
import path from "node:path";
import { VERSION } from "./site";

export const CSS_FILE_URL = "/boxykit.css";

/** Saved with the version in its name, so two downloads don't get mixed up. */
export const CSS_FILE_NAME = `boxykit-${VERSION}.css`;

/** "22 KB", for the button. */
export const CSS_FILE_SIZE = `${String(Math.round(statSync(path.join(process.cwd(), "public/boxykit.css")).size / 1024))} KB`;
