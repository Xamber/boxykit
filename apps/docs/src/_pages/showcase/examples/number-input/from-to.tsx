import { NumberInput } from "boxykit/react";

export function NumberInputFromTo() {
  return <NumberInput aria-label="Budget" name="budget" from={0} to={1000} step={50} defaultValue={300} />;
}
