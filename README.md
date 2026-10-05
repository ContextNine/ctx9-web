# CTX9 web

Private shared web architecture for CTX9 internal products.

- `@ctx9/ui` owns Impression-aligned light/dark tokens, typed components, and shared style enforcement for internal products.
- `@ctx9/web-auth` owns framework-neutral confidential OIDC BFF protocol behavior.

This repository publishes packages only. It is not a deployable service, Kubernetes workload, identity authority, session database, or shared browser application.

```bash
corepack enable
pnpm install --frozen-lockfile
pnpm check
```

Consumers pin exact package versions. Better Auth remains the sole authority at `auth.ctx9.com`; every consumer retains its own client, database adapter, audience, host-only cookie, session persistence, and capability policy.

Release, CI consumption, upgrade, and rollback are documented in [`docs/package-release.md`](docs/package-release.md).
