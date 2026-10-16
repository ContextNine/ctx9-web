# @ctx9/web-auth

Framework-neutral server-side protocol for CTX9 confidential OIDC browser clients. Applications inject transaction/session persistence and keep their own client ID, secret, audience, redirect, cookie, tables, and authorization policy.

Licensed under Apache-2.0, published on public npm. Source and release acceptance are at [ContextNine/ctx9-web](https://github.com/ContextNine/ctx9-web). This is a relying-party package, not an identity authority or account-management service.

Never bundle this package into browser code or expose its transaction/token results to browser storage.

The package also signs and verifies 30-second tenant/account settings assertions for same-origin product BFFs. Each assertion binds one user, current tenant membership version, and exact internal method, path, and body digest. Product servers create assertions with their existing OIDC client secret; Platform verifies them against its bootstrap copy and rechecks every membership and capability from canonical state. Browsers never receive these assertions.

`requestTenantAccountSettings` serializes, signs, and sends that request without returning the assertion to browser code. It returns untrusted JSON for the product BFF to parse against its response contract.

Public server entry points:

- `@ctx9/web-auth` for the injected OIDC protocol;
- `@ctx9/web-auth/tanstack-start` for standard Request/Response server functions;
- `@ctx9/web-auth/node` for Node HTTP;
- `@ctx9/web-auth/express` for a dependency-free structural Express adapter.
