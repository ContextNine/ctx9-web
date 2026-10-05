import { readFile, readdir } from "node:fs/promises";
import ts from "typescript";

const packages = await readdir(new URL("../packages", import.meta.url));
if (packages.sort().join(",") !== "ui,web-auth")
  throw new Error("package-inventory-invalid");

const workspace = JSON.parse(
  await readFile(new URL("../package.json", import.meta.url), "utf8"),
) as { version?: string };
if (!workspace.version) throw new Error("workspace-version-missing");

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
  if (manifest.version !== workspace.version || manifest.private === true)
    throw new Error(`package-release-contract-invalid:${name}`);
  if (manifest.engines?.node !== "22.16.0")
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

// React's server entry omits these APIs. Preserve client boundaries in shipped files.
const uiDist = new URL("../packages/ui/dist/", import.meta.url);
for (const file of await readdir(uiDist)) {
  if (!file.endsWith(".js")) continue;
  const source = await readFile(new URL(file, uiDist), "utf8");
  const tree = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true);
  function usesClientApi(node: ts.Node): boolean {
    if (ts.isCallExpression(node)) {
      const name = ts.isPropertyAccessExpression(node.expression)
        ? node.expression.name.text
        : ts.isIdentifier(node.expression)
          ? node.expression.text
          : "";
      if (/^(?:use[A-Z]|forwardRef$|createContext$)/u.test(name)) return true;
    }
    return ts.forEachChild(node, usesClientApi) ?? false;
  }
  const first = tree.statements[0];
  if (
    usesClientApi(tree) &&
    (!first ||
      !ts.isExpressionStatement(first) ||
      !ts.isStringLiteral(first.expression) ||
      first.expression.text !== "use client")
  )
    throw new Error(`package-client-boundary-missing:${file}`);
}
