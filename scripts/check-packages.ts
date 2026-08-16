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
    engines?: { node?: string };
    exports?: Record<string, unknown>;
    name?: string;
    version?: string;
    private?: boolean;
    publishConfig?: { registry?: string };
  };
  if (manifest.version !== "1.0.2" || manifest.private === true)
    throw new Error(`package-release-contract-invalid:${name}`);
  if (manifest.engines?.node !== ">=24.19.0 <25")
    throw new Error(`package-node-contract-invalid:${name}`);
  if (
    manifest.publishConfig?.registry !==
    "https://gitlab.com/api/v4/projects/85438020/packages/npm/"
  )
    throw new Error(`package-registry-invalid:${name}`);
}

const webAuth = JSON.parse(
  await readFile(
    new URL("../packages/web-auth/package.json", import.meta.url),
    "utf8",
  ),
) as { exports?: Record<string, unknown> };
for (const entry of [".", "./express", "./node", "./tanstack-start"]) {
  if (!(entry in (webAuth.exports ?? {})))
    throw new Error(`web-auth-export-missing:${entry}`);
}
