import { readdir, readFile } from "node:fs/promises";

const css = await readFile(
  new URL("../packages/ui/src/styles.css", import.meta.url),
  "utf8",
);
const guide = await readFile(
  new URL("../docs/style-guide.md", import.meta.url),
  "utf8",
);
const compiled = await readFile(
  new URL("../packages/ui/dist/styles.css", import.meta.url),
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
if (/button,\s*\ninput/u.test(css))
  throw new Error("shared-button-color-must-not-inherit");
if (!guide.includes("Dark mode only") || !guide.includes("True black `#000`"))
  throw new Error("dark-style-guide-contract-missing");
for (const expected of [
  ".bg-surface",
  ".bg-sidebar",
  ".bg-selected",
  ".border-border",
  ".text-foreground",
  ".focus-visible\\:ring-focus",
  "./fonts/geist-sans-variable.woff2",
  "./fonts/jetbrains-mono-latin-variable.woff2",
]) {
  if (!compiled.includes(expected))
    throw new Error(`compiled-style-contract-missing:${expected}`);
}

const uiSource = new URL("../packages/ui/src/", import.meta.url);
const primitiveFiles = new Set(["button.tsx", "controls.tsx"]);
for (const file of await readdir(uiSource)) {
  if (!file.endsWith(".ts") && !file.endsWith(".tsx")) continue;
  const source = await readFile(new URL(file, uiSource), "utf8");
  for (const forbidden of [
    "dark:",
    "next-themes",
    "theme-toggle",
    "animate-spin",
    "animate-pulse",
    "shimmer",
    "shooting-stars",
  ]) {
    if (source.includes(forbidden))
      throw new Error(`forbidden-ui-source:${file}:${forbidden}`);
  }
  if (
    !primitiveFiles.has(file) &&
    /<(?:button|input|textarea|select)\b/u.test(source)
  )
    throw new Error(`raw-standard-control:${file}`);
}

const buttonSource = await readFile(new URL("button.tsx", uiSource), "utf8");
for (const expected of [
  'variant = "primary"',
  "border-border-strong bg-black text-white",
  "hover:bg-black hover:text-white",
  'FunkyLoaderButton.displayName = "FunkyLoaderButton"',
]) {
  if (!buttonSource.includes(expected))
    throw new Error(`shared-button-contract-missing:${expected}`);
}
for (const forbidden of ["bg-foreground text-black", "hover:bg-white"]) {
  if (buttonSource.includes(forbidden))
    throw new Error(`shared-button-light-regression:${forbidden}`);
}
