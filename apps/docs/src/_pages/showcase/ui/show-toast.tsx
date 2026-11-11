"use client";

import { Button } from "boxykit/react";
import { useEffect, useState } from "react";
import type { MouseEvent, ReactNode } from "react";

// How long a notice stays in the corner.
const NOTICE_MS = 3000;

/**
 * Show toast: puts the example (its Toasts) on the page, in the corner. A notice goes after 3 seconds;
 * one that waits goes when one of its buttons is pressed.
 */
export function ShowToast({ wait = false, children }: { wait?: boolean; children: ReactNode }) {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (!shown || wait) return;

    const timer = setTimeout(() => {
      setShown(false);
    }, NOTICE_MS);

    return () => {
      clearTimeout(timer);
    };
  }, [shown, wait]);

  // A press on one of the toast's buttons answers it.
  function onClick(event: MouseEvent<HTMLDivElement>) {
    if (event.target instanceof Element && event.target.closest("button")) setShown(false);
  }

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
      {shown && (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions -- hears its buttons' clicks, which Enter and Space fire too
        <div onClick={onClick}>{children}</div>
      )}
    </>
  );
}
