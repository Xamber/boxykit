"use client";

import { StatTile, StatTiles } from "boxykit/react";

export function StatTileClickable() {
  function open() {
    // Open the list of these tasks.
  }

  return (
    <StatTiles>
      <StatTile look="accent" label="Overdue" value={8} index={1} of={3} onClick={open} />
      <StatTile label="Last sprint" value={20} index={2} of={3} onClick={open} />
      <StatTile label="Sprint before" value={0} index={3} of={3} disabled onClick={open} />
    </StatTiles>
  );
}
