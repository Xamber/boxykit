import type { ComponentProps, ReactElement } from "react";
import { classNames } from "./class-names.js";

/** The native select; give it `<option>`s. All native props pass through. `invalid` sets aria-invalid. */
export function Select({
  className,
  invalid = false,
  ...props
}: { invalid?: boolean } & ComponentProps<"select">): ReactElement {
  return (
    <select className={classNames("boxy-select", className)} aria-invalid={invalid || undefined} {...props} />
  );
}
