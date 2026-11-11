import type { ReactElement, ReactNode } from "react";
import { classNames } from "./class-names.js";

const HEADINGS = { 1: "h1", 2: "h2", 3: "h3" } as const;

/** Big capitals, set tight: an h1 unless `level` says otherwise. `ghost` adds words set back in grey. */
export function Headline({
  className,
  level = 1,
  ghost,
  children,
}: {
  className?: string;
  level?: 1 | 2 | 3;
  ghost?: ReactNode;
  children: ReactNode;
}): ReactElement {
  const Heading = HEADINGS[level];

  return (
    <Heading className={classNames("boxy-headline", className)}>
      {children}
      {ghost !== undefined && (
        <>
          {" "}
          <span className="boxy-headline-ghost">{ghost}</span>
        </>
      )}
    </Heading>
  );
}

/** The one number a screen is about, as big as it gets: 62 with its unit, %, small at the top. */
export function HeroNumber({
  className,
  value,
  unit,
}: {
  className?: string;
  value: ReactNode;
  unit?: ReactNode;
}): ReactElement {
  return (
    <p className={classNames("boxy-hero", className)}>
      {value}
      {unit !== undefined && <span className="boxy-hero-unit">{unit}</span>}
    </p>
  );
}

/** Small grey capitals, spaced wide: what a block or a number is. */
export function Caption({ className, children }: { className?: string; children: ReactNode }): ReactElement {
  return <p className={classNames("boxy-caption", className)}>{children}</p>;
}

/** Small grey mono, inline: IDs, dates, counts. */
export function Mono({ className, children }: { className?: string; children: ReactNode }): ReactElement {
  return <span className={classNames("boxy-mono", className)}>{children}</span>;
}
