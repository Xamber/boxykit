import { StatTile, StatTiles } from "boxykit/react";

export function StatTileLabelOnly() {
  return (
    <StatTiles>
      <StatTile look="dark" label="Bugs" index={4} of={4} />
    </StatTiles>
  );
}
