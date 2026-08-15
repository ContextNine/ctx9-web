import { readFile, readdir } from "node:fs/promises";

const packages = await readdir(new URL("../packages", import.meta.url));
if (packages.sort().join(",") !== "ui,web-auth")
  throw new Error("package-inventory-invalid");

for (const name of packages) {
  const raw = await readFile(
    new URL(`../packages/${name}/package.json`, import.meta.url),
    "utf8",
  );
  const manifest = JSON.parse(raw) as {
    name?: string;
    version?: string;
    private?: boolean;
    publishConfig?: { registry?: string };
  };
  if (manifest.version !== "1.0.0" || manifest.private === true)
    throw new Error(`package-release-contract-invalid:${name}`);
  if (
    manifest.publishConfig?.registry !==
    "https://gitlab.com/api/v4/projects/85438020/packages/npm/"
  )
    throw new Error(`package-registry-invalid:${name}`);
}
