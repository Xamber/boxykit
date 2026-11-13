import type { ComponentProps, ReactElement } from "react";
import { classNames } from "./class-names.js";

/** An outlined, rounded panel around any content. */
export function Box({ className, ...props }: ComponentProps<"div">): ReactElement {
  return <div className={classNames("boxy-box", className)} {...props} />;
}
