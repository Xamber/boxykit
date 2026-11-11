import { Fragment } from "react";
import type { Key, KeyboardEvent, MouseEvent, ReactElement, ReactNode } from "react";
import { classNames } from "./class-names.js";

export type Column<T> = {
  /** Also the cell's data-column, so an app styles a column with `[data-column="name"]`. */
  key: string;
  header: ReactNode;
  render: (row: T) => ReactNode;
};

/**
 * Rows of cells under a head row. `onRowClick` makes rows work like buttons (click, Enter, Space);
 * `expanded` returns the content of a full-width row under a row, or null while it's closed.
 */
export function Table<T>({
  className,
  label,
  columns,
  rows,
  rowKey,
  rowClassName,
  onRowClick,
  expanded,
}: {
  className?: string;
  /** Names the table for screen readers. */
  label?: string;
  columns: Column<T>[];
  rows: T[];
  rowKey: (row: T, index: number) => Key;
  rowClassName?: (row: T, index: number) => string;
  onRowClick?: (row: T, index: number) => void;
  expanded?: (row: T, index: number) => ReactNode;
}): ReactElement {
  return (
    <table className={classNames("boxy-table", className)} aria-label={label}>
      <thead className="boxy-table-head">
        <tr className="boxy-table-row">
          {columns.map((c) => (
            <th key={c.key} className="boxy-table-cell" data-column={c.key}>
              {c.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="boxy-table-body">
        {rows.map((row, index) => (
          <RowGroup
            key={rowKey(row, index)}
            columns={columns}
            row={row}
            className={rowClassName?.(row, index)}
            onClick={onRowClick && (() => {
              onRowClick(row, index);
            })}
            expandable={expanded !== undefined}
            content={expanded?.(row, index) ?? null}
          />
        ))}
      </tbody>
    </table>
  );
}

/** A row and, when it's open, its detail row. A fragment: <tbody> can hold only rows. */
function RowGroup<T>({
  columns,
  row,
  className,
  onClick,
  expandable,
  content,
}: {
  columns: Column<T>[];
  row: T;
  className: string | undefined;
  onClick: (() => void) | undefined;
  expandable: boolean;
  content: ReactNode;
}) {
  const isExpanded = content !== null;

  // Only rows that can open report whether they're open. data-state, not aria-expanded: a plain table row can't take it.
  let state: "open" | "closed" | undefined;

  if (expandable) state = isExpanded ? "open" : "closed";

  return (
    <Fragment>
      <DataRow columns={columns} row={row} className={className} onClick={onClick} state={state} />
      {isExpanded && (
        <tr className="boxy-table-row boxy-table-row-detail">
          <td className="boxy-table-cell" colSpan={columns.length}>
            {content}
          </td>
        </tr>
      )}
    </Fragment>
  );
}

const CONTROLS = "a, button, input, select, textarea, label";

function DataRow<T>({
  columns,
  row,
  className,
  onClick,
  state,
}: {
  columns: Column<T>[];
  row: T;
  className: string | undefined;
  onClick: (() => void) | undefined;
  state: "open" | "closed" | undefined;
}) {
  const cells = columns.map((c) => (
    <td key={c.key} className="boxy-table-cell" data-column={c.key}>
      {c.render(row)}
    </td>
  ));

  if (!onClick) {
    return (
      <tr className={classNames("boxy-table-row", className)} data-state={state}>
        {cells}
      </tr>
    );
  }

  const click = onClick;

  function onRowClick(e: MouseEvent<HTMLTableRowElement>) {
    // Clicks on a control inside the row are the control's, so the row doesn't open too.
    const control = e.target instanceof Element ? e.target.closest(CONTROLS) : null;

    if (control && e.currentTarget.contains(control)) return;

    click();
  }

  function onKeyDown(e: KeyboardEvent<HTMLTableRowElement>) {
    // Keys pressed in a control inside the row are the control's.
    if (e.target !== e.currentTarget) return;
    if (e.key !== "Enter" && e.key !== " ") return;

    e.preventDefault();
    click();
  }

  return (
    <tr
      className={classNames("boxy-table-row", "boxy-table-row-clickable", className)}
      tabIndex={0}
      data-state={state}
      onClick={onRowClick}
      onKeyDown={onKeyDown}
    >
      {cells}
    </tr>
  );
}
