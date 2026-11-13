import { buttonClass } from "boxykit/react";
import { ArrowRight, FolderOpen } from "lucide-react";

export function ButtonLinksTiny() {
  return (
    <div className="docs-row">
      <a className={buttonClass({ size: "tiny" })} href="#button">
        Open <FolderOpen className="boxy-icon" />
      </a>
      <a className={buttonClass({ look: "outline", size: "tiny" })} href="#button">
        View in Reports <ArrowRight className="boxy-icon" />
      </a>
    </div>
  );
}
