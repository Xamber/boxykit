import { Button, SubmitButton } from "boxykit/react";

export function ButtonPending() {
  return (
    <div className="docs-row">
      <Button pending>Saving</Button>
      <Button look="dark" pending>
        Signing in
      </Button>
      <Button look="outline" pending>
        Syncing
      </Button>
      <Button size="small" pending>
        Saving
      </Button>
      <SubmitButton pending label="Add project" pendingLabel="Adding" />
    </div>
  );
}
