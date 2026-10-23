import { readFileSync } from "node:fs";
import { describe, expect, test } from "vitest";

describe("dependency security updates", () => {
  test("vite is locked to a fixed version (GHSA-587h-7wmj-h5pm)", () => {
    const lock = JSON.parse(
      readFileSync(new URL("../package-lock.json", import.meta.url), "utf8"),
    ) as { packages?: Record<string, { version?: string }> };
    const viteVersion = lock.packages?.["node_modules/vite"]?.version;
    expect(viteVersion).toBeDefined();
    const [major, minor, patch] = (viteVersion ?? "").split(".").map(Number);
    // GHSA-587h-7wmj-h5pm is fixed in vite 8.3.3.
    expect(major).toBeGreaterThanOrEqual(8);
    if (major === 8) {
      expect(minor).toBeGreaterThanOrEqual(3);
      if (minor === 3) {
        expect(patch).toBeGreaterThanOrEqual(3);
      }
    }
  });
});
