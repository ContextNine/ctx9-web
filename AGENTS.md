# Repository instructions

This package-only repository owns the CTX9 internal-product design system and shared browser identity protocol.

- Read `.docs/style-guide.md`, `.docs/component-inventory.md`, `.docs/error-handling.md`, and `.docs/source-provenance.md` before changing public exports.
- Dark mode only: true black `#000` canvas, white primary text, no theme toggle, light tokens, or `prefers-color-scheme` fork.
- Do not import Impression at runtime or copy product-specific/public-marketing components.
- Non-trivial UI work requires several static mocks and Matt's explicit direction before changing real components.
- Keep `@ctx9/web-auth` framework-neutral. Persistence stays behind injected interfaces; applications keep separate clients, databases, cookies, and authorization policy.
- Never add parent-domain cookies, browser bearer-token storage, callback transaction material in logs, or shared session persistence.
- Consumers pin exact versions. Publish immutable versions only after `pnpm check` and isolated package-install proof pass.
- Run `pnpm check` for every code or package-boundary change.
