import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { render } from "@testing-library/react";
import axe from "axe-core";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { COMPONENTS } from "../src/_pages/showcase/examples";

const CSS_DIR = path.resolve(import.meta.dirname, "../../../packages/boxykit/src/css/components");
const CLASS = /\.(boxy-[a-z0-9-]+)/g;
const examples = COMPONENTS.flatMap((doc) => doc.examples);

function cssClasses(): Set<string> {
  const classes = new Set<string>();

  for (const file of readdirSync(CSS_DIR)) {
    for (const match of readFileSync(path.join(CSS_DIR, file), "utf8").matchAll(CLASS)) {
      if (match[1]) classes.add(match[1]);
    }
  }

  return classes;
}

function exampleClasses(): Set<string> {
  const classes = new Set<string>();

  for (const { Component } of examples) {
    const html = renderToStaticMarkup(<Component />);

    for (const match of html.matchAll(/class="([^"]*)"/g)) {
      for (const name of (match[1] ?? "").split(" ")) {
        if (name.startsWith("boxy-")) classes.add(name);
      }
    }
  }

  return classes;
}

// The CSS and the React layer must agree: the docs examples are where they meet.
describe("CSS and React parity", () => {
  const css = cssClasses();
  const used = exampleClasses();

  it("defines every boxy class the examples render", () => {
    expect([...used].filter((name) => !css.has(name))).toEqual([]);
  });

  it("shows every boxy class the CSS defines in some example", () => {
    expect([...css].filter((name) => !used.has(name))).toEqual([]);
  });
});

describe("accessibility", () => {
  it.each(examples.map((e) => [e.file, e.Component] as const))("%s has no axe violations", async (_file, Component) => {
    const { container } = render(<Component />);
    // Color contrast needs real rendering; jsdom has none.
    const results = await axe.run(container, { rules: { "color-contrast": { enabled: false } } });

    expect(results.violations.map((v) => `${v.id}: ${v.help}`)).toEqual([]);
  });
});
