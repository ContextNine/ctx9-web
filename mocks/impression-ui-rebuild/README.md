# CTX9 Impression-style rebuild mock

Static synthetic approval mock for Phase 1 of the workspace plan at
`../.agents/plans/ctx9-impression-ui-rebuild/implementation-plan.md` from the
`web` repository root.

It deliberately does not import or modify production `@ctx9/ui` components.
All identities, repositories, environment values, and publications are synthetic.

From the `web` repository root:

```bash
python3 -m http.server 4173 --bind 127.0.0.1
```

Then open `http://127.0.0.1:4173/mocks/impression-ui-rebuild/`.

The top mock controls switch pages, density, role, and narrow-screen preview.
