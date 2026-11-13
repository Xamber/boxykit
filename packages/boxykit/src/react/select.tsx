import type { ComponentProps, ReactElement } from "react";
import { classNames } from "./class-names.js";
import type { InputSize } from "./input.js";

/** The native select; give it `<option>`s. All native props but `size` pass through. `invalid` sets aria-invalid; `size` is the Input's. */
export function Select({
  className,
  invalid = false,
  size = "normal",
  ...props
}: { invalid?: boolean; size?: InputSize } & Omit<ComponentProps<"select">, "size">): ReactElement {
  return (
    <select
      className={classNames("boxy-select", size !== "normal" && `boxy-select-${size}`, className)}
      aria-invalid={invalid || undefined}
      {...props}
    />
  );
}
