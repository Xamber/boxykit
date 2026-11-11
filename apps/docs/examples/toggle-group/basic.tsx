"use client";

import { ToggleGroup } from "boxykit/react";
import { useState } from "react";

const OPTIONS = [
  { value: "day", label: "Day" },
  { value: "week", label: "Week" },
  { value: "month", label: "Month" },
];

export function ToggleGroupBasic() {
  const [value, setValue] = useState("week");

  return <ToggleGroup label="Period" options={OPTIONS} value={value} onChange={setValue} />;
}
