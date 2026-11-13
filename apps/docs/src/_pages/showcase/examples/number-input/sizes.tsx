import { Field, Fields, NumberInput } from "boxykit/react";

export function NumberInputSizes() {
  return (
    <Fields layout="row">
      <Field label="Standard">
        <NumberInput unit="%" step={0.5} defaultValue={25.5} />
      </Field>
      <Field label="Small">
        <NumberInput size="small" unit="%" step={0.5} defaultValue={25.5} />
      </Field>
      <Field label="Tiny">
        <NumberInput size="tiny" unit="%" step={0.5} defaultValue={25.5} />
      </Field>
    </Fields>
  );
}
