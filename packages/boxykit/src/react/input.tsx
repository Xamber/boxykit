import type { ComponentProps, ReactElement } from "react";
import { classNames } from "./class-names.js";

/** A one-line text field; all native input props pass through. `invalid` sets aria-invalid. */
export function Input({
  className,
  muted = false,
  invalid = false,
  type = "text",
  ...props
}: { muted?: boolean; invalid?: boolean } & ComponentProps<"input">): ReactElement {
  return (
    <input
      className={classNames("boxy-input", muted && "boxy-input-muted", className)}
      type={type}
      aria-invalid={invalid || undefined}
      {...props}
    />
  );
}
