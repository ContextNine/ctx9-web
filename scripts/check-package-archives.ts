import { execFile } from "node:child_process";
import { mkdtemp, readdir, readFile, rm, stat } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { promisify } from "node:util";

const execute = promisify(execFile);
const root = new URL("../", import.meta.url);
const rootPath = decodeURIComponent(root.pathname);
const scratch = await mkdtemp(join(tmpdir(), "ctx9-package-check-"));

async function walk(directory: string): Promise<string[]> {
  const files: string[] = [];
  for (const entry of await readdir(directory)) {
    const path = join(directory, entry);
    if ((await stat(path)).isDirectory()) files.push(...(await walk(path)));
    else files.push(path);
  }
  return files;
}

try {
  for (const name of [
    "@ctx9/ui",
    "@ctx9/web-auth",
    "@ctx9/identity",
  ] as const) {
    await execute(
      "pnpm",
      ["--filter", name, "pack", "--pack-destination", scratch],
      { cwd: rootPath },
    );
  }

  const archives = (await readdir(scratch)).filter((name) =>
    name.endsWith(".tgz"),
  );
  if (archives.length !== 3) throw new Error("package-archive-count-invalid");

  for (const archive of archives) {
    const archivePath = join(scratch, archive);
    const { stdout } = await execute("tar", ["-tzf", archivePath]);
    const entries = stdout.trim().split("\n");
    for (const forbidden of ["node_modules", ".env", "/src/"]) {
      if (entries.some((entry) => entry.includes(forbidden)))
        throw new Error(
          `package-archive-entry-forbidden:${archive}:${forbidden}`,
        );
    }
    if (entries.some((entry) => entry.includes(".test.")))
      throw new Error(`package-test-entry-forbidden:${archive}`);
    if (entries.some((entry) => entry.includes("dist/fonts/fonts/")))
      throw new Error(`package-font-nesting-invalid:${archive}`);
    if (!entries.includes("package/package.json"))
      throw new Error(`package-manifest-missing:${archive}`);
    for (const expected of ["package/LICENSE", "package/NOTICE"]) {
      if (!entries.includes(expected))
        throw new Error(`package-license-entry-missing:${archive}:${expected}`);
    }

    const extraction = join(scratch, archive.replace(/\.tgz$/u, ""));
    await execute("mkdir", ["-p", extraction]);
    await execute("tar", ["-xzf", archivePath, "-C", extraction]);
    for (const file of await walk(extraction)) {
      const bytes = await readFile(file);
      const sample = bytes.toString("utf8");
      for (const sentinel of [
        "BEGIN PRIVATE KEY",
        "CTX9-RECOVERY-",
        "DATABASE_URL=",
        "GITLAB_MANAGED_TOKEN",
      ]) {
        if (sample.includes(sentinel))
          throw new Error(`package-secret-sentinel:${archive}:${sentinel}`);
      }
    }

    if (archive.includes("ctx9-ui")) {
      for (const expected of [
        "package/dist/styles.css",
        "package/dist/fonts/geist-sans-variable.woff2",
        "package/dist/fonts/inter-normal-variable.ttf",
        "package/dist/fonts/jetbrains-mono-latin-variable.woff2",
        "package/dist/fonts/licenses/geist-ofl.txt",
        "package/dist/fonts/licenses/inter-ofl.txt",
        "package/dist/fonts/licenses/jetbrains-mono-ofl.txt",
        "package/THIRD_PARTY_NOTICES.md",
      ]) {
        if (!entries.includes(expected))
          throw new Error(`ui-package-entry-missing:${expected}`);
      }
    } else if (archive.includes("ctx9-web-auth")) {
      for (const expected of [
        "package/dist/adapters/express.js",
        "package/dist/adapters/node.js",
        "package/dist/adapters/tanstack-start.js",
      ]) {
        if (!entries.includes(expected))
          throw new Error(`web-auth-package-entry-missing:${expected}`);
      }
    }
  }
} finally {
  await rm(scratch, { recursive: true });
}
