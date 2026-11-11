// Copies the package's CSS bundle into public/, so the site serves it for the Download CSS button.
import { copyFileSync, mkdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Through the package's exports, so it is the file `import "boxykit/css"` gets.
const from = fileURLToPath(import.meta.resolve("boxykit/css"));
const to = path.join(import.meta.dirname, "../public/boxykit.css");

mkdirSync(path.dirname(to), { recursive: true });
copyFileSync(from, to);
console.log(`Copied ${path.relative(process.cwd(), from)} to public/boxykit.css`);
