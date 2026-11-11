import { render } from "@testing-library/react";
import { createRef } from "react";
import { describe, expect, it } from "vitest";
import { Alert, List, Section, Tag } from "../src/react/index.js";

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
});
