import { Caption } from "boxykit/react";
import { CircleCheck, Clock } from "lucide-react";

export function IconInText() {
  return (
    <div className="docs-stack">
      <p>
        <CircleCheck className="boxy-icon" /> Synced two minutes ago
      </p>
      <Caption>
        <Clock className="boxy-icon" /> Due Friday
      </Caption>
    </div>
  );
}
