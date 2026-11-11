import { Table } from "boxykit/react";
import type { Column } from "boxykit/react";

type Task = { id: string; name: string; owner: string; status: string };

const TASKS: Task[] = [
  { id: "TSK-0410", name: "Fix the login form", owner: "Mia", status: "In review" },
  { id: "TSK-0411", name: "Export to CSV", owner: "Leo", status: "In progress" },
  { id: "TSK-0412", name: "Dark mode", owner: "Ana", status: "Done" },
];

const COLUMNS: Column<Task>[] = [
  { key: "name", header: "Task", render: (t) => t.name },
  { key: "owner", header: "Owner", render: (t) => t.owner },
  { key: "status", header: "Status", render: (t) => t.status },
];

export function TableBasic() {
  return <Table label="Tasks" columns={COLUMNS} rows={TASKS} rowKey={(t) => t.id} />;
}
