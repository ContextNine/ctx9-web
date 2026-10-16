# Repository instructions

This package-only repository owns the Notenv and CTX9 application design system and shared browser identity protocol. Shared packages are Apache-2.0 and new releases target public npm; publication readiness and source visibility are recorded in `docs/public-distribution.md`.

`@ctx9/identity` reuses the Better Auth authority with application-owned PostgreSQL, enrollment/recovery authorization, credential-event persistence and membership resolution. Keep private Platform provisioning and installation data in its adapter. Read `docs/identity-authority.md` before changing that boundary.

- Always work on master unless instructed not to.
- Read `docs/style-guide.md`, `docs/component-inventory.md`, `docs/error-handling.md`, `docs/source-provenance.md`, and `docs/package-release.md` before changing public exports.
- Shared internal UI uses Impression's semantic light and dark themes. CTX9 applications may default to dark, but they do not own a separate CTX9 theme.
- Impression internal components and style policy are the canonical source for `@ctx9/ui`. Never import Impression at runtime or copy Impression public-marketing and product-specific components.
- Non-trivial UI work requires Matt's explicit direction before changing real components. The phase 3 shared UI consolidation plan is that direction for the Impression-aligned replacement.
- Keep `@ctx9/web-auth` framework-neutral. Persistence stays behind injected interfaces; applications keep separate clients, databases, cookies, and authorization policy.
- Never add parent-domain cookies, browser bearer-token storage, callback transaction material in logs, or shared session persistence.
- Consumers pin exact versions. Publish immutable versions only after `pnpm check` and isolated package-install proof pass.
- Keep package LICENSE, NOTICE, adapted-code notices and bundled font licenses in the real archives. Publish through the single protected GitHub npm workflow; GitLab mirrors and checks source but does not publish new SDK versions.
- Run `pnpm check` for every code or package-boundary change.
- Repository-specific documentation lives in `docs/`. Update it with design-system, identity protocol, package, release, or verification changes and keep `docs/README.md` current.
