import { ProgressRing } from "boxykit/react";

export function ProgressRingLarge() {
  return (
    <div className="docs-row">
      <ProgressRing value={0.15} title="15% done" size="large" />
      <ProgressRing value={0.4} title="40% done" size="large" />
      <ProgressRing value={0.85} title="85% done" size="large" />
    </div>
  );
}
