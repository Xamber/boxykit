import { Board, BoardCell, Button, Headline } from "boxykit/react";

export function BoardHalves() {
  return (
    <Board even>
      <BoardCell end>
        <Headline level={2} ghost="kit">
          Boxy
        </Headline>
      </BoardCell>
      <BoardCell end>
        <p>Two halves: put two cells in an even board.</p>
        <Button look="dark">Start →</Button>
      </BoardCell>
    </Board>
  );
}
