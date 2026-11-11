import { Spinner } from "boxykit/react";

export function ProgressSpinner() {
  return (
    <div className="docs-row">
      <Spinner />
      <Spinner size="large" />
    </div>
  );
}
