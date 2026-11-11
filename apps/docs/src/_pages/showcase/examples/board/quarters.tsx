import { Board, BoardCell, Caption, HeroNumber } from "boxykit/react";

const STATS = [
  { label: "Done", value: 62 },
  { label: "In progress", value: 23 },
  { label: "To do", value: 11 },
  { label: "Blocked", value: 4 },
];

export function BoardQuarters() {
  return (
    <Board even>
      {STATS.map((s) => (
        <BoardCell key={s.label} end>
          <HeroNumber value={s.value} unit="%" />
          <Caption>{s.label}</Caption>
        </BoardCell>
      ))}
    </Board>
  );
}
