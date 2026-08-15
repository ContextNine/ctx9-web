# @ctx9/web-auth

Framework-neutral server-side protocol for CTX9 confidential OIDC browser clients. Applications inject transaction/session persistence and keep their own client ID, secret, audience, redirect, cookie, tables, and authorization policy.

Never bundle this package into browser code or expose its transaction/token results to browser storage.

Public server entry points:

- `@ctx9/web-auth` for the injected OIDC protocol;
- `@ctx9/web-auth/tanstack-start` for standard Request/Response server functions;
- `@ctx9/web-auth/node` for Node HTTP;
- `@ctx9/web-auth/express` for a dependency-free structural Express adapter.
