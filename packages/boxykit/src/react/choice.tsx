import type { ComponentProps, ReactElement, ReactNode, Ref } from "react";
import { classNames } from "./class-names.js";

type ChoiceProps = {
  /** The text of the row; the whole row toggles it. */
  label: ReactNode;
  /** Styles the row (the label), not the marker. */
  className?: string;
  invalid?: boolean;
} & Omit<ComponentProps<"input">, "type" | "className">;

/** Sets the DOM-only `indeterminate`, then hands the element to the caller's ref. */
function indeterminateRef(indeterminate: boolean, ref: Ref<HTMLInputElement> | undefined) {
  return (input: HTMLInputElement | null): void => {
    if (input) input.indeterminate = indeterminate;

    if (typeof ref === "function") {
      ref(input);
    } else if (ref) {
      ref.current = input;
    }
  };
}

/**
 * A checkbox row: a small square that fills when on, then the text. Native input props (`checked`, `name`,
 * `ref`…) reach the input; `className` the row. `indeterminate` half-fills it: "some of them", on a select-all.
 */
export function Checkbox({
  label,
  className,
  invalid = false,
  indeterminate = false,
  ref,
  ...props
}: ChoiceProps & { indeterminate?: boolean }): ReactElement {
  return (
    <label className={classNames("boxy-choice", className)}>
      <input
        ref={indeterminateRef(indeterminate, ref)}
        className="boxy-checkbox"
        type="checkbox"
        aria-invalid={invalid || undefined}
        {...props}
      />
      {label}
    </label>
  );
}

/**
 * A radio row: a small circle that fills when on. Give the radios of one question one `name`, in a ChoiceList.
 * No `invalid`: ARIA has none for a single radio; say what is wrong next to the list.
 */
export function Radio({ label, className, ...props }: Omit<ChoiceProps, "invalid">): ReactElement {
  return (
    <label className={classNames("boxy-choice", className)}>
      <input className="boxy-radio" type="radio" {...props} />
      {label}
    </label>
  );
}

/**
 * On or off, taking effect at once: the text, then YES ■ | □ NO at the row's end, the side it is on in the accent.
 * A checkbox with role="switch"; `onLabel` and `offLabel` are only shown, its name is `label`.
 */
export function Switch({
  label,
  className,
  invalid = false,
  onLabel = "Yes",
  offLabel = "No",
  ...props
}: ChoiceProps & { onLabel?: ReactNode; offLabel?: ReactNode }): ReactElement {
  return (
    <label className={classNames("boxy-choice", className)}>
      {label}
      <span className="boxy-switch-option" aria-hidden="true">
        {onLabel}
      </span>
      <input
        className="boxy-switch"
        type="checkbox"
        role="switch"
        aria-invalid={invalid || undefined}
        {...props}
      />
      <span className="boxy-switch-option" aria-hidden="true">
        {offLabel}
      </span>
    </label>
  );
}

/** A fieldset of Checkboxes, Radios or Switches in a column, `legend` its caption. `numbered` puts 01, 02… in front. */
export function ChoiceList({
  className,
  legend,
  numbered = false,
  children,
  ...props
}: { legend: ReactNode; numbered?: boolean } & ComponentProps<"fieldset">): ReactElement {
  return (
    <fieldset
      className={classNames("boxy-choice-list", numbered && "boxy-choice-list-numbered", className)}
      {...props}
    >
      <legend className="boxy-choice-list-legend">{legend}</legend>
      {children}
    </fieldset>
  );
}
