import { ChoiceList, Switch } from "boxykit/react";

export function ChoiceSwitch() {
  return (
    <ChoiceList legend="Notifications">
      <Switch label="Email" defaultChecked />
      <Switch label="Push" />
      <Switch label="Weekly digest" defaultChecked />
    </ChoiceList>
  );
}
