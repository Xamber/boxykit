import type { ComponentProps, ReactElement, ReactNode } from "react";
import { classNames } from "./class-names.js";

/**
 * A label over a form control: `<Field label="Search"><Input … /></Field>`. The <label> wraps it, so no id is needed.
 * `full` takes the whole width of Fields in columns.
 */
export function Field({
  className,
  label,
  full = false,
  children,
  ...props
}: { label: ReactNode; full?: boolean } & ComponentProps<"label">): ReactElement {
  return (
    <label className={classNames("boxy-field", full && "boxy-field-full", className)} {...props}>
      <span className="boxy-field-label">{label}</span>
      {children}
    </label>
  );
}

/**
 * How Fields lays its fields out. "stack": one under another. "columns": two across from sm.
 * "row": side by side on one line, wrapping. "aside": from sm the labels beside the controls, in a column of their own.
 */
export type FieldsLayout = "stack" | "columns" | "row" | "aside";

/** A group of Fields, and whatever goes with them (a ChoiceList, a button), laid out by `layout`. */
export function Fields({
  className,
  layout = "stack",
  ...props
}: ComponentProps<"div"> & {
  layout?: FieldsLayout;
}): ReactElement {
  return (
    <div className={classNames("boxy-fields", layout !== "stack" && `boxy-fields-${layout}`, className)} {...props} />
  );
}
