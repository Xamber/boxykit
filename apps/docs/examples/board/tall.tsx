import { Board, BoardCell, Button, Caption, LabelSquare, LabelSquares } from "boxykit/react";

// A tall cell takes the whole left column; the other two stack on the right.
export function BoardTall() {
  return (
    <Board>
      <BoardCell tall>
        <Caption>TSK-0412</Caption>
        <LabelSquares>
          <LabelSquare label="Status">In review</LabelSquare>
          <LabelSquare label="Owner">Mia</LabelSquare>
        </LabelSquares>
      </BoardCell>
      <BoardCell end>
        <Caption>Step 2 of 4</Caption>
      </BoardCell>
      <BoardCell>
        <Button>Next</Button>
      </BoardCell>
    </Board>
  );
}
