"use client";

import { useRef, useState } from "react";
import type { ComponentProps, CSSProperties, FocusEvent, KeyboardEvent, PointerEvent, ReactElement } from "react";
import { classNames } from "./class-names.js";

// How far a press moves before it is a drag rather than a click into the field.
const DRAG_THRESHOLD = 3;
// With no min and max to spread over the field, a step for every few pixels.
const PIXELS_PER_STEP = 4;

function decimals(n: number): number {
  const text = String(n);
  const dot = text.indexOf(".");

  if (dot === -1) return 0;

  return text.length - dot - 1;
}

type Drag = { x: number; from: number; perPixel: number; moved: boolean };

/**
 * A number between − and +. Drag the number sideways to run it: across the field's width from `min` to `max`,
 * in `step`s. Click it to type; arrow keys step. Controlled with `value`, or give `defaultValue`.
 * `filled` shades the field up to where the value sits between `min` and `max`, so a drag shows how far it is.
 * Native input props (`name`, `aria-label`, `ref`…) reach the input; `className` the strip.
 */
export function NumberInput({
  className,
  value,
  defaultValue,
  onChange,
  min,
  max,
  step = 1,
  disabled = false,
  filled = false,
  decreaseLabel = "Decrease",
  increaseLabel = "Increase",
  onBlur,
  onKeyDown,
  ref,
  ...props
}: {
  className?: string;
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  filled?: boolean;
  decreaseLabel?: string;
  increaseLabel?: string;
} & Omit<ComponentProps<"input">, "type" | "value" | "defaultValue" | "onChange" | "min" | "max" | "step" | "className">): ReactElement {
  const [own, setOwn] = useState(defaultValue ?? min ?? 0);
  // What is typed, while it is typed: "" and "-" aren't numbers yet.
  const [draft, setDraft] = useState<string | null>(null);
  const input = useRef<HTMLInputElement | null>(null);
  const drag = useRef<Drag | null>(null);
  const current = value ?? own;

  /** Onto the grid of steps from min, inside min and max, without float dust (0.30000000000000004). */
  function fit(n: number): number {
    const base = min ?? 0;
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

  function handlePointerDown(event: PointerEvent<HTMLDivElement>): void {
    const field = input.current;

    // Once the field has focus, a press places the caret and selects text as usual.
    if (disabled || !field || event.target !== field || event.button !== 0 || document.activeElement === field) return;

    // Not focused yet: hold off the focus and the selection until it's clear this isn't a drag.
    event.preventDefault();

    const width = event.currentTarget.getBoundingClientRect().width || 1;
    let perPixel = step / PIXELS_PER_STEP;

    if (min !== undefined && max !== undefined) perPixel = (max - min) / width;

    drag.current = { x: event.clientX, from: current, perPixel, moved: false };
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>): void {
    const active = drag.current;

    if (!active) return;

    const dx = event.clientX - active.x;

    if (!active.moved && Math.abs(dx) < DRAG_THRESHOLD) return;

    active.moved = true;
    commit(active.from + dx * active.perPixel);
  }

  function handlePointerUp(): void {
    const active = drag.current;

    drag.current = null;

    // A press that didn't move: the click into the field it held back, with the number selected to type over.
    if (active && !active.moved) {
      input.current?.focus();
      input.current?.select();
    }
  }

  function handleBlur(event: FocusEvent<HTMLInputElement>): void {
    commitDraft();
    onBlur?.(event);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>): void {
    if (event.key === "Enter") commitDraft();
    onKeyDown?.(event);
  }

  function setRefs(element: HTMLInputElement | null): void {
    input.current = element;

    if (typeof ref === "function") {
      ref(element);
    } else if (ref) {
      ref.current = element;
    }
  }

  let fill: CSSProperties | undefined;

  if (filled && min !== undefined && max !== undefined && max > min) {
    const share = Math.min(1, Math.max(0, (current - min) / (max - min)));

    fill = { "--boxy-number-input-fill": `${String(Math.round(share * 1000) / 10)}%` } as CSSProperties;
  }

  return (
    <div
      className={classNames("boxy-number-input", filled && "boxy-number-input-filled", className)}
      // eslint-disable-next-line react/forbid-dom-props -- a custom property is how a runtime value reaches the CSS
      style={fill}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={() => {
        drag.current = null;
      }}
    >
      <button
        className="boxy-number-input-step"
        type="button"
        // The arrow keys step from the field; the buttons are for the pointer.
        tabIndex={-1}
        aria-label={decreaseLabel}
        disabled={disabled || (min !== undefined && current <= min)}
        onClick={() => {
          commit(current - step);
        }}
      >
        −
      </button>
      <input
        ref={setRefs}
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
      <button
        className="boxy-number-input-step"
        type="button"
        tabIndex={-1}
        aria-label={increaseLabel}
        disabled={disabled || (max !== undefined && current >= max)}
        onClick={() => {
          commit(current + step);
        }}
      >
        +
      </button>
    </div>
  );
}
