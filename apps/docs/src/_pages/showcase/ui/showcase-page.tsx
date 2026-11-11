// The whole kit on one page: a row per example, the element on the left and its code on the right,
// the anchors and the controls down the right side. The code is React or the HTML it renders, as picked.
import "./showcase.css";
import { REPO_URL, VERSION } from "../config/site";
import { SECTIONS } from "../examples";
import examplesHtml from "../generated/examples.json";
import { cssImports, exampleSource } from "../lib/example-code";
import { ModeProvider } from "../model/mode";
import { Controls } from "./controls";
import { ExampleRow, Group } from "./example-row";
import { Intro } from "./intro";
import { ShowToast } from "./show-toast";
import { Toc } from "./toc";
import { TokensGroup } from "./tokens-group";

const HTML: Record<string, string> = examplesHtml;

const ANCHORS = [
  { slug: "start", title: "Getting started" },
  { slug: "tokens", title: "Tokens" },
  ...SECTIONS.map(({ slug, title }) => ({ slug, title })),
];

export function ShowcasePage() {
  return (
    <ModeProvider>
      <div className="docs">
        <aside className="docs-side">
          <a className="docs-brand" href={REPO_URL}>
            Boxykit <span className="docs-version">v{VERSION}</span>
          </a>
          <Toc anchors={ANCHORS} />
          <Controls />
        </aside>
        <main className="docs-main">
          <Intro />
          <TokensGroup />
          {SECTIONS.map((section) => (
            <Group key={section.slug} slug={section.slug} title={section.title}>
              {section.components.map((doc) =>
                doc.examples.map(({ file, title, about, Component, toast }) => (
                  <ExampleRow
                    key={file}
                    group={doc.title}
                    title={title}
                    about={about}
                    react={exampleSource(file)}
                    html={HTML[file] ?? ""}
                    imports={cssImports(doc.css)}
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
                )),
              )}
            </Group>
          ))}
        </main>
      </div>
    </ModeProvider>
  );
}
