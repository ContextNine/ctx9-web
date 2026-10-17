# Reusable identity authority architecture decision

Status: accepted architecture decision, recorded October 17, 2026. Public release and installation acceptance are tracked separately below.

## Context and decision

Notenv must run without CTX9's private Platform service. Publishing the relying-party package alone cannot supply passkey verification, an OIDC issuer or account lifecycle. Copying Platform's authority into Notenv would leave two authentication implementations to maintain.

Extract the existing authority into the server-only Apache-2.0 `@ctx9/identity` package in this repository. Platform and Notenv compose that same implementation with their own installation adapters. Keep `@ctx9/web-auth` focused on the relying-party/BFF protocol. Keep Platform provisioning, catalogs, business integrations and installation data in private Platform code.

Use the existing PostgreSQL persistence and SQL mappings rather than introduce a second database abstraction. Each application owns schema migrations, database permissions, client registration records and independent signing custody. The package receives a pool and explicit policy callbacks; it neither connects to CTX9 nor provisions application state. The exported [configuration and claim schema](../packages/identity/src/index.ts) define this boundary.

`@ctx9/identity` contains the existing Better Auth authority extracted from Platform at `a1abd16`. It is a server-only Apache-2.0 package. It provides passkey registration/authentication, confidential OIDC, JWT signing and the established SQL field mappings. It contains no CTX9 database, tenant, client or host selection.

`@ctx9/web-auth` remains the framework-neutral relying-party/BFF protocol package. The authority is separate because it depends on Better Auth and PostgreSQL and runs on the identity origin. Applications retain separate cookies, sessions, databases and authorization policy.

## Application adapter

Call `createIdentityAuthority` with a PostgreSQL pool, independent signing custody, identity origin, display name, host-only cookie name and explicit clients/resources. Applications also provide:

- `resolveMembership` to load current tenant/deployment membership, role capabilities, membership version and passkey/recovery assurance. The result is runtime-validated before becoming signed claims.
- `recordPasskeyAuthentication` to persist the verified credential event. Missing credential records or failed persistence must throw and reject authentication.
- `resolvePasskeyRegistration` to authorize enrollment or recovery sessions using the configured CSRF headers. The authority checks that authorization before registration and after verifying the credential.

The adapter owns first-owner bootstrap, invitations, account recovery, tenant/member administration, current authorization checks and revocation. Those operations must not be supplied as public unauthenticated callbacks. The authority never decides which tenant or capability a user should receive.

Membership callbacks must load authoritative installation state, not accept tenant or capability selection from request metadata. Signed claims include membership version and passkey/recovery assurance. Resource servers still check current membership and revocation; a valid signature alone does not authorize continued access after a role change or recovery. Recovery storage, one-use tickets, CSRF validation, session invalidation and replacement-credential activation remain the adapter's responsibility.

Node applications can import `toNodeHandler` from this package to mount the authority without a separate Better Auth dependency. Each application mounts the authority handler only on its configured identity origin. The application BFF keeps a separate cookie and exact callback on its own origin. Production origins require HTTPS. `.localhost` HTTP is accepted for explicit development use; installation composition must reject insecure production configuration.

The existing `https://ctx9.com/auth_method` and `https://ctx9.com/identity_assurance` claim names are protocol namespaces. They do not contact CTX9. Tenant/deployment IDs and slugs come from installation state rather than fixed CTX9 values.

## Preserved protection

Passkeys require resident credentials and user verification. Identity cookies are Secure, HttpOnly, host-only, SameSite Lax and use a `__Host-` name. Cross-subdomain cookies and browser bearer-token storage remain disabled. Sessions and rate limits use the installation database. OAuth registration is closed, client resources are explicit, secrets/tokens are hashed, authorization codes last 60 seconds and identity tokens last five minutes.

The Better Auth beta core, OAuth and passkey packages are pinned together at `1.7.0-beta.10`. The package also pins their matching core/fetch/call peer closure. An isolated npm consumer exposed a resolver loop that selected the later stable core alongside beta plugins; direct matching dependencies resolve it. Do not replace these pins with consumer overrides or `--legacy-peer-deps`.

## Consequences and alternatives

Both compositions receive authority fixes through exact immutable package versions. Preserving SQL mappings and protocol claim names avoids an authentication-data migration solely for extraction. It does not prove an existing deployment's accounts or sessions survived an upgrade; managed rollout must verify that separately. Installation adapters continue to own their migrations and must keep their database contract compatible with the selected authority version.

Requiring private Platform would prevent independent installation. A copied Notenv authority would duplicate security fixes. A separate password-based self-host engine would change enrollment, assurance and recovery policy. All three alternatives are rejected. A generic persistence plugin system is unnecessary for the supported PostgreSQL installations.

The package's injected callbacks are security-sensitive application code. Package checks cannot prove an adapter's membership, enrollment or recovery policy. The shared Better Auth dependency line also needs coordinated upgrades and integration checks across both compositions.

## Acceptance

Package typechecking, linting, compilation, license provenance and archive checks pass. A clean anonymous npm consumer installs the archive, typechecks and loads the authority alongside UI and relying-party packages after the peer-closure correction. This proves distribution and module loading only. Independent owner enrollment, browser authentication, recovery, tenant isolation and installed broker execution require the Notenv self-host integration journeys before self-hosting is accepted. Managed Platform adapter acceptance is also separate.
