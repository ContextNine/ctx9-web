import {
  createCipheriv,
  createDecipheriv,
  createHash,
  randomBytes,
  timingSafeEqual,
} from "node:crypto";
import { createRemoteJWKSet, jwtVerify, type JWTPayload } from "jose";
import { z } from "zod";

const safeOAuthErrors = new Set([
  "access_denied",
  "account_selection_required",
  "consent_required",
  "interaction_required",
  "invalid_grant",
  "invalid_request",
  "invalid_scope",
  "invalid_target",
  "login_required",
  "server_error",
  "temporarily_unavailable",
  "unauthorized_client",
  "unsupported_response_type",
]);

const callbackRecord = z.record(z.string(), z.unknown());

export interface OidcClientPolicy {
  issuer: string;
  clientId: string;
  clientSecret: string;
  redirectUri: string;
  audience: string;
  scopes: readonly string[];
}

export interface AuthorizationTransaction {
  stateDigest: string;
  clientId: string;
  redirectUri: string;
  nonce: string;
  verifierCiphertext: string;
  verifierIv: string;
  purpose: string;
  returnTo?: string;
  createdAt: Date;
  expiresAt: Date;
}

export interface AuthorizationTransactionStore {
  create(transaction: AuthorizationTransaction): Promise<void>;
  consume(
    stateDigest: string,
    now: Date,
  ): Promise<AuthorizationTransaction | undefined>;
}

export type AuthorizationCallback =
  | { kind: "success"; code: string; state: string }
  | { kind: "error"; state: string; error: OAuthAuthorizationError };

export interface VerifiedIdentityToken {
  payload: JWTPayload;
  protectedHeader: { alg?: string; kid?: string };
}

export interface CompleteAuthorizationOptions {
  fetch?: typeof fetch;
  now?: Date;
  verifyIdToken?: (
    token: string,
    policy: OidcClientPolicy,
    nonce: string,
  ) => Promise<VerifiedIdentityToken>;
}

export class OAuthAuthorizationError extends Error {
  constructor(
    readonly oauthError: string,
    readonly oauthErrorDescription: string,
  ) {
    super(`oidc-authorization-${oauthError.replaceAll("_", "-")}`);
  }
}

export class OAuthTokenExchangeError extends Error {
  constructor(
    readonly status: number,
    readonly oauthError: string,
    readonly oauthErrorDescription: string,
  ) {
    super("oidc-token-exchange-failed");
  }
}

function sha256(value: string): Buffer {
  return createHash("sha256").update(value).digest();
}

export function digestOpaque(value: string): string {
  return sha256(value).toString("hex");
}

export function equalOpaqueDigest(left: string, right: string): boolean {
  const leftBytes = Buffer.from(left, "hex");
  const rightBytes = Buffer.from(right, "hex");
  return (
    leftBytes.length === rightBytes.length &&
    timingSafeEqual(leftBytes, rightBytes)
  );
}

function assertSecret(name: string, value: string): void {
  if (Buffer.byteLength(value, "utf8") < 32)
    throw new Error(`${name}-too-short`);
}

function assertPolicy(policy: OidcClientPolicy): void {
  assertSecret("oidc-client-secret", policy.clientSecret);
  const issuer = new URL(policy.issuer);
  const redirect = new URL(policy.redirectUri);
  const audience = new URL(policy.audience);
  if (
    issuer.protocol !== "https:" ||
    redirect.protocol !== "https:" ||
    audience.protocol !== "https:" ||
    policy.scopes.length === 0 ||
    !policy.scopes.includes("openid")
  )
    throw new Error("oidc-client-policy-invalid");
}

export function encodeOidcBasicCredentials(
  clientId: string,
  clientSecret: string,
): string {
  const encode = (value: string) =>
    new URLSearchParams({ value }).toString().slice("value=".length);
  return `Basic ${Buffer.from(`${encode(clientId)}:${encode(clientSecret)}`).toString("base64")}`;
}

export function sealPkceVerifier(
  verifier: string,
  transactionKey: string,
): { ciphertext: string; iv: string } {
  assertSecret("oidc-transaction-key", transactionKey);
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", sha256(transactionKey), iv);
  cipher.setAAD(Buffer.from("ctx9:web-auth:pkce:v1"));
  const bytes = Buffer.concat([
    cipher.update(verifier, "utf8"),
    cipher.final(),
    cipher.getAuthTag(),
  ]);
  return {
    ciphertext: bytes.toString("base64url"),
    iv: iv.toString("base64url"),
  };
}

