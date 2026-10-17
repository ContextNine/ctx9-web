import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";

const root = new URL("../", import.meta.url);
const provenance = await readFile(
  new URL("docs/source-provenance.md", root),
  "utf8",
);
const styleSource = await readFile(
  new URL("packages/ui/src/styles.css", root),
  "utf8",
);

if (!provenance.includes("ccc4fd09d4f3f5eee0adb501f145c4ceb5d51e41"))
  throw new Error("impression-reference-not-pinned");
if (!provenance.includes("b9938d94635fca7a4560449713b0b1ba87d77bc6"))
  throw new Error("shadcn-reference-not-pinned");
for (const forbidden of ["https://", "http://", "prefers-color-scheme"]) {
  if (styleSource.includes(forbidden))
    throw new Error(`runtime-style-provenance-invalid:${forbidden}`);
}
// A variable such as --ns-blue-bg-dark: is not a Tailwind selector.
if (/(?:^|[\s.])dark:/.test(styleSource))
  throw new Error("runtime-style-provenance-invalid:dark:");

const fonts = [
  {
    path: "packages/ui/src/fonts/geist-sans-variable.woff2",
    expected:
      "46525b05bbf4527d263f8624ca7024c7d0dce3c64430267d30c31c6dd3821e4d",
  },
  {
    path: "packages/ui/src/fonts/inter-normal-variable.ttf",
    expected:
      "29160a80ff49ddcab2c97711247e08b1fab27a484a329ce8b813d820dc559031",
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
  "packages/ui/src/fonts/licenses/inter-ofl.txt",
  "packages/ui/src/fonts/licenses/jetbrains-mono-ofl.txt",
]) {
  const text = await readFile(new URL(license, root), "utf8");
  if (!text.includes("SIL OPEN FONT LICENSE"))
    throw new Error(`font-license-invalid:${license}`);
}

const approvedLicenses = new Set(["Apache-2.0", "ISC", "MIT"]);
for (const directory of ["ui", "web-auth", "identity"]) {
  const manifest = JSON.parse(
    await readFile(new URL(`packages/${directory}/package.json`, root), "utf8"),
  ) as {
    dependencies?: Record<string, string>;
    optionalDependencies?: Record<string, string>;
    peerDependencies?: Record<string, string>;
  };
  const dependencies = Object.keys({
    ...manifest.dependencies,
    ...manifest.optionalDependencies,
    ...manifest.peerDependencies,
  });
  for (const dependency of dependencies) {
    // Inspect each package's actual selected dependency, including peer versions.
    const installed = JSON.parse(
      await readFile(
        new URL(
          `packages/${directory}/node_modules/${dependency}/package.json`,
          root,
        ),
        "utf8",
      ),
    ) as { license?: string };
    if (!installed.license || !approvedLicenses.has(installed.license))
      throw new Error(
        `dependency-license-unapproved:${directory}:${dependency}`,
      );
  }
}
