import { Button } from "boxykit/react";

export function ButtonLooks() {
  return (
    <div className="docs-row">
      <Button>Save</Button>
      <Button look="dark">Sign in →</Button>
      <Button look="outline">Sign out</Button>
    </div>
  );
}
