import { TriangleAlert } from "lucide-react";

// An icon that says something on its own gets a name; one next to words that say it stays hidden (Lucide's default).
export function IconLabelled() {
  return (
    <p>
      Billing <TriangleAlert className="boxy-icon" role="img" aria-hidden={false} aria-label="Needs attention" />
    </p>
  );
}
