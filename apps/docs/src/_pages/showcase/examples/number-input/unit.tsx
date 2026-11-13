import { NumberInput } from "boxykit/react";

export function NumberInputUnit() {
  return <NumberInput aria-label="Gross salary" unit="€/year" step={100} defaultValue={48000} />;
}
