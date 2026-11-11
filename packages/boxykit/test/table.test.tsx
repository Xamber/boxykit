import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Table } from "../src/react/index.js";
import type { Column } from "../src/react/index.js";

type Row = { id: string };

const COLUMNS: Column<Row>[] = [
  { key: "id", header: "ID", render: (r) => r.id },
  { key: "action", header: "", render: () => <button type="button">Delete</button> },
];

const ROWS: Row[] = [{ id: "one" }, { id: "two" }];

describe("Table", () => {
  it("puts the column key on each cell", () => {
    render(<Table columns={COLUMNS} rows={ROWS} rowKey={(r) => r.id} />);

    expect(screen.getByText("one").getAttribute("data-column")).toBe("id");
  });

  it("clicks rows by mouse, Enter and Space, but not through controls inside them", () => {
    const onRowClick = vi.fn();

    render(<Table columns={COLUMNS} rows={ROWS} rowKey={(r) => r.id} onRowClick={onRowClick} />);
    const row = screen.getByText("one").closest("tr");

    if (!row) throw new Error("no row");

    fireEvent.click(row);
    fireEvent.keyDown(row, { key: "Enter" });
    fireEvent.keyDown(row, { key: " " });
    fireEvent.click(screen.getAllByRole("button", { name: "Delete" })[0] ?? row);

    expect(onRowClick).toHaveBeenCalledTimes(3);
    expect(onRowClick).toHaveBeenCalledWith(ROWS[0], 0);
  });

  it("shows the detail row of an expanded row and marks it open", () => {
    render(
      <Table
        columns={COLUMNS}
        rows={ROWS}
        rowKey={(r) => r.id}
        onRowClick={() => undefined}
        expanded={(r) => (r.id === "one" ? "Details of one" : null)}
      />,
    );

    expect(screen.getByText("Details of one")).toBeDefined();
    expect(screen.getByText("one").closest("tr")?.getAttribute("data-state")).toBe("open");
    expect(screen.getByText("two").closest("tr")?.getAttribute("data-state")).toBe("closed");
  });
});
