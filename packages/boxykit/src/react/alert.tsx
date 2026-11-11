import type { ComponentProps, ReactElement, ReactNode } from "react";
import { classNames } from "./class-names.js";

export type AlertTone = "info" | "success" | "warning" | "danger";

/** Dark like a Toast (inverted: white on a dark page), or light: the page's own colors, outlined. */
export type AlertLook = "dark" | "light";

/**
 * A message in a Toast's rectangle: a dot in its tone top right, an optional title in the tone on top.
 * Danger and warning are announced right away (role="alert"), the others politely. Other props go to the <div>.
 */
export function Alert({
  className,
  tone = "info",
  look = "dark",
  title,
  children,
  ...props
}: Omit<ComponentProps<"div">, "title"> & {
  tone?: AlertTone;
  look?: AlertLook;
  title?: ReactNode;
  children: ReactNode;
}): ReactElement {
  let role = "status";

  if (tone === "danger" || tone === "warning") role = "alert";

  return (
    <div
      className={classNames("boxy-alert", `boxy-alert-${tone}`, look === "light" && "boxy-alert-light", className)}
      role={role}
      {...props}
    >
      {title !== undefined && <strong className="boxy-alert-title">{title}</strong>}
      <span>{children}</span>
    </div>
  );
}

/** Shown instead of an empty list or table: a dashed box, grey and centered. */
export function Empty({ className, ...props }: ComponentProps<"p">): ReactElement {
  return <p className={classNames("boxy-empty", className)} {...props} />;
}
