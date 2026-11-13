import { Field, Fields, Input } from "boxykit/react";
import { Search } from "lucide-react";

export function InputSizes() {
  return (
    <Fields layout="row">
      <Field label="Standard">
        <Input placeholder="Task name" icon={<Search className="boxy-icon" />} />
      </Field>
      <Field label="Small">
        <Input size="small" placeholder="Task name" icon={<Search className="boxy-icon" />} />
      </Field>
      <Field label="Tiny">
        <Input size="tiny" placeholder="Task name" icon={<Search className="boxy-icon" />} />
      </Field>
    </Fields>
  );
}
