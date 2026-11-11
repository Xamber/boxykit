import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { beforeAll, describe, expect, it, vi } from "vitest";
import { Dropdown } from "../src/react/index.js";

const OPTIONS = [
  { value: "helsinki", label: "Helsinki" },
  { value: "berlin", label: "Berlin" },
  { value: "tokyo", label: "Tokyo", ring: 0.5 },
];

function trigger(): HTMLButtonElement {
  return screen.getByRole<HTMLButtonElement>("button", { name: "City" });
}

function shownLabels(): string[] {
  return screen.queryAllByRole("option").map((option) => option.textContent);
}

describe("Dropdown", () => {
  // jsdom lays nothing out, so it has no scrollIntoView.
  beforeAll(() => {
    Element.prototype.scrollIntoView = vi.fn();
  });

  it("opens on click with the search focused, and a click on an option picks it and closes", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(<Dropdown aria-label="City" options={OPTIONS} onChange={onChange} />);

    expect(trigger().textContent).toBe("Choose…");

    await user.click(trigger());

    expect(trigger().getAttribute("aria-expanded")).toBe("true");
    expect(document.activeElement).toBe(screen.getByRole("combobox"));

    await user.click(screen.getByRole("option", { name: "Berlin" }));

    expect(onChange).toHaveBeenCalledWith("berlin");
    expect(trigger().textContent).toBe("Berlin");
    expect(trigger().getAttribute("aria-expanded")).toBe("false");
    expect(document.activeElement).toBe(trigger());
  });

  it("filters by the search, keeps the numbers, and says when nothing matches", async () => {
    const user = userEvent.setup();

    render(<Dropdown aria-label="City" options={OPTIONS} numbered />);
    await user.click(trigger());
    await user.keyboard("to");

    expect(shownLabels()).toEqual(["03Tokyo50%"]);

    await user.keyboard("x");

    expect(shownLabels()).toEqual([]);
    expect(screen.getByText("Nothing found").hidden).toBe(false);
  });

  it("moves with the arrows, picks with Enter, and closes with Esc", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(<Dropdown aria-label="City" options={OPTIONS} defaultValue="helsinki" onChange={onChange} />);
    trigger().focus();
    await user.keyboard("{ArrowDown}");

    const search = screen.getByRole("combobox");

    expect(search.getAttribute("aria-activedescendant")).toBe(screen.getByRole("option", { name: "Helsinki" }).id);

    await user.keyboard("{ArrowDown}{Enter}");

    expect(onChange).toHaveBeenCalledWith("berlin");

    await user.click(trigger());
    await user.keyboard("{Escape}");

    expect(trigger().getAttribute("aria-expanded")).toBe("false");
    expect(document.activeElement).toBe(trigger());
  });

  it("closes on a click outside, and without search the list takes the keys", async () => {
    const user = userEvent.setup();

    render(
      <>
        <Dropdown aria-label="City" options={OPTIONS} search={false} name="city" defaultValue="tokyo" />
        <p>Outside</p>
      </>,
    );
    await user.click(trigger());

    expect(screen.queryByRole("combobox")).toBeNull();
    expect(document.activeElement).toBe(screen.getByRole("listbox"));

    await user.keyboard("{Home}{Enter}");

    expect(document.querySelector<HTMLInputElement>('input[name="city"]')?.value).toBe("helsinki");

    await user.click(trigger());
    await user.click(screen.getByText("Outside"));

    expect(trigger().getAttribute("aria-expanded")).toBe("false");
  });
});
