import { InteractiveList } from "boxykit/react";

const LINKS = [
  { href: "#inbox", label: "Inbox" },
  { href: "#today", label: "Today" },
  { href: "#later", label: "Later" },
];

export function ListInteractivePlain() {
  return <InteractiveList label="Views" links={LINKS} current="#today" numbered={false} />;
}
