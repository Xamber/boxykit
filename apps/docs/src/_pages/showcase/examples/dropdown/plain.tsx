import { Dropdown } from "boxykit/react";

const SORTS = [
  { value: "new", label: "Newest first" },
  { value: "old", label: "Oldest first" },
  { value: "name", label: "By name" },
];

export function DropdownPlain() {
  return <Dropdown aria-label="Sort" options={SORTS} defaultValue="new" search={false} />;
}
