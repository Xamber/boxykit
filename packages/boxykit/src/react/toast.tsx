import type { ReactElement, ReactNode } from "react";
import { classNames } from "./class-names.js";

/** The corner the Toasts stand in, bottom right, one over the other. */
export function Toasts({ children }: { children: ReactNode }): ReactElement {
  return <section className="boxy-toasts">{children}</section>;
}

/**
 * An inverted rectangle: its title small at the top with an optional count, then the content.
 * With `actions` it waits for an answer (role="alertdialog"); the caller shows and hides it.
 */
export function Toast({
  className,
  title,
  count,
  actions,
  children,
}: {
  className?: string;
  title: string;
  count?: number;
  actions?: ReactNode;
  children: ReactNode;
}): ReactElement {
  const head = (
    <h2 className="boxy-toast-title">
      {title}
      {count !== undefined && <span className="boxy-toast-count">{count}</span>}
    </h2>
  );

  if (!actions) {
    return (
      <div className={classNames("boxy-toast", className)} role="status">
        {head}
        {children}
      </div>
    );
  }

  return (
    <div className={classNames("boxy-toast", className)} role="alertdialog" aria-label={title}>
      {head}
      {children}
      <footer className="boxy-toast-actions">{actions}</footer>
    </div>
  );
}
