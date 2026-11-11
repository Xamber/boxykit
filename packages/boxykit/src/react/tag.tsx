import type { Key, ReactElement, ReactNode } from "react";
import { classNames } from "./class-names.js";

export type TagLook = "outline" | "accent" | "dark";

/** A short label in a small rectangle: outlined, or filled with the accent or dark. */
export function Tag({
  className,
  look = "outline",
  title,
  children,
}: {
  className?: string;
  look?: TagLook;
  title?: string;
  children: ReactNode;
}): ReactElement {
  let lookClass: string | undefined;

  if (look !== "outline") lookClass = `boxy-tag-${look}`;

  return (
    <span className={classNames("boxy-tag", lookClass, className)} title={title}>
      {children}
    </span>
  );
}

export type TagItem = { key: Key; label: string; title?: string; look?: TagLook };

/** A wrapping row of Tags. */
export function TagList({ className, tags }: { className?: string; tags: TagItem[] }): ReactElement {
  return (
    <span className={classNames("boxy-tag-list", className)}>
      {tags.map((t) => (
        <Tag key={t.key} look={t.look} title={t.title}>
          {t.label}
        </Tag>
      ))}
    </span>
  );
}
