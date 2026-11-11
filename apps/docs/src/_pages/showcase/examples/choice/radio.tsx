import { ChoiceList, Radio } from "boxykit/react";

export function ChoiceRadio() {
  return (
    <ChoiceList legend="Plan" numbered>
      <Radio name="plan" value="free" label="Free" />
      <Radio name="plan" value="team" label="Team" defaultChecked />
      <Radio name="plan" value="business" label="Business" />
    </ChoiceList>
  );
}
