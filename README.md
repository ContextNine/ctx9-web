# CTX9 web

Shared UI components and server-side browser authentication for Notenv and CTX9 applications. Source is licensed under Apache-2.0; bundled fonts and adapted third-party code retain their accompanying licenses.

- `@ctx9/ui` owns Impression-aligned light/dark tokens, typed components, and shared style enforcement for internal products.
- `@ctx9/web-auth` owns framework-neutral confidential OIDC BFF protocol behavior.

This repository publishes packages only. It is not a deployable service, Kubernetes workload, identity authority, session database, or shared browser application.

```bash
corepack enable
pnpm install --frozen-lockfile
pnpm check
```

Consumers pin exact package versions from public npm. Every application retains its own identity issuer, client, database adapter, audience, host-only cookie, session persistence, and capability policy. The authentication package implements the relying-party protocol; it does not include an identity server.

Release, CI consumption, upgrade, and rollback are documented in [`docs/package-release.md`](docs/package-release.md).
