import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Modal } from "../src/react/index.js";

describe("Modal", () => {
  it("opens with open, and ✕ calls onClose", () => {
    const onClose = vi.fn();
    const { rerender, container } = render(
      <Modal open={false} title="Rename" onClose={onClose}>
        Body
      </Modal>,
    );
    const dialog = container.querySelector("dialog");

    expect(dialog?.hasAttribute("open")).toBe(false);

    rerender(
      <Modal open title="Rename" onClose={onClose}>
        Body
      </Modal>,
    );

    expect(dialog?.hasAttribute("open")).toBe(true);

    fireEvent.click(screen.getByRole("button", { name: "Close" }));

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("calls onClose on a click on the backdrop, not inside", () => {
    const onClose = vi.fn();
    const { container } = render(
      <Modal open title="Rename" onClose={onClose}>
        Body
      </Modal>,
    );

    fireEvent.click(screen.getByText("Body"));

    expect(onClose).not.toHaveBeenCalled();

    const dialog = container.querySelector("dialog");

    if (!dialog) throw new Error("no dialog");

    fireEvent.click(dialog);

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
