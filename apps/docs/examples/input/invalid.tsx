import { Input } from "boxykit/react";

export function InputInvalid() {
  return <Input invalid aria-label="Email" defaultValue="not an email" />;
}
