import { StatTile, StatTiles } from "boxykit/react";

export function StatTileLooks() {
  return (
    <StatTiles>
      <StatTile look="accent" label="Projects" value={12} index={1} of={3} />
      <StatTile look="dark" label="Tasks" value={845} index={2} of={3} />
      <StatTile label="Teams" value={4} index={3} of={3} />
    </StatTiles>
  );
}
