# CTX9 internal product style guide

Status: Workbench direction selected and implemented for v1.

## Scope

This guide is canonical for CTX9-owned internal applications: Platform, Auth, enrollment, recovery, tenant administration, Secrets, Artifacts, Incidents, Releases, and Backups. It does not govern the public `ctx9.com` site, Impression marketing pages, GitLab, or Grafana.

## Standing visual contract

- Dark mode only with `color-scheme: dark`.
- True black `#000` page canvas and white primary text.
- Information-dense layouts with deliberate whitespace, not decorative nested cards.
- Minimal copy. No eyebrows, all-caps interface labels, light-gray subtitle rails, or em dashes.
- Thin neutral borders define structure. Surfaces remain close to black.
- Blue is reserved for links, focus, and selected state. Semantic green, amber, and red communicate status.
- Controls expose visible hover, focus, selected, disabled, loading, empty, warning, success, and error states.
- Motion is discrete and functional. No pulse, shimmer, blur, spinner, animated gradient, stars, or continuously repainting decoration.
- Geist Sans is the interface face. JetBrains Mono is for hashes, identifiers, recovery material, code, and audit references. Both are self-hosted before v1 publication.

## Layout

- Product content uses a compact top bar and a readable maximum width where the task permits it.
- Dense tables may scroll horizontally; ordinary pages must not.
- Pages remain vertically scrollable. A dialog scrolls internally only when taller than the viewport.
- Authentication uses a narrow focused shell. Operational applications use a consistent global shell and tenant context.
- Prefer section boundaries and aligned rows over card grids. A bordered panel exists only when content needs a distinct interaction or security boundary.

## Controls

- Standard height is 36px; compact height is 32px.
- Labels remain visible. Placeholder text does not replace a label.
- Focus uses a high-contrast blue ring and never relies on color alone.
- Destructive actions are visually restrained until the confirmation boundary.
- Recovery material, secrets metadata, and artifact identifiers use the mono face and selectable wrapping.

The runtime variables, base contracts, controls, feedback states, and Workbench shells live in `@ctx9/ui`. Product applications compose these primitives without maintaining local replacements.
