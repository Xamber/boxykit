import { Box, Caption, Stack } from "boxykit/react";

export function BoxBasic() {
  return (
    <div className="docs-row">
      <Box>
        <Stack gap={2}>
          <Caption>From</Caption>
          <p>Northwind Oy</p>
          <p>Helsinki</p>
        </Stack>
      </Box>
      <Box>
        <Stack gap={2}>
          <Caption>Bill to</Caption>
          <p>Mia Laine</p>
          <p>Tampere</p>
        </Stack>
      </Box>
    </div>
  );
}
