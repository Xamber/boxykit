import { Select } from "boxykit/react";

export function SelectBasic() {
  return (
    <Select aria-label="Priority" defaultValue="normal">
      <option value="low">Low</option>
      <option value="normal">Normal</option>
      <option value="high">High</option>
      <option value="urgent">Urgent</option>
    </Select>
  );
}
