import type { ReactNode } from "react";
import { CodePanel } from "./code-panel";

/** A section's rows, under one anchor; each row names its component itself ("Button · Looks"). */
export function Group({ slug, title, children }: { slug: string; title: string; children: ReactNode }) {
  return (
    <section id={slug} className="docs-group" aria-label={title}>
      {children}
    </section>
  );
}

/** A variant: the element itself on the left; on the right its name, what it is and its code on request. */
export function ExampleRow({
  group,
  title,
  about,
  react,
  html,
  imports,
  extra,
  children,
}: {
  /** The component, before the dot: "Button · Looks". */
  group: string;
  title: string;
  about: string;
  react: string;
  /** The same code for CSS users; tokens show one snippet for both. */
  html?: string;
  /** The CSS files to import, shown over the HTML. */
  imports?: string;
  /** Goes next to Show code, e.g. Show toast. */
  extra?: ReactNode;
  children: ReactNode;
}) {
  return (
    <article className="docs-example">
      <header className="docs-example-head">
        <h2 className="docs-example-title">
          <span className="docs-example-group">{group} ·</span> {title}
        </h2>
        <p className="docs-about">{about}</p>
        <CodePanel react={react} html={html ?? react} imports={imports} extra={extra} />
      </header>
      <div className="docs-preview">{children}</div>
    </article>
  );
}
