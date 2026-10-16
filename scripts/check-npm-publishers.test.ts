import { readFile } from "node:fs/promises";
import { expect, it } from "vitest";
import { checkNpmPublishers } from "./check-npm-publishers.js";

it("checks each package with scoped OIDC and returns only metadata when one connection fails", async () => {
  const manifest = JSON.parse(
    await readFile(new URL("../package.json", import.meta.url), "utf8"),
  ) as { version: string };
  const identityToken = "NOTENV_SENTINEL_GITHUB_OIDC_ONLY";
  const registryToken = "NOTENV_SENTINEL_NPM_EXCHANGE_ONLY";
  const environment = {
    GITHUB_ACTIONS: "true",
    RUNNER_ENVIRONMENT: "github-hosted",
    GITHUB_REPOSITORY: "ContextNine/ctx9-web",
    GITHUB_REF: `refs/tags/v${manifest.version}`,
    GITHUB_WORKFLOW_REF: `ContextNine/ctx9-web/.github/workflows/publish.yml@refs/tags/v${manifest.version}`,
    ACTIONS_ID_TOKEN_REQUEST_URL:
      "https://vstoken.actions.githubusercontent.com/test?api-version=2.0",
    ACTIONS_ID_TOKEN_REQUEST_TOKEN: "NOTENV_SENTINEL_GITHUB_REQUEST_ONLY",
  };
  let failedPackage = "";
  const exchanges: string[] = [];
  const request: typeof fetch = (input, init) => {
    const url = new URL(input instanceof Request ? input.url : input);
    const headers = new Headers(init?.headers);
    expect(init?.redirect).toBe("error");
    if (url.origin === "https://vstoken.actions.githubusercontent.com") {
      expect(url.searchParams.get("audience")).toBe("npm:registry.npmjs.org");
      expect(headers.get("authorization")).toBe(
        `Bearer ${environment.ACTIONS_ID_TOKEN_REQUEST_TOKEN}`,
      );
      return Promise.resolve(Response.json({ value: identityToken }));
    }
    expect(url.origin).toBe("https://registry.npmjs.org");
    expect(init?.method).toBe("POST");
    expect(headers.get("authorization")).toBe(`Bearer ${identityToken}`);
    const name = decodeURIComponent(url.pathname.split("/").at(-1) ?? "");
    expect(["@ctx9/ui", "@ctx9/web-auth", "@ctx9/identity"]).toContain(name);
    exchanges.push(name);
    return Promise.resolve(
      Response.json(
        { token: registryToken },
        { status: name === failedPackage ? 404 : 201 },
      ),
    );
  };
  const authorized = await checkNpmPublishers(environment, request);
  expect(authorized.every((result) => result.oidc_exchange_authorized)).toBe(
    true,
  );
  failedPackage = "@ctx9/web-auth";
  const incomplete = await checkNpmPublishers(environment, request);
  expect(incomplete.map((result) => result.oidc_exchange_authorized)).toEqual([
    true,
    false,
    true,
  ]);
  expect(exchanges).toEqual([
    "@ctx9/ui",
    "@ctx9/web-auth",
    "@ctx9/identity",
    "@ctx9/ui",
    "@ctx9/web-auth",
    "@ctx9/identity",
  ]);
  const output = JSON.stringify([authorized, incomplete]);
  expect(
    output.includes(identityToken) ||
      output.includes(registryToken) ||
      output.includes(environment.ACTIONS_ID_TOKEN_REQUEST_TOKEN),
  ).toBe(false);
});
