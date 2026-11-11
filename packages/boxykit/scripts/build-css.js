// Builds dist/css: the full bundle (boxy.css), tokens, reset, and one file per component.
import { bundle, browserslistToTargets } from "lightningcss";
import { mkdirSync, readdirSync, writeFileSync } from "node:fs";
import { basename, join } from "node:path";

const SRC = "src/css";
const OUT = "dist/css";
// Browsers with @layer, color-mix() and :has(): 2023 onwards.
const targets = browserslistToTargets(["chrome >= 111", "firefox >= 121", "safari >= 16.4"]);

function build(from, to) {
  const { code } = bundle({ filename: join(SRC, from), minify: true, targets });

  writeFileSync(join(OUT, to), code);
}

mkdirSync(join(OUT, "components"), { recursive: true });
build("index.css", "boxy.css");
build("tokens.css", "tokens.css");
build("reset.css", "reset.css");

// TypeScript checks side-effect imports: `import "boxykit/css"` needs a declaration to point at.
writeFileSync(join(OUT, "css.d.ts"), "export {};\n");

for (const file of readdirSync(join(SRC, "components"))) {
  build(join("components", file), join("components", basename(file)));
}
