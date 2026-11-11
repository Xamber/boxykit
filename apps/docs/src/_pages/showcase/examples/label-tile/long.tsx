import { LabelTile, LabelTiles } from "boxykit/react";

export function LabelTileLong() {
  return (
    <LabelTiles>
      <LabelTile label="Reviewer">Design team</LabelTile>
      <LabelTile label="Milestone">Public beta launch</LabelTile>
      <LabelTile label="Blocked by">Database migration</LabelTile>
    </LabelTiles>
  );
}
