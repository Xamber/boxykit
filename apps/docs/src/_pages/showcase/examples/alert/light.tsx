import { Alert } from "boxykit/react";

export function AlertLight() {
  return (
    <div className="docs-tiles">
      <Alert look="light" tone="success" title="Saved">All 12 tasks are up to date.</Alert>
      <Alert look="light" tone="danger">No title, just the dot.</Alert>
    </div>
  );
}
