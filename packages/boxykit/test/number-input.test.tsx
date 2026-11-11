import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { NumberInput } from "../src/react/index.js";

function field(): HTMLInputElement {
  return screen.getByRole<HTMLInputElement>("spinbutton");
}

describe("NumberInput", () => {
  it("steps with − and +, and stops at min and max", () => {
    const onChange = vi.fn();

    render(<NumberInput aria-label="Guests" min={1} max={3} defaultValue={2} onChange={onChange} />);
    fireEvent.click(screen.getByRole("button", { name: "Increase" }));

    expect(field().value).toBe("3");
    expect(onChange).toHaveBeenLastCalledWith(3);
    expect(screen.getByRole<HTMLButtonElement>("button", { name: "Increase" }).disabled).toBe(true);

    fireEvent.click(screen.getByRole("button", { name: "Decrease" }));
    fireEvent.click(screen.getByRole("button", { name: "Decrease" }));

    expect(field().value).toBe("1");
    expect(screen.getByRole<HTMLButtonElement>("button", { name: "Decrease" }).disabled).toBe(true);
  });

  it("keeps fractional steps clean", () => {
    render(<NumberInput aria-label="Opacity" min={0} max={1} step={0.1} defaultValue={0.2} />);
    fireEvent.click(screen.getByRole("button", { name: "Increase" }));

    expect(field().value).toBe("0.3");
  });

  it("fits what is typed onto the steps when the field is left", () => {
    const onChange = vi.fn();

    render(<NumberInput aria-label="Guests" min={0} max={10} step={2} defaultValue={4} onChange={onChange} />);
    fireEvent.change(field(), { target: { value: "15" } });

    expect(onChange).not.toHaveBeenCalled();

    fireEvent.blur(field());

    expect(field().value).toBe("10");
    expect(onChange).toHaveBeenLastCalledWith(10);
  });

  it("runs from min to max across its width when the number is dragged", () => {
    const onChange = vi.fn();
    const { container } = render(
      <NumberInput aria-label="Guests" min={0} max={100} step={5} defaultValue={50} onChange={onChange} />,
    );
    const strip = container.querySelector<HTMLDivElement>(".boxy-number-input");

    if (!strip) throw new Error("no strip");

    strip.getBoundingClientRect = () => DOMRect.fromRect({ width: 200 });
    strip.setPointerCapture = vi.fn();
    fireEvent.pointerDown(field(), { button: 0, clientX: 100, pointerId: 1 });
    fireEvent.pointerMove(strip, { clientX: 150, pointerId: 1 });

    // A quarter of the width: a quarter of the range.
    expect(field().value).toBe("75");

    fireEvent.pointerMove(strip, { clientX: 400, pointerId: 1 });

    expect(field().value).toBe("100");

    fireEvent.pointerUp(strip, { pointerId: 1 });

    expect(onChange).toHaveBeenLastCalledWith(100);
    expect(document.activeElement).not.toBe(field());
  });

  it("focuses the field on a press that doesn't move", () => {
    const { container } = render(<NumberInput aria-label="Guests" defaultValue={1} />);
    const strip = container.querySelector<HTMLDivElement>(".boxy-number-input");

    if (!strip) throw new Error("no strip");

    strip.setPointerCapture = vi.fn();
    fireEvent.pointerDown(field(), { button: 0, clientX: 10, pointerId: 1 });
    fireEvent.pointerUp(strip, { pointerId: 1 });

    expect(document.activeElement).toBe(field());
  });

  it("shades how far the value is from min to max when filled", () => {
    const { container } = render(
      <NumberInput aria-label="Opacity" min={0} max={1} step={0.05} defaultValue={0.8} filled />,
    );
    const strip = container.querySelector<HTMLDivElement>(".boxy-number-input");

    expect(strip?.classList.contains("boxy-number-input-filled")).toBe(true);
    expect(strip?.style.getPropertyValue("--boxy-number-input-fill")).toBe("80%");
  });
});
