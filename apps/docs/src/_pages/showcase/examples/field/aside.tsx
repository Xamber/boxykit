import { Field, Fields, Input, NumberInput } from "boxykit/react";

export function FieldsAside() {
  return (
    <Fields layout="aside">
      <Field label="Company">
        <Input defaultValue="Northwind Oy" />
      </Field>
      <Field label="Gross salary">
        <NumberInput unit="€/year" step={100} defaultValue={48000} />
      </Field>
      <Field label="VAT">
        <NumberInput unit="%" step={0.5} defaultValue={25.5} />
      </Field>
    </Fields>
  );
}
