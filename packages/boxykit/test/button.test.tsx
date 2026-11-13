import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Button, buttonClass } from "../src/react/index.js";

describe("Button", () => {
  it("is a type=button accent button by default", () => {
    render(<Button>Save</Button>);
    const button = screen.getByRole("button", { name: "Save" });

    expect(button.getAttribute("type")).toBe("button");
    expect(button.className).toBe("boxy-button boxy-button-accent");
  });

  it("is disabled and busy while pending, with a spinner", () => {
    render(<Button pending>Saving</Button>);
    const button = screen.getByRole("button");

    expect(button).toHaveProperty("disabled", true);
    expect(button.getAttribute("aria-busy")).toBe("true");
    expect(screen.getByRole("img", { name: "Pending" })).toBeDefined();
  });
});

describe("buttonClass", () => {
  it("joins the look, the size and extra classes", () => {
    expect(buttonClass({ look: "outline", size: "tiny", className: "x" })).toBe(
      "boxy-button boxy-button-outline boxy-button-tiny x",
    );
    expect(buttonClass({ size: "normal" })).toBe("boxy-button boxy-button-accent boxy-button-normal");
    expect(buttonClass({ size: "small" })).toBe("boxy-button boxy-button-accent");
  });
});
