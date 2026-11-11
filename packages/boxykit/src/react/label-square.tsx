import type { ReactElement, ReactNode } from "react";
import { classNames } from "./class-names.js";

/** A wrapping row of LabelSquares. */
export function LabelSquares({ className, children }: { className?: string; children: ReactNode }): ReactElement {
  return <ol className={classNames("boxy-label-squares", className)}>{children}</ol>;
}

/**
 * An outlined square: the label small at the top, the value at the bottom. `wide` makes it two squares
 * wide, for long values; `missing` marks an empty one with a dashed outline and a faded value.
 */
export function LabelSquare({
  className,
  label,
  wide = false,
  missing = false,
  title,
  children,
}: {
  className?: string;
  /** Usually text; can hold more, such as a ProgressRing next to it. */
  label: ReactNode;
  wide?: boolean;
  missing?: boolean;
  title?: string;
  children: ReactNode;
}): ReactElement {
  return (
    <li
      className={classNames(
        "boxy-label-square",
        wide && "boxy-label-square-wide",
        missing && "boxy-label-square-missing",
        className,
      )}
      title={title}
    >
      <span className="boxy-label-square-label">{label}</span>
      <span className="boxy-label-square-value">{children}</span>
    </li>
  );
}
