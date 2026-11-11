import { buttonClass } from "boxykit/react";

export function ButtonLinksSmall() {
  return (
    <div className="docs-row">
      <a className={buttonClass({ size: "small" })} href="#button">
        Open
      </a>
      <a className={buttonClass({ look: "outline", size: "small" })} href="#button">
        View in Reports →
      </a>
    </div>
  );
}
