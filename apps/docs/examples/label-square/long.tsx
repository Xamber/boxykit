import { LabelSquare, LabelSquares } from "boxykit/react";

export function LabelSquareLong() {
  return (
    <LabelSquares>
      <LabelSquare label="Reviewer">Design team</LabelSquare>
      <LabelSquare label="Milestone">Public beta launch</LabelSquare>
      <LabelSquare label="Blocked by">Database migration</LabelSquare>
    </LabelSquares>
  );
}
