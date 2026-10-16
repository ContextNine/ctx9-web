import { oauthProvider } from "@better-auth/oauth-provider";
import { passkey } from "@better-auth/passkey";
import {
  betterAuth,
  type BetterAuthOptions,
  type BetterAuthPlugin,
} from "better-auth";
import { jwt } from "better-auth/plugins";
import type { Pool } from "pg";
import { z } from "zod";

const slug = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/u);
export const identityMembershipSchema = z.object({
  tenant_id: z.uuid(),
  tenant_slug: slug,
  deployment_id: z.uuid(),
  deployment_slug: slug,
  roles: z.array(z.string()),
  capabilities: z.array(z.string()),
  membership_version: z.number().int().positive().max(Number.MAX_SAFE_INTEGER),
  passkey_count: z.number().int().nonnegative(),
  recovery_ready: z.boolean(),
});
export type IdentityMembership = z.infer<typeof identityMembershipSchema>;

export type ResolvePasskeyRegistration = (
  context: "recovery" | "enrollment",
  cookieHeader: string | null,
  csrfToken: string | null,
) => Promise<{ id: string; name: string }>;

export interface IdentityAuthorityOptions {
  database: Pool;
  secret: string;
  origin: string;
  name: string;
  cookieName: `__Host-${string}`;
  clients: readonly { clientId: string; audience: string }[];
  additionalTrustedOrigins?: readonly string[];
  trustedProxies?: string[];
  recoveryCsrfHeader: string;
  enrollmentCsrfHeader: string;
  resolvePasskeyRegistration?: ResolvePasskeyRegistration;
  recordPasskeyAuthentication(credentialId: string): Promise<void>;
  resolveMembership(
    userId: string,
    metadata: Record<string, unknown> | undefined,
  ): Promise<IdentityMembership>;
}

function validateOrigin(value: string): string {
  const parsed = new URL(value);
  const local =
    parsed.protocol === "http:" && parsed.hostname.endsWith(".localhost");
  if (
    (parsed.protocol !== "https:" && !local) ||
    parsed.pathname !== "/" ||
    parsed.search ||
    parsed.hash ||
    parsed.username ||
    parsed.password
  )
    throw new Error("identity-origin-invalid");
  return parsed.origin;
}

function passkeyPlugin(configuration: IdentityAuthorityOptions) {
  const { resolvePasskeyRegistration } = configuration;
  return passkey({
    rpID: new URL(configuration.origin).hostname,
    rpName: configuration.name,
    origin: configuration.origin,
    authenticatorSelection: {
      residentKey: "required",
      userVerification: "required",
    },
    registration: {
      ...(resolvePasskeyRegistration
        ? {
            requireSession: false,
            resolveUser: async ({ ctx, context }) => {
              if (context !== "recovery" && context !== "enrollment")
                throw new Error("passkey-registration-session-required");
              return resolvePasskeyRegistration(
                context,
                ctx.headers?.get("cookie") ?? null,
                ctx.headers?.get(
                  context === "recovery"
                    ? configuration.recoveryCsrfHeader
                    : configuration.enrollmentCsrfHeader,
                ) ?? null,
              );
            },
          }
        : {}),
      afterVerification: async ({ verification, ctx, context, user }) => {
        if (!verification.registrationInfo?.userVerified)
          throw new Error("passkey-user-verification-required");
        if (
          (context === "recovery" || context === "enrollment") &&
          resolvePasskeyRegistration
        ) {
          const recovered = await resolvePasskeyRegistration(
            context,
            ctx.headers?.get("cookie") ?? null,
            ctx.headers?.get(
              context === "recovery"
                ? configuration.recoveryCsrfHeader
                : configuration.enrollmentCsrfHeader,
            ) ?? null,
          );
          if (recovered.id !== user.id)
            throw new Error("passkey-registration-user-mismatch");
        }
      },
    },
    authentication: {
      afterVerification: async ({ verification, clientData }) => {
        if (!verification.authenticationInfo.userVerified)
          throw new Error("passkey-user-verification-required");
        await configuration.recordPasskeyAuthentication(clientData.id);
      },
    },
    schema: {
      passkey: {
        fields: {
          publicKey: "public_key",
          userId: "user_id",
          credentialID: "credential_id",
          deviceType: "device_type",
          backedUp: "backed_up",
          createdAt: "created_at",
        },
      },
    },
  });
}

