import type { ComponentProps, ReactElement, ReactNode } from "react";
import { classNames } from "./class-names.js";

/**
 * A one-line text field; all native input props pass through. `invalid` sets aria-invalid.
 * `icon` (an <svg> with boxy-icon) sits inside it on the left; the input is then wrapped in a span.
 */
export function Input({
  className,
  muted = false,
  invalid = false,
  type = "text",
  icon,
  ...props
}: { muted?: boolean; invalid?: boolean; icon?: ReactNode } & ComponentProps<"input">): ReactElement {
  const input = (
    <input
      className={classNames("boxy-input", muted && "boxy-input-muted", className)}
      type={type}
      aria-invalid={invalid || undefined}
      {...props}
    />
  );

  if (icon === undefined) return input;

  return (
    <span className="boxy-input-with-icon">
      {icon}
      {input}
    </span>
  );
}
