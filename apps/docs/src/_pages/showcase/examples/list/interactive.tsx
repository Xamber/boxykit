import { InteractiveList } from "boxykit/react";

const LINKS = [
  { href: "#overview", label: "Overview" },
  { href: "#tasks", label: "Tasks" },
  { href: "#reports", label: "Reports" },
  { href: "#settings", label: "Settings" },
];

export function ListInteractive() {
  return <InteractiveList label="Project" links={LINKS} current="#tasks" />;
}
