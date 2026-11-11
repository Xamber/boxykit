import type { ReactElement, ReactNode } from "react";
import { classNames } from "./class-names.js";

/** The title of a part of a page, in big capitals. */
export function SectionHeading({ className, children }: { className?: string; children: ReactNode }): ReactElement {
  return <h2 className={classNames("boxy-section-heading", className)}>{children}</h2>;
}

/** A part of a page under a SectionHeading. */
export function Section({
  className,
  title,
  children,
}: {
  className?: string;
  title: ReactNode;
  children: ReactNode;
}): ReactElement {
  return (
    <section className={classNames("boxy-section", className)}>
      <SectionHeading>{title}</SectionHeading>
      {children}
    </section>
  );
}
