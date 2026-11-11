import { Board, BoardCell, Button, Caption, Headline, Tile, Tiles } from "boxykit/react";

// The left column twice as wide: the content on the left, its status and actions on the right.
export function BoardMainSide() {
  return (
    <Board>
      <BoardCell end>
        <Caption>Sprint 14</Caption>
        <Headline level={2}>Release 2.4</Headline>
      </BoardCell>
      <BoardCell end>
        <Tiles>
          <Tile look="accent" label="Done" value={18} outOf={24} index={1} of={2} />
          <Tile look="dark" label="Open" value={6} index={2} of={2} />
        </Tiles>
      </BoardCell>
      <BoardCell>
        <Caption>Next</Caption>
        <Headline level={2} ghost="tests">
          Fix
        </Headline>
      </BoardCell>
      <BoardCell>
        <Button>Start</Button>
      </BoardCell>
    </Board>
  );
}
