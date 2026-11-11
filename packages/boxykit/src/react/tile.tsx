import type { ComponentProps, ReactElement, ReactNode } from "react";
import { classNames } from "./class-names.js";
import { ProgressRing } from "./progress.js";

/** A share of something, 0–1, and what it means, e.g. "34% of all tasks". */
export type TileRing = { value: number; title: string };

/** Accent for the first or the main number, dark for the others; none is outlined. */
export type TileLook = "accent" | "dark";

/** The ring of `part` out of `whole`, titled e.g. "34% of all tasks" for `of` "all tasks". */
export function shareRing(part: number, whole: number, of: string): TileRing {
  let value = 0;

  if (whole) value = part / whole;

  return { value, title: `${String(Math.round(value * 100))}% of ${of}` };
}

/** A grid of square Tiles, as many in a row as fit --boxy-tile-size. */
export function Tiles({ className, ...props }: ComponentProps<"ol">): ReactElement {
  return <ol className={classNames("boxy-tiles", className)} {...props} />;
}

/**
 * A square tile: its place (`01/04`, or a `corner` text such as a date) and an optional ring at the top,
 * the value big (`500/845` with `outOf`) and its label at the bottom.
 * With `onClick` the whole tile is a button and its label ends in →; `pressed` marks the chosen one.
 */
export function Tile({
  className,
  look,
  wide = false,
  label,
  value,
  outOf,
  index,
  of,
  corner,
  ring,
  onClick,
  pressed,
  disabled = false,
}: {
  className?: string;
  look?: TileLook;
  /** Two squares wide, as tall as one: the tile that leads a row. */
  wide?: boolean;
  /** What the value is. */
  label?: string;
  /** A count or a short word; a tile whose label says it all, such as "Bugs", has none. */
  value?: number | string;
  /** What the value is out of, shown small after it. */
  outOf?: number;
  /** The tile's place in the grid, from 1, and how many there are. */
  index?: number;
  of?: number;
  /** Shown in the corner instead of the place, e.g. a date. */
  corner?: string;
  ring?: TileRing;
  onClick?: () => void;
  pressed?: boolean;
  disabled?: boolean;
}): ReactElement {
  const tileClass = classNames(
    "boxy-tile",
    look && `boxy-tile-${look}`,
    wide && "boxy-tile-wide",
    className,
  );
  const content = (
    <>
      <span className="boxy-tile-top">
        {corner !== undefined && <span className="boxy-tile-index">{corner}</span>}
        {index !== undefined && <TileIndex index={index} of={of} />}
        {ring && <ProgressRing value={ring.value} title={ring.title} />}
      </span>
      <span className="boxy-tile-bottom">
        {value !== undefined && (
          <span className="boxy-tile-value">
            {value}
            {outOf !== undefined && <span className="boxy-tile-out-of">/{outOf}</span>}
          </span>
        )}
        {label && (
          <span className="boxy-tile-label">
            {label}
            {onClick && " →"}
          </span>
        )}
      </span>
    </>
  );

  if (!onClick) return <li className={tileClass}>{content}</li>;

  return (
    <li className={tileClass}>
      <button
        type="button"
        className="boxy-tile-button"
        aria-pressed={pressed}
        disabled={disabled}
        onClick={onClick}
      >
        {content}
      </button>
    </li>
  );
}

/** A choice of SelectableTiles: its tile's label, and the count and ring the tile shows. */
export type TileOption<T> = { value: T; label: string; count?: number; ring?: TileRing; disabled?: boolean };

/**
 * Tiles to pick one of, like radio buttons: the chosen one accent, the others dark.
 * `children` adds tiles after the options, e.g. one that shows more of them.
 */
export function SelectableTiles<T>({
  className,
  label,
  options,
  value,
  onChange,
  disabled = false,
  children,
}: {
  className?: string;
  /** What is picked, for screen readers. */
  label: string;
  options: TileOption<T>[];
  value: T;
  onChange: (value: T) => void;
  disabled?: boolean;
  children?: ReactNode;
}): ReactElement {
  return (
    <div className={className} role="group" aria-label={label}>
      <Tiles>
        {options.map((option, i) => {
          const chosen = option.value === value;
          let look: TileLook = "dark";

          if (chosen) look = "accent";

          return (
            <Tile
              key={String(option.value)}
              look={look}
              label={option.label}
              value={option.count}
              ring={option.ring}
              index={i + 1}
              of={options.length}
              pressed={chosen}
              disabled={disabled || option.disabled}
              onClick={() => {
                onChange(option.value);
              }}
            />
          );
        })}
        {children}
      </Tiles>
    </div>
  );
}

/** A place in small mono numbers, `01/04`; without `of` just `01`. */
export function TileIndex({ className, index, of }: { className?: string; index: number; of?: number }): ReactElement {
  return (
    <span className={classNames("boxy-tile-index", className)}>
      {twoDigits(index)}
      {of !== undefined && <span className="boxy-tile-index-of">/{twoDigits(of)}</span>}
    </span>
  );
}

function twoDigits(n: number): string {
  return String(n).padStart(2, "0");
}
