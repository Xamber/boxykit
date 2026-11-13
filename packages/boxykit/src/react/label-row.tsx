import type { ComponentProps, ReactElement, ReactNode } from "react";
import { classNames } from "./class-names.js";

/** A list of LabelRows divided by lines: a <dl>. */
export function LabelRows({ className, ...props }: ComponentProps<"dl">): ReactElement {
  return <dl className={classNames("boxy-label-rows", className)} {...props} />;
}

/**
 * A row of LabelRows: the label small and mono on the left, the value on the right.
 * `accent` fills the row that sums the others up.
 */
export function LabelRow({
  className,
  label,
  accent = false,
  children,
  ...props
}: ComponentProps<"div"> & {
  label: ReactNode;
  accent?: boolean;
  children: ReactNode;
}): ReactElement {
  return (
    <div className={classNames("boxy-label-row", accent && "boxy-label-row-accent", className)} {...props}>
      <dt className="boxy-label-row-label">{label}</dt>
      <dd className="boxy-label-row-value">{children}</dd>
    </div>
  );
}
