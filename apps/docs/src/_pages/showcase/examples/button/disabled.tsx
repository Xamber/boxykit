import { Button } from "boxykit/react";

export function ButtonDisabled() {
  return (
    <div className="docs-row">
      <Button disabled>Save</Button>
      <Button look="dark" disabled>
        Sign in →
      </Button>
      <Button look="outline" disabled>
        Sign out
      </Button>
    </div>
  );
}
