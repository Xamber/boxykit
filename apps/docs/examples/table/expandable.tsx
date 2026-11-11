"use client";

import { Table } from "boxykit/react";
import type { Column } from "boxykit/react";
import { useState } from "react";

type Task = { id: string; name: string; owner: string; details: string };

const TASKS: Task[] = [
  { id: "TSK-0410", name: "Fix the login form", owner: "Mia", details: "Safari drops the password on submit." },
  { id: "TSK-0411", name: "Export to CSV", owner: "Leo", details: "One file per project, UTF-8 with a header row." },
];

const COLUMNS: Column<Task>[] = [
  { key: "name", header: "Task", render: (t) => t.name },
  { key: "owner", header: "Owner", render: (t) => t.owner },
];

export function TableExpandable() {
  const [open, setOpen] = useState<string | null>("TSK-0410");

  return (
    <Table
      label="Tasks with details"
      columns={COLUMNS}
      rows={TASKS}
      rowKey={(t) => t.id}
      onRowClick={(t) => {
        setOpen(open === t.id ? null : t.id);
      }}
      expanded={(t) => (open === t.id ? t.details : null)}
    />
  );
}
