# Error handling

Applications translate domain and transport failures into a shared descriptor:

```ts
type ErrorDescriptor = {
  title: string;
  message: string;
  reference?: string;
  retry?: { label: string; action: () => void };
};
```

- Router-level failures use the shared ErrorPage.
- Query and mutation failures use the nearest useful inline boundary.
- Authentication failures distinguish session expiry, denied access, unavailable authority, callback protocol failure, and protected-session requirement.
- Product copy is concise and does not expose stack traces, tokens, callback parameters, protected bodies, or internal database errors.
- OAuth logs may contain a whitelisted error identifier and bounded sanitized description. They never contain code, state, nonce, cookie, verifier, full callback URL, or token response.
- Every error response and page includes a stable safe reference when operators need correlation.
