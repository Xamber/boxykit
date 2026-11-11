import { LabelTile, LabelTiles } from "boxykit/react";

export function LabelTileMissing() {
  return (
    <LabelTiles>
      <LabelTile label="Assignee" missing>
        None yet
      </LabelTile>
      <LabelTile label="Labels" missing wide>
        None yet
      </LabelTile>
    </LabelTiles>
  );
}
