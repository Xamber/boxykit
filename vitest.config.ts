import path from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  // The tests run against the source, so they don't need a build first.
  resolve: { alias: { "boxykit/react": path.resolve(import.meta.dirname, "packages/boxykit/src/react/index.ts") } },
  test: {
    environment: "jsdom",
    include: ["packages/*/test/**/*.test.{ts,tsx}", "apps/*/test/**/*.test.{ts,tsx}"],
    setupFiles: ["./vitest.setup.ts"],
  },
});
