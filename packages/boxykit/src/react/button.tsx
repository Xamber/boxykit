import type { ComponentProps, ReactElement } from "react";
import { classNames } from "./class-names.js";
import { Spinner } from "./progress.js";

/** Accent for the main action, dark for the main action on the accent, outline for the quieter ones. */
export type ButtonLook = "accent" | "dark" | "outline";

/**
 * The same sizes as the fields, each as tall as the field of that size. A button is `small` unless told otherwise;
 * `normal` goes beside a normal field, `tiny` in table rows and next to lists.
 */
export type ButtonSize = "normal" | "small" | "tiny";

export type ButtonStyle = { look?: ButtonLook; size?: ButtonSize; className?: string };

/**
 * The button classes, for anything that should look like a button, e.g. a router link:
 * `<Link className={buttonClass({ look: "dark" })}>`.
 */
export function buttonClass({ look = "accent", size = "small", className }: ButtonStyle = {}): string {
  return classNames("boxy-button", `boxy-button-${look}`, size !== "small" && `boxy-button-${size}`, className);
}

/** A button; `type="button"` unless told otherwise. `pending` disables it and shows a Spinner after the label. */
export function Button({
  look,
  size,
  className,
  type = "button",
  pending = false,
  disabled,
  children,
  ...props
}: ButtonStyle & { pending?: boolean } & ComponentProps<"button">): ReactElement {
  return (
    <button
      className={buttonClass({ look, size, className })}
      // eslint-disable-next-line react/button-has-type -- the type is a prop, "button" by default
      type={type}
      disabled={disabled === true || pending}
      aria-busy={pending || undefined}
      {...props}
    >
      {children}
      {pending && <Spinner title="Pending" />}
    </button>
  );
}

/** A submit button that shows `pendingLabel` and a Spinner, disabled, while the form is busy. */
export function SubmitButton({
  look,
  pending,
  label,
  pendingLabel,
}: {
  look?: ButtonLook;
  pending: boolean;
  label: string;
  pendingLabel: string;
}): ReactElement {
  if (pending) {
    return (
      <Button look={look} type="submit" pending>
        {pendingLabel}
      </Button>
    );
  }

  return (
    <Button look={look} type="submit">
      {label}
    </Button>
  );
}
