import { LabelTile, LabelTiles } from "boxykit/react";

export function LabelTileWide() {
  return (
    <LabelTiles>
      <LabelTile label="Projects" wide>
        Website redesign
        <br />
        Mobile app
      </LabelTile>
    </LabelTiles>
  );
}
