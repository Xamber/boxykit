import { Dropdown } from "boxykit/react";

const GOALS = [
  { value: "launch", label: "Launch the beta", ring: 0.8 },
  { value: "docs", label: "Write the docs", ring: 0.45 },
  { value: "tests", label: "Cover the edge cases", ring: 0.2 },
  { value: "talk", label: "Give the meetup talk", ring: 0 },
  { value: "move", label: "Move to the new office", ring: 1 },
];

export function DropdownNumbered() {
  return <Dropdown aria-label="Goal" options={GOALS} defaultValue="docs" numbered />;
}
