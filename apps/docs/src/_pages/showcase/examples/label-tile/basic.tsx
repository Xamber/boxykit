import { LabelTile, LabelTiles } from "boxykit/react";

export function LabelTileBasic() {
  return (
    <LabelTiles>
      <LabelTile label="Status">In review</LabelTile>
      <LabelTile label="Owner">Mia</LabelTile>
    </LabelTiles>
  );
}
