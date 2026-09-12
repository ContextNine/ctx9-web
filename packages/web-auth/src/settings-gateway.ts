import { createHash, randomUUID } from "node:crypto";

import { decodeJwt, jwtVerify, SignJWT } from "jose";
import { z } from "zod";

export const tenantAccountSettingsAudience = "urn:ctx9:tenant-account-settings";

const methodSchema = z.enum(["GET", "POST", "PATCH", "DELETE"]);

const assertionSchema = z.object({
  iss: z.string().min(1).max(128),
  sub: z.string().min(1).max(256),
  aud: z.union([
    z.literal(tenantAccountSettingsAudience),
    z.array(z.literal(tenantAccountSettingsAudience)).min(1),
  ]),
  iat: z.number().int(),
  exp: z.number().int(),
  jti: z.uuid(),
  schema_version: z.literal(1),
  tenant_id: z.uuid(),
  membership_version: z.number().int().positive(),
  method: methodSchema,
  path: z.string().min(1).max(512).startsWith("/internal/settings"),
  body_sha256: z.string().regex(/^[a-f0-9]{64}$/u),
});

export type TenantAccountSettingsMethod = z.infer<typeof methodSchema>;

export interface TenantAccountSettingsAssertion {
  clientId: string;
  userId: string;
  tenantId: string;
  membershipVersion: number;
  requestId: string;
}

function digestBody(body: string): string {
  return createHash("sha256").update(body).digest("hex");
}

function signingKey(secret: string): Uint8Array {
  if (Buffer.byteLength(secret, "utf8") < 32)
    throw new Error("settings-client-secret-too-short");
  return new TextEncoder().encode(secret);
}

/** Creates a short-lived assertion bound to one server-to-server request. */
export async function createTenantAccountSettingsAssertion({
  clientId,
  clientSecret,
  userId,
  tenantId,
  membershipVersion,
  method,
  path,
  body = "",
  now = new Date(),
}: {
  clientId: string;
  clientSecret: string;
  userId: string;
  tenantId: string;
  membershipVersion: number;
  method: TenantAccountSettingsMethod;
  path: `/internal/settings${string}`;
  body?: string;
  now?: Date;
}): Promise<string> {
  const issuedAt = Math.floor(now.getTime() / 1000);
  return new SignJWT({
    schema_version: 1,
    tenant_id: tenantId,
    membership_version: membershipVersion,
    method,
    path,
    body_sha256: digestBody(body),
  })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setIssuer(clientId)
    .setSubject(userId)
    .setAudience(tenantAccountSettingsAudience)
    .setIssuedAt(issuedAt)
    .setExpirationTime(issuedAt + 30)
    .setJti(randomUUID())
    .sign(signingKey(clientSecret));
}

/** Verifies the caller, expiry, and exact method/path/body request binding. */
export async function verifyTenantAccountSettingsAssertion({
  token,
  method,
  path,
  body = "",
  resolveClientSecret,
  now = new Date(),
}: {
  token: string;
  method: TenantAccountSettingsMethod;
  path: `/internal/settings${string}`;
  body?: string;
  resolveClientSecret: (clientId: string) => string | undefined;
  now?: Date;
}): Promise<TenantAccountSettingsAssertion> {
  const decoded = decodeJwt(token);
  if (typeof decoded.iss !== "string")
    throw new Error("settings-assertion-issuer-required");
  const secret = resolveClientSecret(decoded.iss);
  if (!secret) throw new Error("settings-assertion-client-denied");
  const verified = await jwtVerify(token, signingKey(secret), {
    algorithms: ["HS256"],
    audience: tenantAccountSettingsAudience,
    issuer: decoded.iss,
    currentDate: now,
    clockTolerance: 2,
  });
  const assertion = assertionSchema.parse(verified.payload);
  if (
    assertion.method !== method ||
    assertion.path !== path ||
    assertion.body_sha256 !== digestBody(body)
  ) {
    throw new Error("settings-assertion-request-mismatch");
  }
  return {
    clientId: assertion.iss,
    userId: assertion.sub,
    tenantId: assertion.tenant_id,
    membershipVersion: assertion.membership_version,
    requestId: assertion.jti,
  };
}
