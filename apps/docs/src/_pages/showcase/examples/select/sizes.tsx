import { Field, Fields, Select } from "boxykit/react";

export function SelectSizes() {
  return (
    <Fields layout="row">
      <Field label="Standard">
        <Select defaultValue="normal">
          <option value="low">Low</option>
          <option value="normal">Normal</option>
        </Select>
      </Field>
      <Field label="Small">
        <Select size="small" defaultValue="normal">
          <option value="low">Low</option>
          <option value="normal">Normal</option>
        </Select>
      </Field>
      <Field label="Tiny">
        <Select size="tiny" defaultValue="normal">
          <option value="low">Low</option>
          <option value="normal">Normal</option>
        </Select>
      </Field>
    </Fields>
  );
}
