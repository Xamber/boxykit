import { Alert } from "boxykit/react";

export function AlertTones() {
  return (
    <div className="docs-tiles">
      <Alert title="Info">Your progress syncs every minute.</Alert>
      <Alert tone="success" title="Saved">All 12 tasks are up to date.</Alert>
      <Alert tone="warning" title="Almost full">The list holds 3 more tasks.</Alert>
      <Alert tone="danger" title="Not saved">The connection dropped. Try again.</Alert>
      <Alert tone="success">No title, just the dot.</Alert>
    </div>
  );
}
