import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { expect, test, vi } from "vitest";
import { findLocalUi, getLocalUiConfig } from "./dev.js";

test("consumer checkouts share live source in dev without changing production resolution", async () => {
  const code = await mkdtemp(join(tmpdir(), "ctx9-ui-dev-"));
  const ui = join(code, "ctx9/web/packages/ui");
  try {
    await mkdir(join(ui, "src"), { recursive: true });
    await writeFile(
      join(ui, "package.json"),
      JSON.stringify({ name: "@ctx9/ui" }),
    );
    await writeFile(join(ui, "src/index.ts"), "export {};\n");
    for (const path of [
      "impression/apps/next",
      "workspaces/impression/test/apps/next",
      "ctx9/testimonials/web",
      "ctx9/publisher/web",
      "ctx9/platform/apps/web",
      "ctx9/secret-bindings/apps/console",
    ]) {
      const app = join(code, path);
      expect(findLocalUi(app)).toBe(ui);
      vi.stubEnv("NODE_ENV", "development");
      const config = getLocalUiConfig(app);
      expect(config?.turbopack.root).toBe(
        path.startsWith("ctx9/") ? join(code, "ctx9") : code,
      );
      expect(config?.webpackAliases["@ctx9/ui$"]).toBe(
        join(ui, "dist/index.js"),
      );
      expect(config?.turbopack.resolveAlias["@ctx9/ui/styles.css"]).toBe(
        "./.ctx9-ui/styles.css",
      );
      vi.stubEnv("NODE_ENV", "production");
      expect(getLocalUiConfig(app)).toBeUndefined();
    }
    vi.stubEnv("NODE_ENV", "development");
    expect(getLocalUiConfig(dirname(code))).toBeUndefined();
  } finally {
    vi.unstubAllEnvs();
    await rm(code, { recursive: true, force: true });
  }
});
