"use client";

import { Button } from "boxykit/react";
import { useState } from "react";

export function ButtonExpand() {
  const [open, setOpen] = useState(false);
  let label = "Expand details ▾";

  if (open) label = "Collapse details ▴";

  return (
    <Button
      look="outline"
      aria-expanded={open}
      onClick={() => {
        setOpen(!open);
      }}
    >
      {label}
    </Button>
  );
}
