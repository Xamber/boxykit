import type { ComponentProps, ReactElement } from "react";
import { classNames } from "./class-names.js";

/**
 * The screen split into BoardCells by lines: stacked when narrow, from lg two columns, the left one
 * twice as wide unless `even`. Four cells make quarters, two make halves. It is --boxy-board-height tall.
 */
export function Board({
  className,
  even = false,
  ...props
}: ComponentProps<"div"> & {
  /** Both columns as wide as each other. */
  even?: boolean;
}): ReactElement {
  return <div className={classNames("boxy-board", even && "boxy-board-even", className)} {...props} />;
}

/** A cell of a Board. `tall` takes the whole left column; `end` puts the content on the line below it. */
export function BoardCell({
  className,
  tall = false,
  end = false,
  ...props
}: ComponentProps<"section"> & {
  tall?: boolean;
  end?: boolean;
}): ReactElement {
  return (
    <section
      className={classNames(
        "boxy-board-cell",
        tall && "boxy-board-cell-tall",
        end && "boxy-board-cell-end",
        className,
      )}
      {...props}
    />
  );
}
