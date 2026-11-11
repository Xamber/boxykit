import { LabelSquare, LabelSquares } from "boxykit/react";

export function LabelSquareBasic() {
  return (
    <LabelSquares>
      <LabelSquare label="Status">In review</LabelSquare>
      <LabelSquare label="Owner">Mia</LabelSquare>
    </LabelSquares>
  );
}
