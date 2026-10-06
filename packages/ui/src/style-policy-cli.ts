#!/usr/bin/env node
import { readFile, readdir } from "node:fs/promises";
import { relative, resolve } from "node:path";
import { checkStyleSource, type StyleException } from "./style-policy.js";

function parseExceptions(value: unknown): StyleException[] {
  if (!Array.isArray(value)) throw new Error("Exceptions must be an array.");
  return value.map((entry: unknown) => {
    if (
      typeof entry !== "object" ||
      entry === null ||
      !("file" in entry) ||
      !("component" in entry) ||
      !("reason" in entry) ||
      !("explanation" in entry)
    )
      throw new Error("Invalid style exception.");
    const { file, component, reason, explanation } = entry;
    if (
      typeof file !== "string" ||
      typeof component !== "string" ||
      typeof explanation !== "string" ||
      explanation.trim().length === 0 ||
      ![
        "framework-adapter",
        "control-composition",
        "feature-geometry",
      ].includes(String(reason))
    )
      throw new Error("Invalid style exception fields.");
    if (
      reason !== "framework-adapter" &&
      reason !== "control-composition" &&
      reason !== "feature-geometry"
    )
      throw new Error("Invalid style exception reason.");
    return { file, component, reason, explanation };
  });
}

async function walk(directory: string): Promise<string[]> {
  const files: string[] = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (["node_modules", "dist", ".next", ".git"].includes(entry.name))
      continue;
    const path = resolve(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(path)));
    else if (/\.[cm]?[jt]sx?$/u.test(entry.name)) files.push(path);
  }
  return files;
}

const roots: string[] = [];
const packages: string[] = [];
let exceptions: StyleException[] = [];
const args = process.argv.slice(2);
for (let index = 0; index < args.length; index++) {
  const arg = args[index];
  if (arg === "--exceptions") {
    const path = args[++index];
    if (!path) throw new Error("--exceptions requires a JSON file.");
    exceptions = parseExceptions(
      JSON.parse(await readFile(path, "utf8")) as unknown,
    );
  } else if (arg === "--package") {
    const name = args[++index];
    if (!name || name.startsWith("--"))
      throw new Error("--package requires a component package name.");
    packages.push(name);
  } else if (arg?.startsWith("--")) throw new Error(`Unknown option: ${arg}`);
  else if (arg) roots.push(arg);
}
if (!roots.length)
  throw new Error(
    "Usage: ctx9-ui-style-check <source roots> [--package <name>] [--exceptions <file.json>]",
  );
const files = [
  ...new Set(
    (await Promise.all(roots.map((root) => walk(resolve(root))))).flat(),
  ),
];
const failures = (
  await Promise.all(
    files.map(async (file) =>
      checkStyleSource(
        relative(process.cwd(), file).replaceAll("\\", "/"),
        await readFile(file, "utf8"),
        { packages, exceptions },
      ),
    ),
  )
).flat();
for (const failure of failures)
  console.error(
    `${failure.file}:${String(failure.line)} ${failure.component}: ${failure.message}`,
  );
if (failures.length) process.exitCode = 1;
else console.log(`UI style policy passed for ${String(files.length)} files.`);
