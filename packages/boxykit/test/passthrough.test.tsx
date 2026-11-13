import { render } from "@testing-library/react";
import { createRef } from "react";
import { describe, expect, it } from "vitest";
import { Alert, BoardCell, Input, List, Section, Select, Tag } from "../src/react/index.js";

// The components that wrap one element pass its props on, ref too: an app can give them ids, aria and data.
describe("native props", () => {
  it("reach the element, after the kit's class", () => {
    const { container } = render(
      <List id="steps" data-testid="list" className="mine">
        <li>One</li>
      </List>,
    );
    const list = container.querySelector("ul");

    expect(list?.id).toBe("steps");
    expect(list?.dataset.testid).toBe("list");
    expect(list?.className).toBe("boxy-list mine");
  });

  it("take a ref", () => {
    const ref = createRef<HTMLSpanElement>();

    render(<Tag ref={ref}>New</Tag>);

    expect(ref.current?.className).toBe("boxy-tag");
  });

  it("leave title to the component where it is content", () => {
    const { container } = render(
      <>
        <Section title="Tasks" aria-labelledby="tasks">
          Body
        </Section>
        <Alert title="Saved">Done</Alert>
      </>,
    );

    expect(container.querySelector(".boxy-section")?.getAttribute("aria-labelledby")).toBe("tasks");
    expect(container.querySelector(".boxy-section")?.hasAttribute("title")).toBe(false);
    expect(container.querySelector(".boxy-alert-title")?.textContent).toBe("Saved");
  });

  it("leave size to the component: a class, not the native attribute", () => {
    const { container } = render(
      <>
        <Input aria-label="Name" size="small" />
        <Select aria-label="Priority" size="tiny" />
      </>,
    );

    expect(container.querySelector("input")?.className).toBe("boxy-input boxy-input-small");
    expect(container.querySelector("input")?.hasAttribute("size")).toBe(false);
    expect(container.querySelector("select")?.className).toBe("boxy-select boxy-select-tiny");
    expect(container.querySelector("select")?.hasAttribute("size")).toBe(false);
  });

  it("stay on the cell when its content is wrapped to stick", () => {
    const { container } = render(
      <BoardCell id="inputs" side sticky>
        Inputs
      </BoardCell>,
    );
    const cell = container.querySelector("section");

    expect(cell?.id).toBe("inputs");
    expect(cell?.className).toBe("boxy-board-cell boxy-board-cell-side");
    expect(cell?.firstElementChild?.className).toBe("boxy-board-sticky");
  });
});
