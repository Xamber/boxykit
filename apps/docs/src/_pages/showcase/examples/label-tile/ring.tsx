import { LabelTile, LabelTiles, ProgressRing } from "boxykit/react";

export function LabelTileRing() {
  return (
    <LabelTiles>
      <LabelTile
        label={
          <>
            Progress
            <ProgressRing value={2 / 3} title="2 of 3 skills passed" />
          </>
        }
      >
        2/3
      </LabelTile>
    </LabelTiles>
  );
}
