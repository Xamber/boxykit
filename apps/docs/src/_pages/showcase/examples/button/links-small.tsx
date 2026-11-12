import { buttonClass } from "boxykit/react";
import { ArrowRight, FolderOpen } from "lucide-react";

export function ButtonLinksSmall() {
  return (
    <div className="docs-row">
      <a className={buttonClass({ size: "small" })} href="#button">
        Open <FolderOpen className="boxy-icon" />
      </a>
      <a className={buttonClass({ look: "outline", size: "small" })} href="#button">
        View in Reports <ArrowRight className="boxy-icon" />
      </a>
    </div>
  );
}
