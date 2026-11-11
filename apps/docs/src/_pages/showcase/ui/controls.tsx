"use client";

// The switches at the bottom of the side column: the theme and the code.
import { Button } from "boxykit/react";
import { useMode } from "../model/mode";
import type { Mode } from "../model/mode";
import { useTheme } from "../model/theme";
import type { Theme } from "../model/theme";

type Option<T> = { value: T; label: string };

const THEMES: Option<Theme>[] = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
];

const MODES: Option<Mode>[] = [
  { value: "react", label: "React" },
  { value: "css", label: "CSS" },
];

/** Two or more small buttons, the chosen one the accent. */
function Choice<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: Option<T>[];
  value: T;
  onChange: (value: T) => void;
}) {
  return (
    <div className="docs-choice" role="group" aria-label={label}>
      {options.map((o) => (
        <Button
          key={o.value}
          size="small"
          look={o.value === value ? "accent" : "outline"}
          aria-pressed={o.value === value}
          onClick={() => {
            onChange(o.value);
          }}
        >
          {o.label}
        </Button>
      ))}
    </div>
  );
}

/** Light or dark (the system's until one is picked), and React or CSS code. */
export function Controls() {
  const { mode, setMode } = useMode();
  const { theme, pickTheme } = useTheme();

  return (
    <div className="docs-controls">
      <Choice label="Theme" options={THEMES} value={theme} onChange={pickTheme} />
      <Choice label="Code" options={MODES} value={mode} onChange={setMode} />
    </div>
  );
}
