// Light or dark: the system's until one is picked.
import { useState, useSyncExternalStore } from "react";

export type Theme = "light" | "dark";

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

// The static HTML is built without a system; the CSS follows it until hydration.
function serverTheme(): Theme {
  return "light";
}

export function useTheme(): { theme: Theme; pickTheme: (theme: Theme) => void } {
  const system = useSyncExternalStore(subscribeToSystem, systemTheme, serverTheme);
  const [picked, setPicked] = useState<Theme | null>(null);

  function pickTheme(theme: Theme) {
    setPicked(theme);
    document.documentElement.setAttribute("data-boxy-theme", theme);
  }

  return { theme: picked ?? system, pickTheme };
}
