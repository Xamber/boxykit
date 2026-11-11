import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { NavLink, SelectableTiles, shareRing } from "../src/react/index.js";

const OPTIONS = [
  { value: "all", label: "All", count: 845 },
  { value: "mine", label: "Mine", count: 120 },
  { value: "archived", label: "Archived", count: 0, disabled: true },
];

describe("SelectableTiles", () => {
  it("presses the chosen tile and reports clicks on the others", () => {
    const onChange = vi.fn();

    render(<SelectableTiles label="Tasks" options={OPTIONS} value="all" onChange={onChange} />);

    const all = screen.getByRole("button", { name: /All/ });
    const mine = screen.getByRole("button", { name: /Mine/ });

    expect(screen.getByRole("group", { name: "Tasks" })).toBeDefined();
    expect(all.getAttribute("aria-pressed")).toBe("true");
    expect(mine.getAttribute("aria-pressed")).toBe("false");

    fireEvent.click(mine);

    expect(onChange).toHaveBeenCalledWith("mine");
  });

  it("ignores a disabled tile", () => {
    const onChange = vi.fn();

    render(<SelectableTiles label="Tasks" options={OPTIONS} value="all" onChange={onChange} />);
    fireEvent.click(screen.getByRole("button", { name: /Archived/ }));

    expect(onChange).not.toHaveBeenCalled();
  });
});

describe("shareRing", () => {
  it("titles the share and survives an empty whole", () => {
    expect(shareRing(312, 845, "all tasks")).toEqual({ value: 312 / 845, title: "37% of all tasks" });
    expect(shareRing(0, 0, "all tasks")).toEqual({ value: 0, title: "0% of all tasks" });
  });
});

describe("NavLink", () => {
  it("marks only the current page", () => {
    render(
      <nav>
        <NavLink href="/play" current>
          Play
        </NavLink>
        <NavLink href="/tasks">Tasks</NavLink>
      </nav>,
    );

    expect(screen.getByRole("link", { name: "Play" }).getAttribute("aria-current")).toBe("page");
    expect(screen.getByRole("link", { name: "Tasks" }).hasAttribute("aria-current")).toBe(false);
  });
});
