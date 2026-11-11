"use client";

import type { ReactNode } from "react";
import { useMode } from "../model/mode";
import type { Mode } from "../model/mode";

/** Shows its children only in the given mode, e.g. the CSS imports in CSS mode. */
export function ModeOnly({ mode, children }: { mode: Mode; children: ReactNode }) {
  if (useMode().mode !== mode) return null;

  return children;
}
