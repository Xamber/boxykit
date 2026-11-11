import { NumberInput } from "boxykit/react";

export function NumberInputPlain() {
  return <NumberInput aria-label="Hours" step={0.5} defaultValue={1.5} />;
}
