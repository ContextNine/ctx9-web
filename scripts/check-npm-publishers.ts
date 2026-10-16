import { readFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";

const packages = ["@ctx9/ui", "@ctx9/web-auth", "@ctx9/identity"] as const;

/** Check every approved connection before creating any release archive or publication. */
export async function checkNpmPublishers(
  environment: NodeJS.ProcessEnv,
  request: typeof fetch = fetch,
) {
  const manifest: unknown = JSON.parse(
    await readFile(new URL("../package.json", import.meta.url), "utf8"),
  );
  if (
    !manifest ||
    typeof manifest !== "object" ||
    !("version" in manifest) ||
    typeof manifest.version !== "string"
  )
    throw new Error("npm-release-version-required");
  const ref = `refs/tags/v${manifest.version}`;
  if (
    environment.GITHUB_ACTIONS !== "true" ||
    environment.RUNNER_ENVIRONMENT !== "github-hosted" ||
    environment.GITHUB_REPOSITORY !== "ContextNine/ctx9-web" ||
    environment.GITHUB_REF !== ref ||
    environment.GITHUB_WORKFLOW_REF !==
      `ContextNine/ctx9-web/.github/workflows/publish.yml@${ref}`
  )
    throw new Error("protected-npm-release-context-required");
  const requestToken = environment.ACTIONS_ID_TOKEN_REQUEST_TOKEN;
  const rawUrl = environment.ACTIONS_ID_TOKEN_REQUEST_URL;
  if (!requestToken || !rawUrl) throw new Error("github-oidc-request-required");
  const url = new URL(rawUrl);
  if (
    url.protocol !== "https:" ||
    !url.hostname.endsWith(".actions.githubusercontent.com") ||
    url.username ||
    url.password ||
    url.hash
  )
    throw new Error("github-oidc-request-origin-invalid");
  url.searchParams.set("audience", "npm:registry.npmjs.org");

  const results = [];
  for (const name of packages) {
    let stage: "github-identity" | "npm-exchange" = "github-identity";
    let status: number | null = null;
    let authorized = false;
    try {
      const identity = await request(url, {
        headers: { authorization: `Bearer ${requestToken}` },
        redirect: "error",
        signal: AbortSignal.timeout(20_000),
      });
      status = identity.status;
      if (!identity.ok) throw new Error("github-oidc-request-failed");
      const body: unknown = await identity.json();
      if (
        !body ||
        typeof body !== "object" ||
        !("value" in body) ||
        typeof body.value !== "string" ||
        !body.value
      )
        throw new Error("github-oidc-response-invalid");
      stage = "npm-exchange";
      status = null;
      const exchange = await request(
        `https://registry.npmjs.org/-/npm/v1/oidc/token/exchange/package/${encodeURIComponent(name)}`,
        {
          method: "POST",
          headers: { authorization: `Bearer ${body.value}` },
          redirect: "error",
          signal: AbortSignal.timeout(20_000),
        },
      );
      status = exchange.status;
      authorized = status === 201;
      // The response contains a package-write token. Discard it without reading or retaining it.
      await exchange.body?.cancel();
    } catch {
      authorized = false;
    }
    results.push({
      package: name,
      stage,
      status,
      oidc_exchange_authorized: authorized,
      values_returned: false as const,
    });
  }
  return results;
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(process.argv[1]).href
) {
  try {
    const results = await checkNpmPublishers(process.env);
    process.stdout.write(
      `${JSON.stringify({ publishers: results, values_returned: false })}\n`,
    );
    if (results.some((result) => !result.oidc_exchange_authorized))
      process.exitCode = 1;
  } catch {
    process.stderr.write(
      "Protected npm publisher verification failed. No package was published.\n",
    );
    process.exitCode = 1;
  }
}
