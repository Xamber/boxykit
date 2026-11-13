import type { ComponentProps, ReactElement, ReactNode } from "react";
import { classNames } from "./class-names.js";

/** A field's size: `small` and `tiny` set the small text in less padding, for toolbars and table rows. */
export type InputSize = "normal" | "small" | "tiny";

/**
 * A one-line text field; all native input props but `size` pass through. `invalid` sets aria-invalid.
 * `icon` (an <svg> with boxy-icon) sits inside it on the left; the input is then wrapped in a span.
 */
export function Input({
  className,
  muted = false,
  invalid = false,
  type = "text",
  size = "normal",
  icon,
  ...props
}: { muted?: boolean; invalid?: boolean; size?: InputSize; icon?: ReactNode } & Omit<
  ComponentProps<"input">,
  "size"
>): ReactElement {
  const input = (
    <input
      className={classNames(
        "boxy-input",
        muted && "boxy-input-muted",
        size !== "normal" && `boxy-input-${size}`,
        className,
      )}
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
