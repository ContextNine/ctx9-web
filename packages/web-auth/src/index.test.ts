import { describe, expect, it, vi } from "vitest";
import {
  beginAuthorization,
  completeAuthorization,
  encodeOidcBasicCredentials,
  normalizeSameOriginReturnTo,
  OAuthAuthorizationError,
  parseAuthorizationCallback,
  serializeHostCookie,
  type AuthorizationTransaction,
  type AuthorizationTransactionStore,
  type OidcClientPolicy,
  type VerifiedIdentityToken,
} from "./index.js";

const policy: OidcClientPolicy = {
  issuer: "https://auth.ctx9.com/api/auth",
  clientId: "ctx9-sentinel-client",
  clientSecret: "CTX9_SENTINEL_OIDC_CLIENT_SECRET_000000000000",
  redirectUri: "https://sentinel.ctx9.com/auth/callback",
  audience: "https://sentinel.ctx9.com",
  scopes: ["openid", "profile", "email", "tenant"],
};
const transactionKey = "CTX9_SENTINEL_TRANSACTION_KEY_000000000000000";

class MemoryTransactions implements AuthorizationTransactionStore {
  transaction: AuthorizationTransaction | undefined;

  create(transaction: AuthorizationTransaction): Promise<void> {
    this.transaction = transaction;
    return Promise.resolve();
  }

  consume(
    stateDigest: string,
    now: Date,
  ): Promise<AuthorizationTransaction | undefined> {
    const transaction = this.transaction;
    if (transaction?.stateDigest !== stateDigest)
      return Promise.resolve(undefined);
    this.transaction = undefined;
    return Promise.resolve(
      transaction.expiresAt > now ? transaction : undefined,
    );
  }
}

describe("confidential OIDC BFF protocol", () => {
  it("creates a resource-bound PKCE request with only sealed server state", async () => {
    const store = new MemoryTransactions();
    const authorization = new URL(
      await beginAuthorization(policy, store, transactionKey, {
        purpose: "protected",
        returnTo: "/bindings/one",
        prompt: "login",
        maxAge: 0,
        now: new Date("2026-08-15T00:00:00Z"),
      }),
    );
    expect(authorization.searchParams.get("resource")).toBe(policy.audience);
    expect(authorization.searchParams.get("code_challenge_method")).toBe(
      "S256",
    );
    expect(authorization.searchParams.get("prompt")).toBe("login");
    expect(authorization.searchParams.get("max_age")).toBe("0");
    expect(store.transaction).toMatchObject({
      clientId: policy.clientId,
      redirectUri: policy.redirectUri,
      purpose: "protected",
      returnTo: "/bindings/one",
    });
    expect(store.transaction?.stateDigest).not.toBe(
      authorization.searchParams.get("state"),
    );
    expect(store.transaction?.verifierCiphertext).not.toContain(
      authorization.searchParams.get("code_challenge") ?? "missing",
    );
  });

  it("separates bounded OAuth errors without exposing callback state", () => {
    const callback = parseAuthorizationCallback({
      error: "invalid_scope",
      error_description: "The following scopes are invalid: tenant",
      state: "CTX9_SENTINEL_CALLBACK_STATE",
    });
    expect(callback.kind).toBe("error");
    if (callback.kind !== "error") throw new Error("expected-error");
    expect(callback.error).toBeInstanceOf(OAuthAuthorizationError);
    expect(callback.error.message).toBe("oidc-authorization-invalid-scope");
    expect(callback.error.message).not.toContain(callback.state);
  });

  it("form-encodes client credentials before Basic encoding", () => {
    const encoded = encodeOidcBasicCredentials(
      "ctx9-client",
      "synthetic+secret/value=",
    );
    expect(
      Buffer.from(encoded.slice("Basic ".length), "base64").toString(),
    ).toBe("ctx9-client:synthetic%2Bsecret%2Fvalue%3D");
  });

  it("consumes one transaction, exchanges resource-bound code, and verifies nonce", async () => {
    const store = new MemoryTransactions();
    const authorization = new URL(
      await beginAuthorization(policy, store, transactionKey, {
        purpose: "login",
        now: new Date("2026-08-15T00:00:00Z"),
      }),
    );
    const callback = parseAuthorizationCallback({
      code: "synthetic-code",
      state: authorization.searchParams.get("state"),
    });
    const request = vi.fn<typeof fetch>(() =>
      Promise.resolve(
        new Response(JSON.stringify({ id_token: "synthetic-id-token" }), {
          status: 200,
          headers: { "content-type": "application/json" },
        }),
      ),
    );
    const verify = vi.fn(
      (
        _token: string,
        _policy: OidcClientPolicy,
        nonce: string,
      ): Promise<VerifiedIdentityToken> =>
        Promise.resolve({
          payload: { sub: "user-one", nonce, tenant_id: "tenant-one" },
          protectedHeader: { alg: "EdDSA" },
        }),
    );
    const result = await completeAuthorization(
      policy,
      store,
      transactionKey,
      callback,
      {
        fetch: request,
        verifyIdToken: verify,
        now: new Date("2026-08-15T00:01:00Z"),
      },
    );
    expect(result.identity.payload).toMatchObject({
      sub: "user-one",
      tenant_id: "tenant-one",
    });
    const tokenRequest = request.mock.calls[0]?.[1];
    const tokenHeaders = new Headers(tokenRequest?.headers);
    expect(tokenHeaders.get("authorization")).toMatch(/^Basic /u);
    if (!(tokenRequest?.body instanceof URLSearchParams))
      throw new Error("expected-form-body");
    expect(tokenRequest.body.toString()).toContain(
      `resource=${encodeURIComponent(policy.audience)}`,
    );
    await expect(
      completeAuthorization(policy, store, transactionKey, callback, {
        fetch: request,
        verifyIdToken: verify,
      }),
    ).rejects.toThrow("oidc-transaction-invalid");
  });

  it("retains only bounded token endpoint failures", async () => {
    const store = new MemoryTransactions();
    const authorization = new URL(
      await beginAuthorization(policy, store, transactionKey, {
        purpose: "login",
      }),
    );
    const callback = parseAuthorizationCallback({
      code: "synthetic-code",
      state: authorization.searchParams.get("state"),
    });
    const request = () =>
      Promise.resolve(
        new Response(
          JSON.stringify({
            error: "invalid_grant",
            error_description: "authorization code expired",
          }),
          { status: 400 },
        ),
      );
    await expect(
      completeAuthorization(policy, store, transactionKey, callback, {
        fetch: request,
      }),
    ).rejects.toMatchObject({
      message: "oidc-token-exchange-failed",
      status: 400,
      oauthError: "invalid_grant",
      oauthErrorDescription: "authorization code expired",
    });
  });

  it("normalizes local returns and serializes host-only cookies", () => {
    expect(
      normalizeSameOriginReturnTo(
        "/bindings/one?tab=versions",
        policy.audience,
      ),
    ).toBe("/bindings/one?tab=versions");
    expect(() =>
      normalizeSameOriginReturnTo("//attacker.example", policy.audience),
    ).toThrow("return-to-invalid");
    expect(
      serializeHostCookie({
        name: "__Host-ctx9-sentinel",
        value: "opaque",
        maxAgeSeconds: 60,
        sameSite: "Strict",
      }),
    ).toBe(
      "__Host-ctx9-sentinel=opaque; Path=/; Secure; HttpOnly; SameSite=Strict; Max-Age=60",
    );
  });
});
