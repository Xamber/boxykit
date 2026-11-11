"use client";

import { Button } from "boxykit/react";
import { useEffect, useState } from "react";

// How long "Copied" stays before the label comes back.
const DONE_MS = 2000;

type State = "idle" | "copied" | "failed";

const LABELS: Record<State, string> = { idle: "Copy CSS", copied: "Copied", failed: "Couldn’t copy" };

async function fetchText(url: string): Promise<string> {
  const response = await fetch(url);

  if (!response.ok) throw new Error(`${url}: ${String(response.status)}`);

  return response.text();
}

/**
 * Puts the CSS file on the clipboard. The file is fetched on click, not inlined in the page; the clipboard gets
 * the promise of it, since Safari only allows a write while the click is still being handled.
 */
async function copyFile(url: string): Promise<void> {
  const text = fetchText(url);

  if ("ClipboardItem" in window) {
    const blob = text.then((t) => new Blob([t], { type: "text/plain" }));

    await navigator.clipboard.write([new ClipboardItem({ "text/plain": blob })]);

    return;
  }

  await navigator.clipboard.writeText(await text);
}

export function CopyCssButton({ url }: { url: string }) {
  const [state, setState] = useState<State>("idle");

  useEffect(() => {
    if (state === "idle") return;

    const timer = setTimeout(() => {
      setState("idle");
    }, DONE_MS);

    return () => {
      clearTimeout(timer);
    };
  }, [state]);

  return (
    <Button
      look="outline"
      size="small"
      onClick={() => {
        copyFile(url).then(
          () => {
            setState("copied");
          },
          () => {
            setState("failed");
          },
        );
      }}
    >
      <span aria-live="polite">{LABELS[state]}</span>
    </Button>
  );
}
