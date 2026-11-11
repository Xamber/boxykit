import { fireEvent, render, screen } from "@testing-library/react";
import { createRef } from "react";
import { describe, expect, it } from "vitest";
import { Checkbox, ChoiceList, Radio, Switch } from "../src/react/index.js";

describe("Checkbox, Radio and Switch", () => {
  it("toggle from their text", () => {
    render(<Checkbox label="Ship" />);
    fireEvent.click(screen.getByText("Ship"));

    expect(screen.getByRole<HTMLInputElement>("checkbox", { name: "Ship" }).checked).toBe(true);
  });

  it("set indeterminate and still hand over the ref", () => {
    const ref = createRef<HTMLInputElement>();

    render(<Checkbox ref={ref} label="All" indeterminate />);

    expect(ref.current?.indeterminate).toBe(true);
    expect(ref.current?.className).toBe("boxy-checkbox");
  });

  it("are a switch and a radio group to assistive tech", () => {
    render(
      <>
        <Switch label="Email me" />
        <ChoiceList legend="Delivery">
          <Radio name="d" label="Standard" />
        </ChoiceList>
      </>,
    );

    // YES and NO are only shown: the switch is named by its label alone.
    expect(screen.getByRole("switch", { name: "Email me" })).toBeDefined();
    expect(screen.getByRole("group", { name: "Delivery" })).toBeDefined();
    expect(screen.getByRole("radio", { name: "Standard" })).toBeDefined();
  });

  it("ChoiceList is a group with the list look, numbered on request", () => {
    const { container } = render(
      <ChoiceList legend="Plan" numbered>
        <Radio name="plan" label="Free" />
      </ChoiceList>,
    );

    expect(screen.getByRole("group", { name: "Plan" })).toBeDefined();
    expect(container.querySelector("fieldset")?.className).toBe(
      "boxy-choice-list boxy-choice-list-numbered",
    );
  });
});
