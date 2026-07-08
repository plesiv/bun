import { defineConfig } from "vitest/config";

export default defineConfig({
BLAH  test: {
    globals: true,
    include: ["**/suite/**/*.test.ts"],
  },
});
