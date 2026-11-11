import { LabelSquare, LabelSquares } from "boxykit/react";

export function LabelSquareMissing() {
  return (
    <LabelSquares>
      <LabelSquare label="Assignee" missing>
        None yet
      </LabelSquare>
      <LabelSquare label="Labels" missing wide>
        None yet
      </LabelSquare>
    </LabelSquares>
  );
}
