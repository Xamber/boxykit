import type { ComponentProps, ReactElement, ReactNode } from "react";
import { classNames } from "./class-names.js";

/** The title of a part of a page, in big capitals. */
export function SectionHeading({
  className,
  children,
  ...props
}: ComponentProps<"h2"> & { children: ReactNode }): ReactElement {
  return (
    <h2 className={classNames("boxy-section-heading", className)} {...props}>
      {children}
    </h2>
  );
}

/** A part of a page under a SectionHeading. Other props go to the <section>. */
export function Section({
  className,
  title,
  children,
  ...props
}: Omit<ComponentProps<"section">, "title"> & {
  title: ReactNode;
}): ReactElement {
  return (
    <section className={classNames("boxy-section", className)} {...props}>
      <SectionHeading>{title}</SectionHeading>
      {children}
    </section>
  );
}
