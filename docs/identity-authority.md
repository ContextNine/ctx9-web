# Reusable identity authority

`@ctx9/identity` contains the existing Better Auth authority extracted from Platform at `a1abd16`. It is a server-only Apache-2.0 package. It provides passkey registration/authentication, confidential OIDC, JWT signing and the established SQL field mappings. It contains no CTX9 database, tenant, client or host selection.

`@ctx9/web-auth` remains the framework-neutral relying-party/BFF protocol package. The authority is separate because it depends on Better Auth and PostgreSQL and runs on the identity origin. Applications retain separate cookies, sessions, databases and authorization policy.

## Application adapter

Call `createIdentityAuthority` with a PostgreSQL pool, independent signing custody, identity origin, display name, host-only cookie name and explicit clients/resources. Applications also provide:

- `resolveMembership` to load current tenant/deployment membership, role capabilities, membership version and passkey/recovery assurance. The result is runtime-validated before becoming signed claims.
- `recordPasskeyAuthentication` to persist the verified credential event. Missing credential records or failed persistence must throw and reject authentication.
- `resolvePasskeyRegistration` to authorize enrollment or recovery sessions using the configured CSRF headers. The authority checks that authorization before registration and after verifying the credential.

The adapter owns first-owner bootstrap, invitations, account recovery, tenant/member administration, current authorization checks and revocation. Those operations must not be supplied as public unauthenticated callbacks. The authority never decides which tenant or capability a user should receive.

Each application mounts the authority handler only on its configured identity origin. The application BFF keeps a separate cookie and exact callback on its own origin. Production origins require HTTPS. `.localhost` HTTP is accepted for explicit development use; installation composition must reject insecure production configuration.

The existing `https://ctx9.com/auth_method` and `https://ctx9.com/identity_assurance` claim names are protocol namespaces. They do not contact CTX9. Tenant/deployment IDs and slugs come from installation state rather than fixed CTX9 values.

## Preserved protection

Passkeys require resident credentials and user verification. Identity cookies are Secure, HttpOnly, host-only, SameSite Lax and use a `__Host-` name. Cross-subdomain cookies and browser bearer-token storage remain disabled. Sessions and rate limits use the installation database. OAuth registration is closed, client resources are explicit, secrets/tokens are hashed, authorization codes last 60 seconds and identity tokens last five minutes.

The Better Auth beta core, OAuth and passkey packages are pinned together at `1.7.0-beta.10`. The package also pins their matching core/fetch/call peer closure. An isolated npm consumer exposed a resolver loop that selected the later stable core alongside beta plugins; direct matching dependencies resolve it. Do not replace these pins with consumer overrides or `--legacy-peer-deps`.

## Acceptance

Package typechecking, linting, compilation, license provenance and archive checks pass. A clean anonymous npm consumer installs the archive, typechecks and loads the authority alongside UI and relying-party packages after the peer-closure correction. This proves distribution and module loading only. Independent owner enrollment, browser authentication, recovery, tenant isolation and installed broker execution require the Notenv self-host integration journeys before self-hosting is accepted. Managed Platform adapter acceptance is also separate.
