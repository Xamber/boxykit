import { Board, BoardCell, Button, Caption, LabelTile, LabelTiles } from "boxykit/react";

// A tall cell takes the whole left column; the other two stack on the right.
export function BoardTall() {
  return (
    <Board>
      <BoardCell tall>
        <Caption>TSK-0412</Caption>
        <LabelTiles>
          <LabelTile label="Status">In review</LabelTile>
          <LabelTile label="Owner">Mia</LabelTile>
        </LabelTiles>
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
