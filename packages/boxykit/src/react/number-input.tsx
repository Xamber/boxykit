"use client";

import { useState } from "react";
import type { ComponentProps, FocusEvent, KeyboardEvent, ReactElement } from "react";
import { classNames } from "./class-names.js";

function decimals(n: number): number {
  const text = String(n);
  const dot = text.indexOf(".");

  if (dot === -1) return 0;

  return text.length - dot - 1;
}

/**
 * A number field. With a range, a slider under it: a line with a small accent square to drag.
 * `min` and `max` bound it, and show at the ends of the line; `from` and `to` only set the line's ends,
 * so the slider runs over them but a typed number can go past. Every way in (typing, arrows, the slider)
 * keeps to `step`. Controlled with `value`, or give `defaultValue`.
 * Native input props (`name`, `aria-label`, `ref`…) reach the field; `className` the whole.
 */
export function NumberInput({
  className,
  value,
  defaultValue,
  onChange,
  min,
  max,
  from,
  to,
  step = 1,
  disabled = false,
  onBlur,
  onKeyDown,
  ...props
}: {
  className?: string;
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  /** The slider's start when there is no `min`: not a limit, not shown. */
  from?: number;
  /** The slider's end when there is no `max`: not a limit, not shown. */
  to?: number;
  step?: number;
} & Omit<ComponentProps<"input">, "type" | "value" | "defaultValue" | "onChange" | "min" | "max" | "step" | "className">): ReactElement {
  const start = min ?? from;
  const end = max ?? to;
  const [own, setOwn] = useState(defaultValue ?? start ?? 0);
  // What is typed, while it is typed: "" and "-" aren't numbers yet.
  const [draft, setDraft] = useState<string | null>(null);
  const current = value ?? own;

  /** Onto the grid of steps from the start, inside min and max, without float dust (0.30000000000000004). */
  function fit(n: number): number {
    const base = start ?? 0;
    let next = base + Math.round((n - base) / step) * step;

    if (min !== undefined) next = Math.max(min, next);
    if (max !== undefined) next = Math.min(max, next);

    return Number(next.toFixed(Math.max(decimals(step), decimals(base))));
  }

  function commit(n: number): void {
    const next = fit(n);

    if (next === current) return;

    if (value === undefined) setOwn(next);
    onChange?.(next);
  }

  function commitDraft(): void {
    if (draft === null) return;

    const typed = Number.parseFloat(draft);

    setDraft(null);
    if (Number.isFinite(typed)) commit(typed);
  }

  function handleBlur(event: FocusEvent<HTMLInputElement>): void {
    commitDraft();
    onBlur?.(event);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>): void {
    if (event.key === "Enter") commitDraft();
    onKeyDown?.(event);
  }

  const field = (
    <input
      className="boxy-number-input-field"
      type="number"
      value={draft ?? String(current)}
      min={min}
      max={max}
      step={step}
      disabled={disabled}
      onChange={(event) => {
        const typed = event.target.valueAsNumber;

        setDraft(event.target.value);
        // A whole valid number goes out as it's typed; the rest waits for Enter or leaving the field.
        if (Number.isFinite(typed) && fit(typed) === typed) commit(typed);
      }}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      {...props}
    />
  );

  if (start === undefined || end === undefined) {
    return <div className={classNames("boxy-number-input", className)}>{field}</div>;
  }

  const bounded = min !== undefined && max !== undefined;

  return (
    <div className={classNames("boxy-number-input", className)}>
      {field}
      <div className="boxy-number-input-range">
        {bounded && <span className="boxy-number-input-bound">{min}</span>}
        <input
          className="boxy-number-input-slider"
          type="range"
          min={start}
          max={end}
          step={step}
          value={Math.min(end, Math.max(start, current))}
          disabled={disabled}
          // The field is the control for the keyboard and screen readers; this is the same value for the pointer.
          tabIndex={-1}
          aria-hidden="true"
          onChange={(event) => {
            setDraft(null);
            commit(event.target.valueAsNumber);
          }}
        />
        {bounded && <span className="boxy-number-input-bound">{max}</span>}
      </div>
    </div>
  );
}
