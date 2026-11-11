import type { ComponentProps, ReactElement, ReactNode } from "react";
import { classNames } from "./class-names.js";

/** An inverted strip of NavLinks as wide as each other; the CSS numbers them 01, 02… */
export function Nav({
  className,
  label,
  children,
}: {
  className?: string;
  /** Names the nav for screen readers, e.g. "Main". */
  label: string;
  children: ReactNode;
}): ReactElement {
  return (
    <nav className={classNames("boxy-nav", className)} aria-label={label}>
      {children}
    </nav>
  );
}

/**
 * A link of the Nav; `current` marks the page you are on (aria-current="page").
 * With a router, give its link the same class and attribute: `<Link className="boxy-nav-link" aria-current="page">`.
 */
export function NavLink({
  className,
  current = false,
  children,
  ...props
}: { current?: boolean } & ComponentProps<"a">): ReactElement {
  let ariaCurrent: "page" | undefined;

  if (current) ariaCurrent = "page";

  return (
    <a className={classNames("boxy-nav-link", className)} aria-current={ariaCurrent} {...props}>
      {children}
    </a>
  );
}
