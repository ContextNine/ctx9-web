import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const packages = [
  { directory: "packages/ui", name: "@ctx9/ui" },
  { directory: "packages/web-auth", name: "@ctx9/web-auth" },
] as const;
const versions = packages.map(
  ({ directory }) =>
    (
      JSON.parse(readFileSync(join(directory, "package.json"), "utf8")) as {
        version: string;
      }
    ).version,
);
const version = versions[0];
if (!version || new Set(versions).size !== 1)
  throw new Error("package versions must match");

const sourceCommit =
  process.env.CI_COMMIT_SHA ??
  execFileSync("git", ["rev-parse", "HEAD"], { encoding: "utf8" }).trim();
if (!/^[0-9a-f]{40}$/.test(sourceCommit))
  throw new Error("source commit must be a full SHA");

const outputDirectory = process.env.RELEASE_OUTPUT_DIR ?? "dist-release";
mkdirSync(outputDirectory, { recursive: true });
for (const { name } of packages) {
  execFileSync(
    "pnpm",
    ["--filter", name, "pack", "--pack-destination", outputDirectory],
    { stdio: "inherit" },
  );
}

const artifacts = readdirSync(outputDirectory)
  .filter((path) => path.endsWith(".tgz"))
  .sort()
  .map((path) => ({
    path,
    sha256: createHash("sha256")
      .update(readFileSync(join(outputDirectory, path)))
      .digest("hex"),
  }));
if (artifacts.length !== packages.length)
  throw new Error("expected one archive per package");

writeFileSync(
  join(outputDirectory, `web-${version}.sha256`),
  `${artifacts.map(({ path, sha256 }) => `${sha256}  ${path}`).join("\n")}\n`,
);
writeFileSync(
  join(outputDirectory, `web-${version}.release.json`),
  `${JSON.stringify({ schema_version: 1, repository: "ContextNine/ctx9-web", version, source_commit: sourceCommit, artifacts }, null, 2)}\n`,
);
