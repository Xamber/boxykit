import type { ComponentProps, ReactElement, ReactNode } from "react";
import { classNames } from "./class-names.js";

/**
 * The screen split into BoardCells by lines: stacked when narrow, from lg two columns, the left one
 * twice as wide unless `even`. Four cells make quarters, two make halves. It is --boxy-board-height tall,
 * less the Nav's height right under one. `fit` makes the rows as tall as their content instead of each other.
 */
export function Board({
  className,
  even = false,
  fit = false,
  ...props
}: ComponentProps<"div"> & {
  /** Both columns as wide as each other. */
  even?: boolean;
  /** Rows as tall as their content: a page of forms and results. */
  fit?: boolean;
}): ReactElement {
  return (
    <div
      className={classNames("boxy-board", even && "boxy-board-even", fit && "boxy-board-fit", className)}
      {...props}
    />
  );
}

/**
 * A cell of a Board. `tall` takes two rows of its column; `end` puts the content on the line below it.
 * `side` puts the cell in the right column, even when it comes first in the markup (and so first on a phone).
 * `sticky` keeps its content in view while the rest of the board scrolls; the content is then wrapped in a div.
 */
export function BoardCell({
  className,
  tall = false,
  end = false,
  side = false,
  sticky = false,
  children,
  ...props
}: ComponentProps<"section"> & {
  tall?: boolean;
  end?: boolean;
  side?: boolean;
  sticky?: boolean;
}): ReactElement {
  let content: ReactNode = children;

  if (sticky) content = <div className="boxy-board-sticky">{children}</div>;

  return (
    <section
      className={classNames(
        "boxy-board-cell",
        tall && "boxy-board-cell-tall",
        end && "boxy-board-cell-end",
        side && "boxy-board-cell-side",
        className,
      )}
      {...props}
    >
      {content}
    </section>
  );
}
