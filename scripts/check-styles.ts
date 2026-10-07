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
  "Google Fonts",
]) {
  if (css.includes(forbidden)) throw new Error(`forbidden-style:${forbidden}`);
}
if (
  !css.includes("color-scheme: light") ||
  !css.includes('[data-theme="dark"]') ||
  !css.includes("--background: 0 0% 100%") ||
  !css.includes("--background: 0 0% 3.9%")
)
  throw new Error("light-dark-token-contract-missing");
if (/button,\s*\ninput/u.test(css))
  throw new Error("shared-button-color-must-not-inherit");
if (
  !guide.includes("One semantic light theme") ||
  !guide.includes("true black `#000`")
)
  throw new Error("light-dark-style-guide-contract-missing");
for (const expected of [
  ".bg-surface",
  ".bg-sidebar",
  ".bg-selected",
  ".border-border",
  ".text-foreground",
  ".focus-visible\\:ring-focus",
  "fonts/geist-sans-variable.woff2",
  "fonts/inter-normal-variable.ttf",
]) {
  if (!compiled.includes(expected))
    throw new Error(`compiled-style-contract-missing:${expected}`);
}

const uiSource = new URL("../packages/ui/src/", import.meta.url);
const primitiveFiles = new Set([
  "button.tsx",
  // Published animated button implementation with variant-owned appearance.
  "shimmer-border-button.tsx",
  "input.tsx",
  "textarea.tsx",
  // Private compound-control action with no className or style prop.
  "selection-button.tsx",
  // Private color-picker action with a typed color value and no styling props.
  "color-swatch.tsx",
  // Appearance-owned compound controls ported from Impression.
  "sidebar.tsx",
  "assistant-choice-option.tsx",
]);
for (const file of await readdir(uiSource)) {
  if (!file.endsWith(".ts") && !file.endsWith(".tsx")) continue;
  const source = await readFile(new URL(file, uiSource), "utf8");
  for (const forbidden of ["next-themes"]) {
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
for (const expected of ['variant: "primary"', 'loadingLabel = "Working…"']) {
  if (!buttonSource.includes(expected))
    throw new Error(`shared-button-contract-missing:${expected}`);
}
