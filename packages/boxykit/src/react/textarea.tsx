import type { ComponentProps, ReactElement } from "react";
import { classNames } from "./class-names.js";

/** A text field of several lines; all native textarea props pass through. `invalid` sets aria-invalid. */
export function Textarea({
  className,
  invalid = false,
  ...props
}: { invalid?: boolean } & ComponentProps<"textarea">): ReactElement {
  return (
    <textarea
      className={classNames("boxy-textarea", className)}
      aria-invalid={invalid || undefined}
      {...props}
    />
  );
}
