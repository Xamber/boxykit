import { NumberInput } from "boxykit/react";

export function NumberInputDecimal() {
  return <NumberInput aria-label="Opacity" name="opacity" min={0} max={1} step={0.05} defaultValue={0.8} filled />;
}
