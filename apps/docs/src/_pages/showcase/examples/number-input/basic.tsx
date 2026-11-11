"use client";

import { NumberInput } from "boxykit/react";
import { useState } from "react";

export function NumberInputBasic() {
  const [guests, setGuests] = useState(2);

  return <NumberInput aria-label="Guests" min={1} max={12} value={guests} onChange={setGuests} />;
}
