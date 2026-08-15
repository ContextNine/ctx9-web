import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";

const root = new URL("../", import.meta.url);
const provenance = await readFile(
  new URL(".docs/source-provenance.md", root),
  "utf8",
);
const styleSource = await readFile(
  new URL("packages/ui/src/styles.css", root),
  "utf8",
);

if (!provenance.includes("24f2833abf7a24e7ada6b2f516a599cae8fcc50b"))
  throw new Error("impression-reference-not-pinned");
for (const forbidden of [
  "https://",
  "http://",
  "prefers-color-scheme",
  "dark:",
]) {
  if (styleSource.includes(forbidden))
    throw new Error(`runtime-style-provenance-invalid:${forbidden}`);
}

const fonts = [
  {
    path: "packages/ui/src/fonts/geist-sans-variable.woff2",
    expected:
      "a369fcf5628ea2aa4e1b9e2ec6a5b3624e365bda588e1f0f2f12b564f728fbb8",
  },
  {
    path: "packages/ui/src/fonts/jetbrains-mono-latin-variable.woff2",
    expected:
      "18be452724bfdc236c074ca94a249a7f41a86752c7d04ab258ce9ed5651f6a7e",
  },
] as const;

for (const font of fonts) {
  const bytes = await readFile(new URL(font.path, root));
  const actual = createHash("sha256").update(bytes).digest("hex");
  if (actual !== font.expected || !provenance.includes(actual))
    throw new Error(`font-provenance-invalid:${font.path}`);
}

for (const license of [
  "packages/ui/src/fonts/licenses/geist-ofl.txt",
  "packages/ui/src/fonts/licenses/jetbrains-mono-ofl.txt",
]) {
  const text = await readFile(new URL(license, root), "utf8");
  if (!text.includes("SIL OPEN FONT LICENSE"))
    throw new Error(`font-license-invalid:${license}`);
}

const approvedLicenses = new Set(["Apache-2.0", "ISC", "MIT"]);
for (const dependency of [
  "@radix-ui/react-alert-dialog",
  "@radix-ui/react-checkbox",
  "@radix-ui/react-dialog",
  "@radix-ui/react-dropdown-menu",
  "@radix-ui/react-label",
  "@radix-ui/react-popover",
  "@radix-ui/react-scroll-area",
  "@radix-ui/react-select",
  "@radix-ui/react-slot",
  "@radix-ui/react-switch",
  "@radix-ui/react-tabs",
  "@radix-ui/react-toast",
  "@radix-ui/react-tooltip",
  "class-variance-authority",
  "clsx",
  "cmdk",
  "date-fns",
  "lucide-react",
  "react-day-picker",
  "react-hook-form",
  "tailwind-merge",
  "jose",
  "zod",
]) {
  const manifest = JSON.parse(
    await readFile(
      new URL(
        `node_modules/.pnpm/node_modules/${dependency}/package.json`,
        root,
      ),
      "utf8",
    ),
  ) as { license?: string };
  if (!manifest.license || !approvedLicenses.has(manifest.license))
    throw new Error(`dependency-license-unapproved:${dependency}`);
}
