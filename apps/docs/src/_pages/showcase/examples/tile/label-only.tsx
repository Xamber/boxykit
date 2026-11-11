import { Tile, Tiles } from "boxykit/react";

export function TileLabelOnly() {
  return (
    <Tiles>
      <Tile look="dark" label="Bugs" index={4} of={4} />
    </Tiles>
  );
}
