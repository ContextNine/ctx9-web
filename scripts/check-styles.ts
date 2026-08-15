import { readFile } from "node:fs/promises";

const css = await readFile(
  new URL("../packages/ui/src/styles.css", import.meta.url),
  "utf8",
);
const guide = await readFile(
  new URL("../.docs/style-guide.md", import.meta.url),
  "utf8",
);

for (const forbidden of [
  "prefers-color-scheme",
  "next-themes",
  "animate-pulse",
  "shimmer",
  "shooting-stars",
  "Google Fonts",
]) {
  if (css.includes(forbidden)) throw new Error(`forbidden-style:${forbidden}`);
}
if (
  !css.includes("color-scheme: dark") ||
  !css.includes("--ctx9-canvas: #000000")
)
  throw new Error("dark-token-contract-missing");
if (!guide.includes("Dark mode only") || !guide.includes("True black `#000`"))
  throw new Error("dark-style-guide-contract-missing");
