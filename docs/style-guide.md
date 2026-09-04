# CTX9 internal product style guide

Status: Impression-style sidebar direction selected for v2.

## Scope

This guide is canonical for CTX9-owned internal applications: Platform, Auth, enrollment, recovery, tenant administration, Secrets, Artifacts, Incidents, Releases, and Backups. It does not govern the public `ctx9.com` site, Impression marketing pages, GitLab, or Grafana.

## Standing visual contract

- Dark mode only with `color-scheme: dark`.
- True black `#000` page canvas and white primary text.
- Information-dense layouts with deliberate whitespace, not decorative nested cards.
- Minimal copy. No eyebrows, all-caps interface labels, light-gray subtitle rails, or em dashes.
- Thin neutral borders define structure. Surfaces remain close to black.
- Blue is not a general interface accent. Links, focus, selection, and primary actions use neutral white and mono treatments. Semantic green, amber, and red communicate real state.
- Controls expose visible hover, focus, selected, disabled, loading, empty, warning, success, and error states.
- Motion is discrete and functional. No pulse, shimmer, blur, spinner, animated gradient, stars, or continuously repainting decoration.
- Geist Sans is the interface face. JetBrains Mono is for hashes, identifiers, recovery material, code, and audit references. Both are self-hosted before v1 publication.

## Layout

- Product content uses a compact top bar and a readable maximum width where the task permits it.
- Dense tables may scroll horizontally; ordinary pages must not.
- Pages remain vertically scrollable. A dialog scrolls internally only when taller than the viewport.
- Authentication uses the shared two-column `AuthShell` on desktop and one focused column on mobile. Authenticated products use `AppShell`, with product switching and product-local navigation in the left sidebar.
- Prefer section boundaries and aligned rows over card grids. A bordered panel exists only when content needs a distinct interaction or security boundary.

## Controls

- Standard height is 36px; compact height is 32px.
- Labels remain visible. Placeholder text does not replace a label.
- Focus uses a high-contrast neutral ring and never relies on color alone.
- Destructive actions are visually restrained until the confirmation boundary.
- Recovery material, secrets metadata, and artifact identifiers use the mono face and selectable wrapping.
- Standard actions use `FunkyLoaderButton`: black background, white text, a restrained Impression-derived hover treatment, and stable loading copy. `Button` owns the same black/white primary contract for link-like and non-loading compositions.
- Navigational rows are one full-width link with pointer, hover, and focus states. Do not add a second title link, chevron, or generic Open button inside the row.

The runtime variables, base contracts, controls, feedback states, Auth composition, sidebar, account menu, and responsive shell live in `@ctx9/ui`. Product applications compose these primitives without maintaining local replacements.

## Sidebar and account menu

- Desktop navigation is a fixed 246px left sidebar. The CTX9 grid mark and name open the service switcher; product-local links sit below it without icons.
- Mobile navigation is an off-canvas drawer with an explicit open button, close button, backdrop, Escape handling, and focus-visible controls.
- The footer trigger uses a 40px round avatar, current tenant, and user name. Its menu is 270px wide and follows Impression's space/brand switcher hierarchy.
- The account menu contains current/switchable tenants, Account security, capability-backed tenant administration, Create tenant for Cluster Administrators, and Sign out. Do not add dead menu items.
