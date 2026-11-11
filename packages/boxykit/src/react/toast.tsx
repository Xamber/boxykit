import type { ComponentProps, ReactElement, ReactNode } from "react";
import { classNames } from "./class-names.js";

/** The corner the Toasts stand in, bottom right, one over the other. */
export function Toasts({ className, ...props }: ComponentProps<"section">): ReactElement {
  return <section className={classNames("boxy-toasts", className)} {...props} />;
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
  ...props
}: Omit<ComponentProps<"div">, "title"> & {
  title: string;
  count?: number;
  actions?: ReactNode;
}): ReactElement {
  const head = (
    <h2 className="boxy-toast-title">
      {title}
      {count !== undefined && <span className="boxy-toast-count">{count}</span>}
    </h2>
  );

  if (actions === undefined || actions === null) {
    return (
      <div className={classNames("boxy-toast", className)} role="status" {...props}>
        {head}
        {children}
      </div>
    );
  }

  return (
    <div className={classNames("boxy-toast", className)} role="alertdialog" aria-label={title} {...props}>
      {head}
      {children}
      <footer className="boxy-toast-actions">{actions}</footer>
    </div>
  );
}
