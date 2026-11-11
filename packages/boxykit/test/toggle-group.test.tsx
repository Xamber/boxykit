import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ToggleGroup } from "../src/react/index.js";

const OPTIONS = [
  { value: "a", label: "A" },
  { value: "b", label: "B" },
];

describe("ToggleGroup", () => {
  it("marks the chosen option and reports clicks", () => {
    const onChange = vi.fn();

    render(<ToggleGroup label="Letters" options={OPTIONS} value="a" onChange={onChange} />);

    expect(screen.getByRole("radiogroup", { name: "Letters" })).toBeDefined();
    expect(screen.getByRole("radio", { name: "A" }).getAttribute("aria-checked")).toBe("true");
    expect(screen.getByRole("radio", { name: "B" }).getAttribute("aria-checked")).toBe("false");

    fireEvent.click(screen.getByRole("radio", { name: "B" }));

    expect(onChange).toHaveBeenCalledWith("b");
  });
});
