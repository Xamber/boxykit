import { StatTile, StatTiles } from "boxykit/react";

export function StatTileCorner() {
  return (
    <StatTiles>
      <StatTile label="Wed" value={140} corner="08.10" ring={{ value: 0.7, title: "140 tasks closed of 200" }} />
      <StatTile
        look="accent"
        label="Thu"
        value={86}
        corner="09.10"
        ring={{ value: 0.43, title: "86 tasks closed of 200" }}
      />
    </StatTiles>
  );
}
