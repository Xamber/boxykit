// The whole kit on one page: a row per example, its code on the left and the element on the right,
// the anchors and the controls down the right side. The code is React or the HTML it renders, as picked.
import { readFileSync } from "node:fs";
import path from "node:path";
import examplesHtml from "../generated/examples.json";
import { COMPONENTS } from "../examples/registry";
import { Intro } from "./intro";
import { Controls, ModeProvider, ShowToast } from "./mode";
import { ExampleRow, Group } from "./rows";
import { Toc } from "./toc";
import { TokensGroup } from "./tokens";

const HTML: Record<string, string> = examplesHtml;

// The repo's VERSION file, read at build time.
const VERSION = readFileSync(path.join(process.cwd(), "../../VERSION"), "utf8").trim();

const ANCHORS = [
  { slug: "start", title: "Getting started" },
  { slug: "tokens", title: "Tokens" },
  ...COMPONENTS.map(({ slug, title }) => ({ slug, title })),
];

export function Showcase() {
  return (
    <ModeProvider>
      <div className="docs">
        <aside className="docs-side">
          <a className="docs-brand" href="https://github.com/Xamber/boxykit">
            Boxykit <span className="docs-version">v{VERSION}</span>
          </a>
          <Toc anchors={ANCHORS} />
          <Controls />
        </aside>
        <main className="docs-main">
          <Intro />
          <TokensGroup />
          {COMPONENTS.map((doc) => (
            <Group key={doc.slug} slug={doc.slug} title={doc.title}>
              {doc.examples.map(({ file, title, about, Component, toast }) => (
                <ExampleRow
                  key={file}
                  group={doc.title}
                  title={title}
                  about={about}
                  react={source(file)}
                  html={HTML[file] ?? ""}
                  imports={imports(doc.css)}
                  extra={
                    toast && (
                      <ShowToast wait={toast === "wait"}>
                        <Component />
                      </ShowToast>
                    )
                  }
                >
                  <Component />
                </ExampleRow>
              ))}
            </Group>
          ))}
        </main>
      </div>
    </ModeProvider>
  );
}

function source(file: string): string {
  return readFileSync(path.join(process.cwd(), "examples", file), "utf8").trimEnd();
}

function imports(css: string[]): string {
  return ["tokens", ...css].map((name) => `import "boxykit/css/${name}";`).join("\n");
}
