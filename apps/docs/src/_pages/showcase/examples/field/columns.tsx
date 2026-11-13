import { Field, Fields, Input, Textarea } from "boxykit/react";

export function FieldsColumns() {
  return (
    <Fields layout="columns">
      <Field label="First name">
        <Input defaultValue="Mia" />
      </Field>
      <Field label="Last name">
        <Input defaultValue="Laine" />
      </Field>
      <Field label="City">
        <Input defaultValue="Tampere" />
      </Field>
      <Field label="Postal code">
        <Input defaultValue="33100" />
      </Field>
      <Field label="Notes" full>
        <Textarea defaultValue="Pays within 14 days." />
      </Field>
    </Fields>
  );
}
