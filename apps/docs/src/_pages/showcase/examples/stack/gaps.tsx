import { Caption, Mono, Stack } from "boxykit/react";

// The steps of the spacing scale: 2 inside a pair, 3 and 6 around it, 8 between the parts of a panel.
export function StackGaps() {
  return (
    <Stack gap={8}>
      <Stack gap={2}>
        <Caption>Gap 2</Caption>
        <Mono>TSK-0410</Mono>
        <Mono>TSK-0411</Mono>
      </Stack>
      <Stack gap={3}>
        <Caption>Gap 3</Caption>
        <Mono>TSK-0412</Mono>
        <Mono>TSK-0413</Mono>
      </Stack>
      <Stack gap={6}>
        <Caption>Gap 6</Caption>
        <Mono>TSK-0414</Mono>
        <Mono>TSK-0415</Mono>
      </Stack>
    </Stack>
  );
}
