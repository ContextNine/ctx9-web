#!/usr/bin/env node
import { spawn } from "node:child_process";
import { cp, mkdir } from "node:fs/promises";
import { createRequire } from "node:module";
import { dirname, join, resolve } from "node:path";
import { getLocalUiConfig } from "./dev.js";

const args = process.argv.slice(2);
if (args[0] === "--") args.shift();
const command = args.shift();
if (!command)
  throw new Error("Usage: ctx9-ui-dev -- next dev [directory] [flags]");
if (process.env.NODE_ENV === "production")
  throw new Error("ctx9-ui-dev is development-only");
process.env.NODE_ENV = "development";

const children = new Set<ReturnType<typeof spawn>>();
const shutdown = new AbortController();
function stop(code: number) {
  if (shutdown.signal.aborted) return;
  shutdown.abort();
  process.exitCode = code;
  for (const child of children) {
    if (!child.pid) continue;
    try {
      if (process.platform === "win32") child.kill("SIGTERM");
      else process.kill(-child.pid, "SIGTERM");
    } catch (error) {
      if (
        !(error instanceof Error && "code" in error && error.code === "ESRCH")
      )
        throw error;
    }
  }
}
process.on("SIGINT", () => {
  stop(130);
});
process.on("SIGTERM", () => {
  stop(143);
});

function start(executable: string, argv: string[], cwd = process.cwd()) {
  const child = spawn(executable, argv, {
    cwd,
    stdio: "inherit",
    detached: process.platform !== "win32",
  });
  children.add(child);
  child.once("error", (error) => {
    console.error(error.message);
    children.delete(child);
    stop(1);
  });
  child.once("exit", (code) => {
    children.delete(child);
    stop(code ?? 1);
  });
  return child;
}

const appDirectory =
  args[0] === "dev" && args[1] && !args[1].startsWith("-")
    ? resolve(args[1])
    : process.cwd();
const local = getLocalUiConfig(appDirectory);
if (local) {
  const outputDirectory = dirname(local.stylesheet);
  await mkdir(outputDirectory, { recursive: true });
  await cp(
    join(local.packageDirectory, "src/fonts"),
    join(outputDirectory, "fonts"),
    {
      recursive: true,
    },
  );
  const require = createRequire(join(local.packageDirectory, "package.json"));
  const tailwind = require.resolve("tailwindcss/lib/cli.js");
  const compilerArgs = [
    require.resolve("typescript/bin/tsc"),
    "-p",
    "tsconfig.build.json",
  ];
  const tailwindArgs = [
    tailwind,
    "-c",
    "tailwind.config.cjs",
    "-i",
    "src/styles.css",
    "-o",
    local.stylesheet,
    "--postcss",
    "../../postcss.config.js",
    "--no-autoprefixer",
  ];
  // Next 15 Turbopack needs emitted .js imports. Build before serving.
  for (const buildArgs of [compilerArgs, tailwindArgs]) {
    if (shutdown.signal.aborted) break;
    const initial = spawn(process.execPath, buildArgs, {
      cwd: local.packageDirectory,
      stdio: "inherit",
      detached: process.platform !== "win32",
    });
    children.add(initial);
    await new Promise<void>((complete, reject) => {
      initial.once("error", reject);
      initial.once("exit", (code) => {
        children.delete(initial);
        if (code === 0) complete();
        else reject(new Error("Local UI build failed"));
      });
    });
  }
  if (!shutdown.signal.aborted) {
    console.log(`Local @ctx9/ui source: ${local.packageDirectory}`);
    start(
      process.execPath,
      [...compilerArgs, "--watch", "--preserveWatchOutput"],
      local.packageDirectory,
    );
    start(
      process.execPath,
      [...tailwindArgs, "--watch=always"],
      local.packageDirectory,
    );
  }
} else {
  console.log("No local ctx9/web checkout; using installed @ctx9/ui.");
}
if (!shutdown.signal.aborted) start(command, args);
