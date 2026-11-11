import { StatTile, StatTiles } from "boxykit/react";

export function StatTileValue() {
  return (
    <StatTiles>
      <StatTile label="Total" value={845} index={4} of={4} />
    </StatTiles>
  );
}
