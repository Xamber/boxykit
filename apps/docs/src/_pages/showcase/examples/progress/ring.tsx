import { ProgressRing } from "boxykit/react";

export function ProgressRingExample() {
  return (
    <div className="docs-row">
      <ProgressRing value={0} title="0% done" />
      <ProgressRing value={0.4} title="40% done" />
      <ProgressRing value={1} title="100% done" />
    </div>
  );
}
