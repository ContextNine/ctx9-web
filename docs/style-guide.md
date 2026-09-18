# CTX9 internal product style guide

Status: Operational Dense with the Split Editor selected for v4.

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
- Authentication uses the shared two-column `AuthShell` on desktop and one focused column on mobile. Authenticated products use `ApplicationLayout`, with product switching and product-local navigation in the collapsible left sidebar.
- Prefer section boundaries and aligned rows over card grids. A bordered panel exists only when content needs a distinct interaction or security boundary.

## Controls

- Standard height is 36px; compact height is 32px.
- Labels remain visible. Placeholder text does not replace a label.
- Focus uses a high-contrast neutral ring and never relies on color alone.
- Destructive actions are visually restrained until the confirmation boundary.
- Recovery material, secrets metadata, and artifact identifiers use the mono face and selectable wrapping.
- Standard actions use `Button`. Its `loading` state keeps the same text dimensions and never adds a spinner.
- Navigational rows are one full-width link with pointer, hover, and focus states. Do not add a second title link, chevron, or generic Open button inside the row.

The runtime variables, shadcn controls, typed data table, feedback states, Auth composition, sidebar, account menu, and responsive layout live in `@ctx9/ui`. Next applications inject their link implementation through `NavigationProvider`, so internal navigation uses the Next router without adding a Next dependency to the package.

## Sidebar and account menu

- Desktop navigation is a fixed 246px left sidebar. The CTX9 grid mark and name open All apps in the fixed Agents, Secrets, Publisher, Testimonials order; product-local links sit below it without icons. Platform is a headless control plane, not an app destination.
- Mobile navigation is an off-canvas drawer with an explicit open button, close button, backdrop, Escape handling, and focus-visible controls.
- The footer trigger uses a 40px round avatar, current tenant, and user name. Its menu is 270px wide and follows Impression's space/brand switcher hierarchy.
- The account menu contains current and switchable tenants, an optional product-settings action, Tenant and account settings, and Sign out. Do not add product settings until the product has a real settings page.
- Tenant and account settings opens in the current app. Its near-full-viewport dialog uses a left tab rail for Tenant, Access, capability-backed Provisioning, and Account security. The dialog uses one 300ms opacity and scale transition and disables scale motion for reduced-motion users.
- Route and tab changes keep the shell and useful cached content mounted. Never replace a page with visible loading copy, a spinner, or an animated placeholder.
