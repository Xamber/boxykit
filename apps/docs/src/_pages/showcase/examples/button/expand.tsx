"use client";

import { Button } from "boxykit/react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

export function ButtonExpand() {
  const [open, setOpen] = useState(false);
  let label = "Expand details";
  let Chevron = ChevronDown;

  if (open) {
    label = "Collapse details";
    Chevron = ChevronUp;
  }

  return (
    <Button
      look="outline"
      aria-expanded={open}
      onClick={() => {
        setOpen(!open);
      }}
    >
      {label} <Chevron className="boxy-icon" />
    </Button>
  );
}
