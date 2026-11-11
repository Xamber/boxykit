import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { NumberInput } from "../src/react/index.js";

function field(): HTMLInputElement {
  return screen.getByRole<HTMLInputElement>("spinbutton");
}

function slider(container: HTMLElement): HTMLInputElement | null {
  return container.querySelector<HTMLInputElement>(".boxy-number-input-slider");
}

describe("NumberInput", () => {
  it("shows min and max at the ends of its slider, and the slider sets the value", () => {
    const onChange = vi.fn();
    const { container } = render(
      <NumberInput aria-label="Guests" min={1} max={12} defaultValue={2} onChange={onChange} />,
    );
    const bounds = [...container.querySelectorAll(".boxy-number-input-bound")].map((b) => b.textContent);

    expect(bounds).toEqual(["1", "12"]);

    const range = slider(container);

    if (!range) throw new Error("no slider");

    fireEvent.change(range, { target: { value: "7" } });

    expect(field().value).toBe("7");
    expect(onChange).toHaveBeenLastCalledWith(7);
  });

  it("with from and to has a slider but no bounds, and lets a typed number past them", () => {
    const { container } = render(<NumberInput aria-label="Budget" from={0} to={1000} step={50} defaultValue={300} />);

    expect(slider(container)).not.toBeNull();
    expect(container.querySelector(".boxy-number-input-bound")).toBeNull();

    fireEvent.change(field(), { target: { value: "1520" } });
    fireEvent.blur(field());

    // Onto the steps, but not held under `to`.
    expect(field().value).toBe("1500");
  });

  it("without a range is just the field", () => {
    const { container } = render(<NumberInput aria-label="Hours" step={0.5} defaultValue={1.5} />);

    expect(slider(container)).toBeNull();
  });

  it("fits what is typed onto the steps and inside min and max when the field is left", () => {
    const onChange = vi.fn();

    render(<NumberInput aria-label="Guests" min={0} max={10} step={2} defaultValue={4} onChange={onChange} />);
    fireEvent.change(field(), { target: { value: "15" } });

    expect(onChange).not.toHaveBeenCalled();

    fireEvent.blur(field());

    expect(field().value).toBe("10");
    expect(onChange).toHaveBeenLastCalledWith(10);
  });

  it("keeps fractional steps clean", () => {
    render(<NumberInput aria-label="Opacity" min={0} max={1} step={0.1} defaultValue={0.2} />);
    fireEvent.change(field(), { target: { value: "0.30000000000000004" } });
    fireEvent.blur(field());

    expect(field().value).toBe("0.3");
  });
});
