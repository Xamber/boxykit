import { Button, Field, Fields, Input, Select } from "boxykit/react";

// A label that wraps doesn't push its control off the line: the controls and the button share the bottom line.
export function FieldsRow() {
  return (
    <Fields layout="row">
      <Field label="Search">
        <Input type="search" placeholder="Name or ID" />
      </Field>
      <Field label="Priority">
        <Select defaultValue="normal">
          <option value="low">Low</option>
          <option value="normal">Normal</option>
          <option value="high">High</option>
        </Select>
      </Field>
      <Button size="normal">Filter</Button>
    </Fields>
  );
}
