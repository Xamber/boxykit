"use client";

import { SelectableTiles } from "boxykit/react";
import { useState } from "react";

const FILTERS = [
  { value: "all", label: "All", count: 845 },
  { value: "mine", label: "Mine", count: 120 },
  { value: "archived", label: "Archived", count: 0, disabled: true },
];

export function StatTileSelectable() {
  const [filter, setFilter] = useState("all");

  return <SelectableTiles label="Tasks" options={FILTERS} value={filter} onChange={setFilter} />;
}
