import type { ReactElement, ReactNode } from "react";
import { classNames } from "./class-names.js";

/** Items with a small square in front of each. */
export function List({ className, children }: { className?: string; children: ReactNode }): ReactElement {
  return <ul className={classNames("boxy-list", className)}>{children}</ul>;
}

/** Items numbered 01, 02… by the CSS. */
export function NumberedList({ className, children }: { className?: string; children: ReactNode }): ReactElement {
  return <ol className={classNames("boxy-list", "boxy-list-numbered", className)}>{children}</ol>;
}

/** An item of a List or NumberedList; the marker sits in the middle of its height. */
export function ListItem({ className, children }: { className?: string; children: ReactNode }): ReactElement {
  return <li className={classNames("boxy-list-item", className)}>{children}</li>;
}

export type ListLink = { href: string; label: ReactNode };

/**
 * A nav of links, numbered unless `numbered` is false: a table of contents. `current` is the href of the one
 * you are at (aria-current="true", in the accent); useCurrentSection follows the page for it.
 */
export function InteractiveList({
  className,
  label,
  links,
  current,
  numbered = true,
}: {
  className?: string;
  /** Names the nav for screen readers, e.g. "On this page". */
  label: string;
  links: ListLink[];
  current?: string;
  numbered?: boolean;
}): ReactElement {
  const items = links.map((l) => (
    <li key={l.href} className="boxy-list-item">
      <a className="boxy-list-link" href={l.href} aria-current={l.href === current ? "true" : undefined}>
        {l.label}
      </a>
    </li>
  ));

  if (!numbered) {
    return (
      <nav className={className} aria-label={label}>
        <ul className="boxy-list boxy-list-interactive">{items}</ul>
      </nav>
    );
  }

  return (
    <nav className={className} aria-label={label}>
      <ol className="boxy-list boxy-list-numbered boxy-list-interactive">{items}</ol>
    </nav>
  );
}
