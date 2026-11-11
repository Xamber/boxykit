import { StatTile, StatTiles, shareRing } from "boxykit/react";

export function StatTileOutOf() {
  return (
    <StatTiles>
      <StatTile look="accent" label="Step" value={2} outOf={4} index={1} of={2} />
      <StatTile label="Task" value={3} outOf={10} index={2} of={2} ring={shareRing(2, 10, "this sprint done")} />
    </StatTiles>
  );
}
