import type { BetterAuthOptions } from "better-auth";
import type * as BetterAuth from "better-auth";
import { Pool } from "pg";
import { describe, expect, it, vi } from "vitest";
import { createIdentityAuthority } from "./index.js";

// Substitute persistence before Better Auth initializes its real HTTP handler.
vi.mock("better-auth", async (importOriginal) => {
  const actual = await importOriginal<typeof BetterAuth>();
  const { memoryAdapter } = await import("better-auth/adapters/memory");
  return {
    ...actual,
    betterAuth: (options: BetterAuthOptions) =>
      actual.betterAuth({
        ...options,
        database: memoryAdapter({
          oauth_resource: [],
          user: [],
          session: [],
          passkey: [],
          verification: [],
        }),
        rateLimit: { enabled: false },
      }),
  };
});

describe("passkey registration authorization", () => {
  it("rejects absent or unknown context and preserves authorized registration", async () => {
    const pool = new Pool();
    const authority = createIdentityAuthority({
      database: pool,
      secret: "synthetic-registration-test-secret-000000000000",
      origin: "https://identity.example.com",
      name: "Registration test",
      cookieName: "__Host-registration-test",
      clients: [{ clientId: "test", audience: "https://app.example.com" }],
      recoveryCsrfHeader: "x-recovery-csrf",
      enrollmentCsrfHeader: "x-enrollment-csrf",
      resolvePasskeyRegistration(context, cookie, csrf) {
        expect(cookie).toBe("registration=synthetic");
        expect(csrf).toBe(`${context}-csrf`);
        return Promise.resolve({
          id: "synthetic-user",
          name: "Synthetic user",
        });
      },
      recordPasskeyAuthentication() {
        return Promise.resolve();
      },
      resolveMembership() {
        return Promise.reject(new Error("membership-not-used-by-registration"));
      },
    });
    const request = (context: string) =>
      authority.handler(
        new Request(
          `https://identity.example.com/api/auth/passkey/generate-register-options${context ? `?context=${context}` : ""}`,
          {
            headers: {
              cookie: "registration=synthetic",
              "x-enrollment-csrf": "enrollment-csrf",
              "x-recovery-csrf": "recovery-csrf",
            },
          },
        ),
      );
    try {
      for (const context of ["", "unknown"])
        expect((await request(context)).status).toBe(401);
      for (const context of ["enrollment", "recovery"]) {
        const response = await request(context);
        expect(response.status).toBe(200);
        const options: unknown = await response.json();
        expect(options).toHaveProperty("challenge");
        expect(options).toMatchObject({
          rp: { id: "identity.example.com" },
          authenticatorSelection: {
            residentKey: "required",
            userVerification: "required",
          },
        });
      }
    } finally {
      await pool.end();
    }
  });
});
