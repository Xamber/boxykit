import { LabelSquare, LabelSquares, ProgressRing } from "boxykit/react";

export function LabelSquareRing() {
  return (
    <LabelSquares>
      <LabelSquare
        label={
          <>
            Progress
            <ProgressRing value={2 / 3} title="2 of 3 skills passed" />
          </>
        }
      >
        2/3
      </LabelSquare>
    </LabelSquares>
  );
}
