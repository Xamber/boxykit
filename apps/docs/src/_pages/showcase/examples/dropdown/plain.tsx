import { Dropdown } from "boxykit/react";
import { ArrowDownAZ, ArrowDownWideNarrow, ArrowUpNarrowWide } from "lucide-react";

const SORTS = [
  { value: "new", label: "Newest first", icon: <ArrowDownWideNarrow className="boxy-icon" /> },
  { value: "old", label: "Oldest first", icon: <ArrowUpNarrowWide className="boxy-icon" /> },
  { value: "name", label: "By name", icon: <ArrowDownAZ className="boxy-icon" /> },
];

export function DropdownPlain() {
  return <Dropdown aria-label="Sort" options={SORTS} defaultValue="new" search={false} />;
}
