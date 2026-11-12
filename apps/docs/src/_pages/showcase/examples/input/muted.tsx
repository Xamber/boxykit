import { Field, Input } from "boxykit/react";
import { Search } from "lucide-react";

export function InputMuted() {
  return (
    <Field label="Search tasks">
      <Input type="search" muted placeholder="Name or ID" icon={<Search className="boxy-icon" />} />
    </Field>
  );
}
