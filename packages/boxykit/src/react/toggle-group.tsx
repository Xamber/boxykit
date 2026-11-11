import type { ReactElement } from "react";
import { classNames } from "./class-names.js";

export type ToggleOption<T> = { value: T; label: string };

/** One strip of options where exactly one is on, like radio buttons. `label` names the group for screen readers. */
export function ToggleGroup<T extends string | number>({
  className,
  label,
  options,
  value,
  onChange,
}: {
  className?: string;
  label: string;
  options: ToggleOption<T>[];
  value: T;
  onChange: (value: T) => void;
}): ReactElement {
  return (
    <div className={classNames("boxy-toggle-group", className)} role="radiogroup" aria-label={label}>
      {options.map((o) => (
        <button
          key={String(o.value)}
          className="boxy-toggle-group-option"
          type="button"
          role="radio"
          aria-checked={o.value === value}
          onClick={() => {
            onChange(o.value);
          }}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