export function openPkceVerifier(
  ciphertext: string,
  iv: string,
  transactionKey: string,
): string {
  assertSecret("oidc-transaction-key", transactionKey);
  const bytes = Buffer.from(ciphertext, "base64url");
  if (bytes.length <= 16) throw new Error("oidc-transaction-invalid");
  const decipher = createDecipheriv(
    "aes-256-gcm",
    sha256(transactionKey),
    Buffer.from(iv, "base64url"),
  );
  decipher.setAAD(Buffer.from("ctx9:web-auth:pkce:v1"));
  decipher.setAuthTag(bytes.subarray(-16));
  return Buffer.concat([
    decipher.update(bytes.subarray(0, -16)),
    decipher.final(),
  ]).toString("utf8");
}

function single(value: unknown): string | undefined {
  return typeof value === "string" && value.length > 0 ? value : undefined;
}

function callbackValues(
  input: URL | URLSearchParams | Record<string, unknown>,
): Record<string, unknown> {
  if (input instanceof URL) return Object.fromEntries(input.searchParams);
  if (input instanceof URLSearchParams) return Object.fromEntries(input);
  return callbackRecord.parse(input);
}

export function parseAuthorizationCallback(
  input: URL | URLSearchParams | Record<string, unknown>,
): AuthorizationCallback {
  const values = callbackValues(input);
  const state = single(values.state);
  const code = single(values.code);
  const rawError = single(values.error);
  if (rawError) {
    if (!state) throw new Error("oidc-callback-invalid");
    const error = safeOAuthErrors.has(rawError) ? rawError : "unknown";
    const rawDescription = single(values.error_description);
    const description =
      rawDescription && /^[a-zA-Z0-9 .,:_()/-]{1,160}$/u.test(rawDescription)
        ? rawDescription
        : "not provided";
    return {
      kind: "error",
      state,
      error: new OAuthAuthorizationError(error, description),
    };
  }
  if (!code || !state) throw new Error("oidc-callback-invalid");
  return { kind: "success", code, state };
}

export async function beginAuthorization(
  policy: OidcClientPolicy,
  store: AuthorizationTransactionStore,
  transactionKey: string,
  options: {
    purpose: string;
    returnTo?: string;
    prompt?: "login";
    maxAge?: 0;
    now?: Date;
    lifetimeMs?: number;
  },
): Promise<string> {
  assertPolicy(policy);
  assertSecret("oidc-transaction-key", transactionKey);
  const now = options.now ?? new Date();
  const state = randomBytes(32).toString("base64url");
  const nonce = randomBytes(32).toString("base64url");
  const verifier = randomBytes(48).toString("base64url");
  const sealed = sealPkceVerifier(verifier, transactionKey);
  await store.create({
    stateDigest: digestOpaque(state),
    clientId: policy.clientId,
    redirectUri: policy.redirectUri,
    nonce,
    verifierCiphertext: sealed.ciphertext,
    verifierIv: sealed.iv,
    purpose: options.purpose,
    ...(options.returnTo ? { returnTo: options.returnTo } : {}),
    createdAt: now,
    expiresAt: new Date(now.getTime() + (options.lifetimeMs ?? 5 * 60_000)),
  });
  const authorization = new URL(`${policy.issuer}/oauth2/authorize`);
  authorization.search = new URLSearchParams({
    response_type: "code",
    client_id: policy.clientId,
    redirect_uri: policy.redirectUri,
    scope: policy.scopes.join(" "),
    state,
    nonce,
    code_challenge: sha256(verifier).toString("base64url"),
    code_challenge_method: "S256",
    resource: policy.audience,
  }).toString();
  if (options.prompt) authorization.searchParams.set("prompt", options.prompt);
  if (options.maxAge === 0) authorization.searchParams.set("max_age", "0");
  return authorization.toString();
}

function safeTokenError(body: unknown): { error: string; description: string } {
  if (!body || typeof body !== "object")
    return { error: "unknown", description: "not provided" };
  const value = body as Record<string, unknown>;
  const rawError = single(value.error);
  const rawDescription = single(value.error_description);
  return {
    error: rawError && safeOAuthErrors.has(rawError) ? rawError : "unknown",
    description:
      rawDescription && /^[a-zA-Z0-9 .,:_()/-]{1,160}$/u.test(rawDescription)
        ? rawDescription
        : "not provided",
  };
}

