import { Table } from "boxykit/react";
import type { Column } from "boxykit/react";

type Line = { item: string; hours: string; amount: string };

const LINES: Line[] = [
  { item: "Design", hours: "12,5", amount: "1 000,00 €" },
  { item: "Development", hours: "40", amount: "3 600,00 €" },
  { item: "Review", hours: "3", amount: "270,00 €" },
];

const TOTAL: Line[] = [{ item: "Total", hours: "55,5", amount: "4 870,00 €" }];

const COLUMNS: Column<Line>[] = [
  { key: "item", header: "Item", render: (l) => l.item },
  { key: "hours", header: "Hours", numeric: true, render: (l) => l.hours },
  { key: "amount", header: "Amount", numeric: true, render: (l) => l.amount },
];

export function TableNumbers() {
  return <Table label="Invoice lines" columns={COLUMNS} rows={LINES} rowKey={(l) => l.item} foot={TOTAL} />;
}
