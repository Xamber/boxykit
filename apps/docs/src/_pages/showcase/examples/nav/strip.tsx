import { Nav, NavLink } from "boxykit/react";

// The numbers come from a CSS counter. With a router: <Link className="boxy-nav-link" aria-current="page">.
export function NavStrip() {
  return (
    <Nav label="Main">
      <NavLink href="#nav" current>
        Board
      </NavLink>
      <NavLink href="#nav">Tasks</NavLink>
      <NavLink href="#nav">Reports</NavLink>
      <NavLink href="#nav" title="Team settings and billing">
        Team settings and billing
      </NavLink>
    </Nav>
  );
}
