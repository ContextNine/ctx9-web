# @ctx9/identity

Passkey-only Better Auth authority and confidential OIDC provider, extracted from the existing CTX9 authority. Applications supply their database, origins, clients, enrollment/recovery authorization, passkey event persistence and current membership resolution.

The authority keeps exact origins, host-only Secure cookies, user-verifying resident passkeys, database rate limits, hashed OAuth credentials, short-lived codes and explicit client resources. It does not implement application signup, tenant administration, account recovery storage or platform provisioning. Those belong to the installation adapter.

Use `createIdentityAuthority(configuration)` on the server. Route its handler only on the configured identity origin. `resolveMembership` must read current authoritative membership and recovery state; `recordPasskeyAuthentication` must persist the verified credential event or reject authentication. `resolvePasskeyRegistration` authorizes the narrowly scoped enrollment or recovery session before and after registration.

Code is Apache-2.0. The authority preserves the existing `https://ctx9.com/` claim namespaces as protocol identifiers; they do not contact CTX9 services. No CTX9 host, database, tenant or credentials are built into this package.
