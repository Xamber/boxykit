import type { ReactElement } from "react";
import { classNames } from "./class-names.js";

const RADIUS = 7;
// Rounded, so the markup stays readable for those who copy it as HTML.
const CIRCUMFERENCE = 43.98;
const QUARTER = 11;

export type RingSize = "normal" | "large";

/** A small ring filled clockwise to `value` (0–1); `title` says what it means, e.g. "40% done". */
export function ProgressRing({
  className,
  value,
  title,
  size = "normal",
}: {
  className?: string;
  value: number;
  title: string;
  size?: RingSize;
}): ReactElement {
  return (
    <svg
      className={classNames("boxy-progress-ring", size === "large" && "boxy-progress-ring-large", className)}
      viewBox="0 0 18 18"
      role="img"
      aria-label={title}
    >
      <title>{title}</title>
      <circle className="boxy-progress-ring-track" cx="9" cy="9" r={RADIUS} />
      <circle
        className="boxy-progress-ring-value"
        cx="9"
        cy="9"
        r={RADIUS}
        strokeDasharray={CIRCUMFERENCE}
        strokeDashoffset={Math.round(CIRCUMFERENCE * (1 - value) * 100) / 100}
        transform="rotate(-90 9 9)"
      />
    </svg>
  );
}

/** The ring with a quarter of it running round: something is under way. */
export function Spinner({
  className,
  title = "Loading",
  size = "normal",
}: {
  className?: string;
  title?: string;
  size?: RingSize;
}): ReactElement {
  return (
    <svg
      className={classNames("boxy-spinner", size === "large" && "boxy-spinner-large", className)}
      viewBox="0 0 18 18"
      role="img"
      aria-label={title}
    >
      <title>{title}</title>
      <circle className="boxy-spinner-track" cx="9" cy="9" r={RADIUS} />
      <circle
        className="boxy-spinner-value"
        cx="9"
        cy="9"
        r={RADIUS}
        strokeDasharray={`${String(QUARTER)} ${String(CIRCUMFERENCE)}`}
      />
    </svg>
  );
}
