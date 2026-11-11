import { TileIndex } from "boxykit/react";

export function StatTileIndex() {
  return (
    <div className="docs-row">
      <TileIndex index={1} of={4} />
      <TileIndex index={3} />
    </div>
  );
}
