import { LabelSquare, LabelSquares } from "boxykit/react";

export function LabelSquareWide() {
  return (
    <LabelSquares>
      <LabelSquare label="Projects" wide>
        Website redesign
        <br />
        Mobile app
      </LabelSquare>
    </LabelSquares>
  );
}
