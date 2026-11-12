import { TagList } from "boxykit/react";
import { Bug } from "lucide-react";

const TAGS = [
  { key: "p1", label: "P1", look: "accent" as const },
  { key: "bug", label: "Bug", look: "dark" as const, icon: <Bug className="boxy-icon" /> },
  { key: "web", label: "Frontend", title: "The web app" },
  { key: "q4", label: "Q4" },
];

export function TagListExample() {
  return <TagList tags={TAGS} />;
}
