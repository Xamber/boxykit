import { buttonClass } from "boxykit/react";

// With a router, pass the classes to its link: <Link className={buttonClass({ look: "dark" })}>.
export function ButtonLink() {
  return (
    <a className={buttonClass({ look: "dark" })} href="#button">
      Open board →
    </a>
  );
}
