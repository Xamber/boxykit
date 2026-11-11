import { Button } from "boxykit/react";

export function ButtonSmall() {
  return (
    <div className="docs-row">
      <Button size="small">Assign</Button>
      <Button look="dark" size="small">
        Assign
      </Button>
      <Button look="outline" size="small">
        Open
      </Button>
    </div>
  );
}
