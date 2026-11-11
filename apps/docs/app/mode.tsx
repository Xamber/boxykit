"use client";

// Which code the page shows, React or CSS (the HTML), and the controls in the side column.
import { Button } from "boxykit/react";
import { createContext, use, useEffect, useRef, useState, useSyncExternalStore } from "react";
import type { ReactNode } from "react";

export type Mode = "react" | "css";

type Theme = "light" | "dark";

const ModeContext = createContext<{ mode: Mode; setMode: (mode: Mode) => void }>({
  mode: "react",
  setMode: () => undefined,
});

export function ModeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<Mode>("react");

  return <ModeContext value={{ mode, setMode }}>{children}</ModeContext>;
}

/** Shows its children only in the given mode, e.g. the CSS imports in CSS mode. */
export function ModeOnly({ mode, children }: { mode: Mode; children: ReactNode }) {
  if (use(ModeContext).mode !== mode) return null;

  return children;
}

/**
 * An example's code, once asked for: its React source, or the CSS imports and the HTML it renders.
 * `extra` goes next to Show code, e.g. Show toast.
 */
export function CodePanel({
  react,
  html,
  imports,
  extra,
}: {
  react: string;
  html: string;
  imports?: string;
  extra?: ReactNode;
}) {
  const { mode } = use(ModeContext);
  const [shown, setShown] = useState(false);
  let code = react;

  if (mode === "css") code = html;
  if (mode === "css" && imports) code = `${imports}\n\n${html}`;

  return (
    <>
      <div className="docs-actions">
        {!shown && (
          <Button
            look="outline"
            size="small"
            onClick={() => {
              setShown(true);
            }}
          >
            Show code
          </Button>
        )}
        {extra}
      </div>
      {shown && <pre className="docs-code">{code}</pre>}
    </>
  );
}

// How long a notice stays in the corner.
const NOTICE_MS = 3000;

/**
 * Show toast: puts the example (its Toasts) on the page, in the corner. A notice goes after 3 seconds;
 * one that waits goes when one of its buttons is pressed.
 */
export function ShowToast({ wait = false, children }: { wait?: boolean; children: ReactNode }) {
  const [shown, setShown] = useState(false);
  const live = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!shown || wait) return;

    const timer = setTimeout(() => {
      setShown(false);
    }, NOTICE_MS);

    return () => {
      clearTimeout(timer);
    };
  }, [shown, wait]);

  useEffect(() => {
    const element = live.current;

    if (!shown || !element) return;

    function hide(event: MouseEvent) {
      if (event.target instanceof Element && event.target.closest("button")) setShown(false);
    }

    element.addEventListener("click", hide);

    return () => {
      element.removeEventListener("click", hide);
    };
  }, [shown]);

  return (
    <>
      <Button
        look="outline"
        size="small"
        onClick={() => {
          setShown(true);
        }}
      >
        Show toast
      </Button>
      {shown && <div ref={live}>{children}</div>}
    </>
  );
}

/** Two or more small buttons, the chosen one the accent: the theme and the mode. */
function Choice<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { value: T; label: string }[];
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

const DARK_QUERY = "(prefers-color-scheme: dark)";

function subscribeToSystem(onChange: () => void): () => void {
  const query = window.matchMedia(DARK_QUERY);

  query.addEventListener("change", onChange);

  return () => {
    query.removeEventListener("change", onChange);
  };
}

function systemTheme(): Theme {
  if (window.matchMedia(DARK_QUERY).matches) return "dark";

  return "light";
}

/** Light or dark (the system's until one is picked), and React or CSS code. */
export function Controls() {
  const { mode, setMode } = use(ModeContext);
  const system = useSyncExternalStore(subscribeToSystem, systemTheme, () => "light" as const);
  const [picked, setPicked] = useState<Theme | null>(null);

  function pickTheme(theme: Theme) {
    setPicked(theme);
    document.documentElement.setAttribute("data-boxy-theme", theme);
  }

  return (
    <div className="docs-controls">
      <Choice
        label="Theme"
        options={[
          { value: "light", label: "Light" },
          { value: "dark", label: "Dark" },
        ]}
        value={picked ?? system}
        onChange={pickTheme}
      />
      <Choice
        label="Code"
        options={[
          { value: "react", label: "React" },
          { value: "css", label: "CSS" },
        ]}
        value={mode}
        onChange={setMode}
      />
    </div>
  );
}
