import { Field, Fields, Input } from "boxykit/react";

export function FieldsStack() {
  return (
    <Fields>
      <Field label="Name">
        <Input defaultValue="Mia Laine" />
      </Field>
      <Field label="Email">
        <Input type="email" defaultValue="mia@example.com" />
      </Field>
    </Fields>
  );
}