export async function verifyIdentityToken(
  token: string,
  policy: OidcClientPolicy,
  nonce: string,
): Promise<VerifiedIdentityToken> {
  const keys = createRemoteJWKSet(new URL(`${policy.issuer}/jwks`));
  const verified = await jwtVerify(token, keys, {
    issuer: policy.issuer,
    audience: policy.clientId,
  });
  if (verified.payload.nonce !== nonce) throw new Error("oidc-nonce-invalid");
  return {
    payload: verified.payload,
    protectedHeader: {
      alg: verified.protectedHeader.alg,
      ...(verified.protectedHeader.kid
        ? { kid: verified.protectedHeader.kid }
        : {}),
    },
  };
}

export async function completeAuthorization(
  policy: OidcClientPolicy,
  store: AuthorizationTransactionStore,
  transactionKey: string,
  callback: AuthorizationCallback,
  options: CompleteAuthorizationOptions = {},
): Promise<{
  transaction: AuthorizationTransaction;
  identity: VerifiedIdentityToken;
}> {
  assertPolicy(policy);
  if (callback.kind === "error") throw callback.error;
  const now = options.now ?? new Date();
  const transaction = await store.consume(digestOpaque(callback.state), now);
  if (
    !transaction ||
    transaction.expiresAt <= now ||
    transaction.clientId !== policy.clientId ||
    transaction.redirectUri !== policy.redirectUri
  )
    throw new Error("oidc-transaction-invalid");
  const verifier = openPkceVerifier(
    transaction.verifierCiphertext,
    transaction.verifierIv,
    transactionKey,
  );
  const response = await (options.fetch ?? fetch)(
    `${policy.issuer}/oauth2/token`,
    {
      method: "POST",
      headers: {
        authorization: encodeOidcBasicCredentials(
          policy.clientId,
          policy.clientSecret,
        ),
        "content-type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code: callback.code,
        redirect_uri: policy.redirectUri,
        client_id: policy.clientId,
        code_verifier: verifier,
        resource: policy.audience,
      }),
      redirect: "error",
    },
  );
  if (!response.ok) {
    const safe = safeTokenError(await response.json().catch(() => undefined));
    throw new OAuthTokenExchangeError(
      response.status,
      safe.error,
      safe.description,
    );
  }
  const body: unknown = await response.json();
  if (
    !body ||
    typeof body !== "object" ||
    !("id_token" in body) ||
    typeof body.id_token !== "string"
  )
    throw new Error("oidc-token-response-invalid");
  const identity = await (options.verifyIdToken ?? verifyIdentityToken)(
    body.id_token,
    policy,
    transaction.nonce,
  );
  return { transaction, identity };
}

export function normalizeSameOriginReturnTo(
  value: string,
  origin: string,
  maxLength = 512,
): string {
  if (
    !value ||
    value.length > maxLength ||
    !value.startsWith("/") ||
    value.startsWith("//")
  )
    throw new Error("return-to-invalid");
  const parsed = new URL(value, origin);
  if (parsed.origin !== origin || parsed.hash)
    throw new Error("return-to-invalid");
  return `${parsed.pathname}${parsed.search}`;
}

export function serializeHostCookie(options: {
  name: `__Host-${string}`;
  value: string;
  maxAgeSeconds: number;
  sameSite: "Strict" | "Lax";
  httpOnly?: boolean;
}): string {
  if (!options.value || /[;\r\n]/u.test(options.value))
    throw new Error("cookie-value-invalid");
  return [
    `${options.name}=${options.value}`,
    "Path=/",
    "Secure",
    options.httpOnly === false ? undefined : "HttpOnly",
    `SameSite=${options.sameSite}`,
    `Max-Age=${String(options.maxAgeSeconds)}`,
  ]
    .filter((value): value is string => Boolean(value))
    .join("; ");
}

export function assertSameOriginMutation(
  headers: Headers,
  expectedOrigin: string,
): void {
  const site = headers.get("sec-fetch-site");
  const origin = headers.get("origin");
  if (
    (site && site !== "same-origin" && site !== "none") ||
    origin !== expectedOrigin
  )
    throw new Error("browser-origin-denied");
}
