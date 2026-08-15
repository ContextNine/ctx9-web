# CTX9 web

Private shared web architecture for CTX9 internal products.

- `@ctx9/ui` owns dark-only product tokens, recipes, primitives, and error presentation.
- `@ctx9/web-auth` owns framework-neutral confidential OIDC BFF protocol behavior.

This repository publishes packages only. It is not a deployable service, Kubernetes workload, identity authority, session database, or shared browser application.

```bash
corepack enable
pnpm install --frozen-lockfile
pnpm check
```

Consumers pin exact package versions. Better Auth remains the sole authority at `auth.ctx9.com`; every consumer retains its own client, database adapter, audience, host-only cookie, session persistence, and capability policy.