export function createIdentityAuthority(
  configuration: IdentityAuthorityOptions,
) {
  const { database, secret, trustedProxies = [] } = configuration;
  const origin = validateOrigin(configuration.origin);
  const audiences = configuration.clients.map((client) =>
    validateOrigin(client.audience),
  );
  if (!configuration.cookieName.startsWith("__Host-"))
    throw new Error("identity-cookie-invalid");
  if (!audiences.length || audiences.includes(origin))
    throw new Error("identity-clients-invalid");
  if (Buffer.byteLength(secret, "utf8") < 32)
    throw new Error("auth-signing-key-too-short");
  const options: BetterAuthOptions = {
    database,
    baseURL: origin,
    trustedOrigins: [
      origin,
      ...audiences,
      ...(configuration.additionalTrustedOrigins ?? []).map(validateOrigin),
    ],
    user: {
      fields: {
        emailVerified: "email_verified",
        createdAt: "created_at",
        updatedAt: "updated_at",
      },
    },
    session: {
      expiresIn: 60 * 24 * 60 * 60,
      updateAge: 24 * 60 * 60,
      cookieCache: { enabled: false },
      fields: {
        userId: "user_id",
        expiresAt: "expires_at",
        ipAddress: "ip_address",
        userAgent: "user_agent",
        createdAt: "created_at",
        updatedAt: "updated_at",
      },
    },
    account: {
      fields: {
        userId: "user_id",
        accountId: "account_id",
        providerId: "provider_id",
        accessToken: "access_token",
        refreshToken: "refresh_token",
        idToken: "id_token",
        accessTokenExpiresAt: "access_token_expires_at",
        refreshTokenExpiresAt: "refresh_token_expires_at",
        createdAt: "created_at",
        updatedAt: "updated_at",
      },
    },
    verification: {
      fields: {
        expiresAt: "expires_at",
        createdAt: "created_at",
        updatedAt: "updated_at",
      },
    },
    advanced: {
      useSecureCookies: false,
      defaultCookieAttributes: { secure: true },
      crossSubDomainCookies: { enabled: false },
      cookies: {
        session_token: {
          name: configuration.cookieName,
          attributes: {
            secure: true,
            httpOnly: true,
            sameSite: "lax",
            path: "/",
          },
        },
      },
    },
    plugins: [
      passkeyPlugin({ ...configuration, origin }),
      jwt({
        disableSettingJwtHeader: true,
        jwt: {
          issuer: `${origin}/api/auth`,
          audience: origin,
          expirationTime: "5m",
        },
        jwks: {
          keyPairConfig: { alg: "EdDSA", crv: "Ed25519" },
          rotationInterval: 90 * 24 * 60 * 60,
          gracePeriod: 30 * 24 * 60 * 60,
        },
        schema: {
          jwks: {
            modelName: "jwks",
            fields: {
              publicKey: "public_key",
              privateKey: "private_key",
              createdAt: "created_at",
              expiresAt: "expires_at",
            },
          },
        },
      }),
      // oauth-provider beta ships narrower OpenAPI parameter types than core beta.
      // Runtime and peer versions are pinned equal; cast only package boundary.
      oauthProvider({
        loginPage: "/sign-in",
        consentPage: "/consent",
        scopes: ["openid", "profile", "email", "tenant"],
        resources: audiences,
        resourceSeedMode: "insertOnly",
        enforcePerClientResources: true,
        cachedResources: new Set(audiences),
        cachedTrustedClients: new Set(
          configuration.clients.map((client) => client.clientId),
        ),
        grantTypes: ["authorization_code"],
        codeExpiresIn: 60,
        idTokenExpiresIn: 300,
        allowDynamicClientRegistration: false,
        allowUnauthenticatedClientRegistration: false,
        clientRegistrationDefaultScopes: [
          "openid",
          "profile",
          "email",
          "tenant",
        ],
        storeClientSecret: "hashed",
        storeTokens: "hashed",
        silenceWarnings: { oauthAuthServerConfig: true },
        schema: {
          oauthClient: {
            modelName: "oauth_client",
            fields: {
              clientId: "client_id",
              clientSecret: "client_secret",
              disabled: "disabled",
              skipConsent: "skip_consent",
              enableEndSession: "enable_end_session",
              subjectType: "subject_type",
              scopes: "scopes",
              userId: "user_id",
              createdAt: "created_at",
              updatedAt: "updated_at",
              name: "name",
              uri: "uri",
              icon: "icon",
              contacts: "contacts",
              tos: "tos",
              policy: "policy",
              softwareId: "software_id",
              softwareVersion: "software_version",
              softwareStatement: "software_statement",
              redirectUris: "redirect_uris",
              postLogoutRedirectUris: "post_logout_redirect_uris",
              backchannelLogoutUri: "backchannel_logout_uri",
              backchannelLogoutSessionRequired:
                "backchannel_logout_session_required",
              tokenEndpointAuthMethod: "token_endpoint_auth_method",
              jwks: "jwks",
              jwksUri: "jwks_uri",
              grantTypes: "grant_types",
              responseTypes: "response_types",
              public: "public",
              type: "type",
              requirePKCE: "require_pkce",
              dpopBoundAccessTokens: "dpop_bound_access_tokens",
              referenceId: "reference_id",
              metadata: "metadata",
            },
          },
          oauthResource: {
            modelName: "oauth_resource",
            fields: {
              identifier: "identifier",
              name: "name",
              accessTokenTtl: "access_token_ttl",
              refreshTokenTtl: "refresh_token_ttl",
              signingAlgorithm: "signing_algorithm",
              signingKeyId: "signing_key_id",
              allowedScopes: "allowed_scopes",
              customClaims: "custom_claims",
              dpopBoundAccessTokensRequired:
                "dpop_bound_access_tokens_required",
              disabled: "disabled",
              createdAt: "created_at",
              updatedAt: "updated_at",
              policyVersion: "policy_version",
              metadata: "metadata",
            },
          },
          oauthClientResource: {
            modelName: "oauth_client_resource",
            fields: {
              clientId: "client_id",
              resourceId: "resource_id",
              metadata: "metadata",
              createdAt: "created_at",
            },
          },
          oauthRefreshToken: {
            modelName: "oauth_refresh_token",
            fields: {
              token: "token",
              clientId: "client_id",
              sessionId: "session_id",
              userId: "user_id",
              referenceId: "reference_id",
              authorizationCodeId: "authorization_code_id",
              resources: "resources",
              requestedUserInfoClaims: "requested_user_info_claims",
              expiresAt: "expires_at",
              createdAt: "created_at",
              revoked: "revoked",
              rotatedAt: "rotated_at",
              rotationReplayResponse: "rotation_replay_response",
              rotationReplayExpiresAt: "rotation_replay_expires_at",
              authTime: "auth_time",
              confirmation: "confirmation",
              scopes: "scopes",
            },
          },
          oauthAccessToken: {
            modelName: "oauth_access_token",
            fields: {
              token: "token",
              clientId: "client_id",
              sessionId: "session_id",
              userId: "user_id",
              referenceId: "reference_id",
              authorizationCodeId: "authorization_code_id",
              resources: "resources",
              requestedUserInfoClaims: "requested_user_info_claims",
              refreshId: "refresh_id",
              expiresAt: "expires_at",
              createdAt: "created_at",
              revoked: "revoked",
              confirmation: "confirmation",
              scopes: "scopes",
            },
          },
          oauthConsent: {
            modelName: "oauth_consent",
            fields: {
              clientId: "client_id",
              userId: "user_id",
              referenceId: "reference_id",
              resources: "resources",
              requestedUserInfoClaims: "requested_user_info_claims",
              scopes: "scopes",
              createdAt: "created_at",
              updatedAt: "updated_at",
            },
          },
          oauthClientAssertion: {
            modelName: "oauth_client_assertion",
            fields: { expiresAt: "expires_at" },
          },
        },
        customIdTokenClaims: async ({ user, metadata }) => {
          const selected = identityMembershipSchema.parse(
            await configuration.resolveMembership(user.id, metadata),
          );
          return {
            tenant_id: selected.tenant_id,
            tenant_slug: selected.tenant_slug,
            deployment_id: selected.deployment_id,
            deployment_slug: selected.deployment_slug,
            roles: selected.roles,
            capabilities: selected.capabilities,
            membership_version: selected.membership_version,
            "https://ctx9.com/auth_method": "passkey",
            "https://ctx9.com/identity_assurance": {
              passkey_count: selected.passkey_count,
              recovery_ready: selected.recovery_ready,
            },
          };
        },
      }) as unknown as BetterAuthPlugin,
    ],
    emailAndPassword: { enabled: false },
    rateLimit: {
      enabled: true,
      window: 60,
      max: 20,
      storage: "database",
      modelName: "rate_limit",
      fields: { lastRequest: "last_request" },
    },
    secret,
  };
  options.advanced = {
    ...options.advanced,
    ipAddress: {
      ipAddressHeaders: ["x-forwarded-for"],
      trustedProxies,
    },
  };
  return betterAuth(options);
}
