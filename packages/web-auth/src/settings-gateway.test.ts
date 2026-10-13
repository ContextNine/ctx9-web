import { describe, expect, it, vi } from "vitest";

import {
  createTenantAccountSettingsAssertion,
  requestTenantAccountSettings,
  verifyTenantAccountSettingsAssertion,
} from "./settings-gateway.js";

const secret = "CTX9_SENTINEL_SETTINGS_CLIENT_SECRET_000000000000";
const issuedAt = new Date("2026-09-12T12:00:00Z");

describe("tenant account settings gateway", () => {
  it("binds delegated identity to one short-lived request", async () => {
    const token = await createTenantAccountSettingsAssertion({
      clientId: "publisher",
      clientSecret: secret,
      userId: "user-one",
      tenantId: "019d0000-0000-7000-8000-000000000001",
      membershipVersion: 4,
      method: "POST",
      path: "/internal/settings/tenant/select",
      body: '{"tenantId":"tenant-one"}',
      now: issuedAt,
    });

    await expect(
      verifyTenantAccountSettingsAssertion({
        token,
        method: "POST",
        path: "/internal/settings/tenant/select",
        body: '{"tenantId":"tenant-one"}',
        resolveClientSecret: (clientId) =>
          clientId === "publisher" ? secret : undefined,
        now: new Date("2026-09-12T12:00:20Z"),
      }),
    ).resolves.toMatchObject({
      clientId: "publisher",
      userId: "user-one",
      tenantId: "019d0000-0000-7000-8000-000000000001",
      membershipVersion: 4,
    });

    await expect(
      verifyTenantAccountSettingsAssertion({
        token,
        method: "POST",
        path: "/internal/settings/tenant/select",
        body: '{"tenantId":"tenant-two"}',
        resolveClientSecret: () => secret,
        now: new Date("2026-09-12T12:00:20Z"),
      }),
    ).rejects.toThrow("settings-assertion-request-mismatch");
  });

  it("rejects unknown clients and expired assertions", async () => {
    const token = await createTenantAccountSettingsAssertion({
      clientId: "notenv-secrets",
      clientSecret: secret,
      userId: "user-one",
      tenantId: "019d0000-0000-7000-8000-000000000001",
      membershipVersion: 4,
      method: "GET",
      path: "/internal/settings/snapshot",
      now: issuedAt,
    });

    await expect(
      verifyTenantAccountSettingsAssertion({
        token,
        method: "GET",
        path: "/internal/settings/snapshot",
        resolveClientSecret: () => undefined,
        now: new Date("2026-09-12T12:00:10Z"),
      }),
    ).rejects.toThrow("settings-assertion-client-denied");
    await expect(
      verifyTenantAccountSettingsAssertion({
        token,
        method: "GET",
        path: "/internal/settings/snapshot",
        resolveClientSecret: () => secret,
        now: new Date("2026-09-12T12:01:00Z"),
      }),
    ).rejects.toThrow();
  });

  it("sends the exact signed body without exposing the client secret", async () => {
    const request = vi.fn<typeof fetch>(() =>
      Promise.resolve(
        new Response(JSON.stringify({ selectedTenantId: "tenant-two" }), {
          status: 200,
          headers: { "content-type": "application/json" },
        }),
      ),
    );
    await expect(
      requestTenantAccountSettings({
        origin: "https://platform.ctx9.test",
        clientId: "publisher",
        clientSecret: secret,
        userId: "user-one",
        tenantId: "019d0000-0000-7000-8000-000000000001",
        membershipVersion: 4,
        method: "POST",
        path: "/internal/settings/tenant/select",
        body: { tenantId: "tenant-two" },
        request,
      }),
    ).resolves.toEqual({ selectedTenantId: "tenant-two" });
    const [url, init] = request.mock.calls[0] ?? [];
    expect(url).toBeInstanceOf(URL);
    if (!(url instanceof URL)) throw new Error("expected-url");
    expect(url.href).toBe(
      "https://platform.ctx9.test/internal/settings/tenant/select",
    );
    expect(init?.body).toBe('{"tenantId":"tenant-two"}');
    const authorization = new Headers(init?.headers).get("authorization");
    expect(authorization).toMatch(/^Bearer /u);
    expect(authorization).not.toContain(secret);
  });
});
