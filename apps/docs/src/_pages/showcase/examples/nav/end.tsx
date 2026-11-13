import { Button, Nav, NavEnd, NavLink } from "boxykit/react";

// An outline button takes the strip's text color.
export function NavWithEnd() {
  return (
    <Nav label="Account">
      <NavLink href="#nav" current>
        Salary
      </NavLink>
      <NavLink href="#nav">Invoice</NavLink>
      <NavLink href="#nav">Taxes</NavLink>
      <NavEnd>
        <Button look="outline" size="tiny">
          Log out
        </Button>
      </NavEnd>
    </Nav>
  );
}
