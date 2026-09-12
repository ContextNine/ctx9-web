import { describe, expect, it } from "vitest";

import {
  createTenantAccountSettingsAssertion,
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
    ).resolves.toMatchObject({ clientId: "publisher", userId: "user-one" });

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
      clientId: "secret-bindings-secrets",
      clientSecret: secret,
      userId: "user-one",
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
});
