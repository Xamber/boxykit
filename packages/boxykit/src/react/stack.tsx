import type { ComponentProps, ReactElement } from "react";
import { classNames } from "./class-names.js";

/** A spacing step: `gap={2}` is --boxy-space-2. */
export type StackGap = 2 | 3 | 4 | 6 | 8;

/** Children one under another with the same gap between them: --boxy-space-4 unless `gap` names another step. */
export function Stack({
  className,
  gap = 4,
  ...props
}: ComponentProps<"div"> & {
  gap?: StackGap;
}): ReactElement {
  return <div className={classNames("boxy-stack", gap !== 4 && `boxy-stack-${String(gap)}`, className)} {...props} />;
}
