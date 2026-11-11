"use client";

import { Tile, Tiles } from "boxykit/react";

export function TileClickable() {
  function open() {
    // Open the list of these tasks.
  }

  return (
    <Tiles>
      <Tile look="accent" label="Overdue" value={8} index={1} of={3} onClick={open} />
      <Tile label="Last sprint" value={20} index={2} of={3} onClick={open} />
      <Tile label="Sprint before" value={0} index={3} of={3} disabled onClick={open} />
    </Tiles>
  );
}
