import { Tile, Tiles } from "boxykit/react";

export function TileLooks() {
  return (
    <Tiles>
      <Tile look="accent" label="Projects" value={12} index={1} of={3} />
      <Tile look="dark" label="Tasks" value={845} index={2} of={3} />
      <Tile label="Teams" value={4} index={3} of={3} />
    </Tiles>
  );
}
