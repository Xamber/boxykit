import { Board, BoardCell, Button, Caption, Headline, LabelRow, LabelRows, Nav, NavLink } from "boxykit/react";

// A tool page: the side cell comes first (so first on a phone) and still sits on the right, its content in view
// while the results scroll. Right under the Nav, the board is that much shorter.
export function BoardTool() {
  return (
    <>
      <Nav label="Tools">
        <NavLink href="#layout" current>
          Salary
        </NavLink>
        <NavLink href="#layout">Invoice</NavLink>
      </Nav>
      <Board fit>
        <BoardCell side sticky tall>
          <Caption>Inputs</Caption>
          <Button>Calculate</Button>
        </BoardCell>
        <BoardCell>
          <Caption>Net, a month</Caption>
          <Headline level={2}>2 940 €</Headline>
        </BoardCell>
        <BoardCell>
          <Caption>Breakdown</Caption>
          <LabelRows>
            <LabelRow label="Gross">4 000 €</LabelRow>
            <LabelRow label="Tax">−1 060 €</LabelRow>
          </LabelRows>
        </BoardCell>
      </Board>
    </>
  );
}
