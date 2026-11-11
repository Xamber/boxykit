"use client";

// Which code the page shows: the React source, or the CSS files and the HTML it renders.
import { createContext, use, useState } from "react";
import type { ReactNode } from "react";

export type Mode = "react" | "css";

type ModeState = { mode: Mode; setMode: (mode: Mode) => void };

const ModeContext = createContext<ModeState | null>(null);

/** The only place that knows how the mode is kept; the rest read it with useMode. */
export function ModeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<Mode>("react");

  return <ModeContext value={{ mode, setMode }}>{children}</ModeContext>;
}

export function useMode(): ModeState {
  const state = use(ModeContext);

  if (!state) throw new Error("useMode needs a ModeProvider above it.");

  return state;
}
