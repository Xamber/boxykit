import type { ComponentProps, Key, ReactElement, ReactNode } from "react";
import { classNames } from "./class-names.js";

export type TagLook = "outline" | "accent" | "dark";

/** A short label in a small rectangle: outlined, or filled with the accent or dark. */
export function Tag({
  className,
  look = "outline",
  ...props
}: ComponentProps<"span"> & {
  look?: TagLook;
}): ReactElement {
  let lookClass: string | undefined;

  if (look !== "outline") lookClass = `boxy-tag-${look}`;

  return <span className={classNames("boxy-tag", lookClass, className)} {...props} />;
}

/** `icon`: an <svg> with boxy-icon, before the label. */
export type TagItem = { key: Key; label: string; title?: string; look?: TagLook; icon?: ReactNode };

/** A wrapping row of Tags. */
export function TagList({
  className,
  tags,
  ...props
}: Omit<ComponentProps<"span">, "children"> & { tags: TagItem[] }): ReactElement {
  return (
    <span className={classNames("boxy-tag-list", className)} {...props}>
      {tags.map((t) => (
        <Tag key={t.key} look={t.look} title={t.title}>
          {t.icon}
          {t.label}
        </Tag>
      ))}
    </span>
  );
}
