import type { ComponentProps, ReactElement, ReactNode } from "react";
import { classNames } from "./class-names.js";

/** A wrapping row of LabelTiles. */
export function LabelTiles({ className, ...props }: ComponentProps<"ol">): ReactElement {
  return <ol className={classNames("boxy-label-tiles", className)} {...props} />;
}

/**
 * An outlined square: the label small at the top, the value at the bottom. `wide` makes it two squares
 * wide, for long values; `missing` marks an empty one with a dashed outline and a faded value.
 */
export function LabelTile({
  className,
  label,
  wide = false,
  missing = false,
  children,
  ...props
}: ComponentProps<"li"> & {
  /** Usually text; can hold more, such as a ProgressRing next to it. */
  label: ReactNode;
  wide?: boolean;
  missing?: boolean;
  children: ReactNode;
}): ReactElement {
  return (
    <li
      className={classNames(
        "boxy-label-tile",
        wide && "boxy-label-tile-wide",
        missing && "boxy-label-tile-missing",
        className,
      )}
      {...props}
    >
      <span className="boxy-label-tile-label">{label}</span>
      <span className="boxy-label-tile-value">{children}</span>
    </li>
  );
}
