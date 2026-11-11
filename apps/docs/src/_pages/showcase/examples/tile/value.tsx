import { Tile, Tiles } from "boxykit/react";

export function TileValue() {
  return (
    <Tiles>
      <Tile label="Total" value={845} index={4} of={4} />
    </Tiles>
  );
}
