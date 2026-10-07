import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join, relative, resolve } from "node:path";

/** Find the normal Code/ctx9/web checkout, including from nested workspaces. */
export function findLocalUi(appDirectory = process.cwd()) {
  for (
    let directory = resolve(appDirectory);
    ;
    directory = dirname(directory)
  ) {
    for (const candidate of [
      join(directory, "ctx9/web/packages/ui"),
      join(directory, "web/packages/ui"),
    ]) {
      const manifest = join(candidate, "package.json");
      if (!existsSync(manifest) || !existsSync(join(candidate, "src/index.ts")))
        continue;
      const pkg: unknown = JSON.parse(readFileSync(manifest, "utf8"));
      if (
        typeof pkg === "object" &&
        pkg !== null &&
        "name" in pkg &&
        pkg.name === "@ctx9/ui"
      )
        return candidate;
    }
    if (dirname(directory) === directory) return undefined;
  }
}

/** Next uses the watched local build only in dev. Production uses installed exports. */
export function getLocalUiConfig(appDirectory = process.cwd()) {
  if (process.env.NODE_ENV !== "development") return undefined;
  const packageDirectory = findLocalUi(appDirectory);
  if (!packageDirectory) return undefined;
  const appId = createHash("sha256")
    .update(resolve(appDirectory))
    .digest("hex")
    .slice(0, 12);
  const compiledDirectory = join(packageDirectory, ".ctx9-ui-dev", appId);
  const source = join(compiledDirectory, "index.js");
  const stylesheet = join(resolve(appDirectory), ".ctx9-ui/styles.css");
  // ResponsiveContainer and consumer chart children must share Recharts context.
  const recharts = dirname(
    createRequire(join(packageDirectory, "package.json")).resolve(
      "recharts/package.json",
    ),
  );
  let root = resolve(appDirectory);
  while (relative(root, packageDirectory).startsWith(".."))
    root = dirname(root);
  return {
    packageDirectory,
    compiledDirectory,
    stylesheet,
    turbopack: {
      root,
      resolveAlias: {
        "@ctx9/ui": `./${relative(resolve(appDirectory), source).replaceAll("\\", "/")}`,
        "@ctx9/ui/styles.css": "./.ctx9-ui/styles.css",
        recharts: `./${relative(resolve(appDirectory), recharts).replaceAll("\\", "/")}`,
      },
    },
    webpackAliases: {
      "@ctx9/ui$": source,
      "@ctx9/ui/styles.css$": stylesheet,
      recharts$: recharts,
    },
  };
}
