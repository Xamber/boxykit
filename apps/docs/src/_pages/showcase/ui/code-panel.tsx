"use client";

import { Button } from "boxykit/react";
import { useState } from "react";
import type { ReactNode } from "react";
import { useMode } from "../model/mode";

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
  const { mode } = useMode();
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
