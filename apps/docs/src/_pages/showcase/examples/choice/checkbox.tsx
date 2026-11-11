"use client";

import { Checkbox, ChoiceList } from "boxykit/react";
import { useState } from "react";

const STEPS = ["Design", "Build", "Test", "Ship"];

export function ChoiceCheckbox() {
  const [done, setDone] = useState(["Design", "Build"]);
  const all = done.length === STEPS.length;

  return (
    <ChoiceList legend="Checklist">
      <Checkbox
        label="All of them"
        checked={all}
        indeterminate={done.length > 0 && !all}
        onChange={() => {
          setDone(all ? [] : STEPS);
        }}
      />
      {STEPS.map((step) => (
        <Checkbox
          key={step}
          label={step}
          checked={done.includes(step)}
          onChange={(event) => {
            const { checked } = event.target;

            setDone((current) => (checked ? [...current, step] : current.filter((s) => s !== step)));
          }}
        />
      ))}
    </ChoiceList>
  );
}
