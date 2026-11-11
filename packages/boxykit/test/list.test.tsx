import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { InteractiveList, useCurrentSection } from "../src/react/index.js";

const LINKS = [
  { href: "#overview", label: "Overview" },
  { href: "#tasks", label: "Tasks" },
];

describe("InteractiveList", () => {
  it("marks only the current link", () => {
    render(<InteractiveList label="Project" links={LINKS} current="#tasks" />);

    expect(screen.getByRole("navigation", { name: "Project" })).toBeDefined();
    expect(screen.getByRole("link", { name: "Tasks" }).getAttribute("aria-current")).toBe("true");
    expect(screen.getByRole("link", { name: "Overview" }).hasAttribute("aria-current")).toBe(false);
  });
});

function Spy({ ids }: { ids: string[] }) {
  return <output>{useCurrentSection(ids) ?? "none"}</output>;
}

describe("useCurrentSection", () => {
  it("picks the last section whose top has passed a third of the window", () => {
    // jsdom has no layout: give each section a top, the page more height than the window.
    const tops: Record<string, number> = { a: -400, b: 100, c: 900 };

    Object.defineProperty(document.documentElement, "scrollHeight", { configurable: true, value: 5000 });

    for (const id of Object.keys(tops)) {
      const section = document.createElement("section");

      section.id = id;
      section.getBoundingClientRect = () => ({ top: tops[id] ?? 0 }) as DOMRect;
      document.body.append(section);
    }

    render(<Spy ids={["a", "b", "c"]} />);

    expect(screen.getByRole("status").textContent).toBe("b");
  });
});
