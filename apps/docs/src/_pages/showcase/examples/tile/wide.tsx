import { Tile, Tiles, shareRing } from "boxykit/react";

export function TileWide() {
  return (
    <Tiles>
      <Tile
        look="accent"
        wide
        label="Showing"
        value={120}
        outOf={845}
        index={1}
        of={2}
        ring={shareRing(120, 845, "all tasks")}
      />
      <Tile label="Bugs" value={413} index={2} of={2} ring={shareRing(413, 845, "all tasks")} />
    </Tiles>
  );
}
