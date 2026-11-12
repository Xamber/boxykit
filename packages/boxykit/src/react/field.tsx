import type { ComponentProps, ReactElement, ReactNode } from "react";
import { classNames } from "./class-names.js";

/** A label over a form control: `<Field label="Search"><Input … /></Field>`. The <label> wraps it, so no id is needed. */
export function Field({
  className,
  label,
  children,
  ...props
}: { label: ReactNode } & ComponentProps<"label">): ReactElement {
  return (
    <label className={classNames("boxy-field", className)} {...props}>
      <span className="boxy-field-label">{label}</span>
      {children}
    </label>
  );
}
