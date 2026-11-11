import type { ComponentProps, ReactElement, ReactNode } from "react";
import { classNames } from "./class-names.js";

export type AlertTone = "info" | "success" | "warning" | "danger";

/**
 * A message in a tone, with an optional title on top. Danger and warning are announced right away
 * (role="alert"), the others politely. Other props go to the <div>.
 */
export function Alert({
  className,
  tone = "info",
  title,
  children,
  ...props
}: Omit<ComponentProps<"div">, "title"> & {
  tone?: AlertTone;
  title?: ReactNode;
  children: ReactNode;
}): ReactElement {
  let role = "status";

  if (tone === "danger" || tone === "warning") role = "alert";

  return (
    <div className={classNames("boxy-alert", `boxy-alert-${tone}`, className)} role={role} {...props}>
      {title !== undefined && <strong className="boxy-alert-title">{title}</strong>}
      <span>{children}</span>
    </div>
  );
}

/** Shown instead of an empty list or table. */
export function Empty({ className, ...props }: ComponentProps<"p">): ReactElement {
  return <p className={classNames("boxy-empty", className)} {...props} />;
}
