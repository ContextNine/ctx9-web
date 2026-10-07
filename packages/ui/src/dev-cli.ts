#!/usr/bin/env node
import { spawn } from "node:child_process";
import { cp, mkdir } from "node:fs/promises";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
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

const local = getLocalUiConfig();
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
  // Paint the first request with complete CSS before either watcher starts.
  const initial = spawn(process.execPath, tailwindArgs, {
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
      else reject(new Error("Local UI stylesheet build failed"));
    });
  });
  if (!shutdown.signal.aborted) {
    console.log(`Local @ctx9/ui source: ${local.packageDirectory}`);
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
