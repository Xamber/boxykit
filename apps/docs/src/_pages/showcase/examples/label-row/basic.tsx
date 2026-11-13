import { LabelRow, LabelRows } from "boxykit/react";

export function LabelRowBasic() {
  return (
    <LabelRows>
      <LabelRow label="Subtotal">1 200,00 €</LabelRow>
      <LabelRow label="VAT 25.5%">306,00 €</LabelRow>
      <LabelRow label="Total" accent>
        1 506,00 €
      </LabelRow>
    </LabelRows>
  );
}
