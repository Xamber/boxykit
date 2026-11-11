import { Tile, Tiles, shareRing } from "boxykit/react";

export function TileWithRing() {
  return (
    <Tiles>
      <Tile look="accent" label="Done" value={312} index={1} of={3} ring={shareRing(312, 845, "all tasks")} />
      <Tile look="dark" label="In progress" value={120} index={2} of={3} ring={shareRing(120, 845, "all tasks")} />
      <Tile label="Bugs" value={413} index={3} of={3} ring={shareRing(413, 845, "all tasks")} />
    </Tiles>
  );
}
