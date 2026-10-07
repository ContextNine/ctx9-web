import { existsSync, readFileSync } from "node:fs";
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

/** Next uses local source only in development. Builds always use installed exports. */
export function getLocalUiConfig(appDirectory = process.cwd()) {
  if (process.env.NODE_ENV !== "development") return undefined;
  const packageDirectory = findLocalUi(appDirectory);
  if (!packageDirectory) return undefined;
  const source = join(packageDirectory, "src/index.ts");
  const stylesheet = join(resolve(appDirectory), ".ctx9-ui/styles.css");
  let root = resolve(appDirectory);
  while (relative(root, packageDirectory).startsWith(".."))
    root = dirname(root);
  return {
    packageDirectory,
    stylesheet,
    turbopack: {
      root,
      resolveAlias: {
        "@ctx9/ui": source,
        "@ctx9/ui/styles.css": stylesheet,
      },
    },
    webpackAliases: {
      "@ctx9/ui$": source,
      "@ctx9/ui/styles.css$": stylesheet,
    },
  };
}
