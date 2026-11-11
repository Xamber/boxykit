import { Tile, Tiles } from "boxykit/react";

export function TileCorner() {
  return (
    <Tiles>
      <Tile label="Wed" value={140} corner="08.10" ring={{ value: 0.7, title: "140 tasks closed of 200" }} />
      <Tile
        look="accent"
        label="Thu"
        value={86}
        corner="09.10"
        ring={{ value: 0.43, title: "86 tasks closed of 200" }}
      />
    </Tiles>
  );
}
