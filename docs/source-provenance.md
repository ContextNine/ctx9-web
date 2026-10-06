# Source provenance

Reference repository: Impression

Implementation authority: Impression `master` at `ccc4fd09d4f3f5eee0adb501f145c4ceb5d51e41` for the v8 migration baseline. Each later package release records the exact source commit used.

Structural sidebar reference: shadcn/ui `dashboard-01` at `b9938d94635fca7a4560449713b0b1ba87d77bc6` (MIT).

The pre-v8 package used a shadcn `base-nova` snapshot and CTX9-only dark adaptations. Version 8 replaces that component contract with Impression's internal application components and Tailwind 3 implementation.

`@ctx9/ui` never imports Impression at build or runtime. Source moves are reviewed and recorded against the exact Impression commit, then owned and released from this repository.

The shared `Ctx9Mark` is the original six-cell vector served by `ctx9.com/tenants/ctx9/icons/favicon.svg`. The package embeds the mark so internal products make no runtime request to the public site.
Its five neutral cells inherit the shared foreground for light/dark contrast;
the existing yellow accent cell and vector geometry stay unchanged. The
published favicon asset remains the original vector.

| CTX9 surface                           | Impression reference                                                                                                      | Classification | Notes                                                                                                                                        |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- | -------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| light, dark, mono, and semantic tokens | `tooling/tailwind/colors.css`                                                                                             | aligned        | Internal light and dark tokens retained; public marketing-only tokens remain outside this package                                            |
| reusable layout/control recipes        | `apps/next/src/components/styles/common.tsx`                                                                              | aligned        | Product and social recipes remain in Impression; reusable internal recipes move with their components                                        |
| class merging                          | generic `cn` usage across UI                                                                                              | rewritten      | Small typed `clsx` plus `tailwind-merge` utility                                                                                             |
| input/label/textarea direction         | `apps/next/src/components/aceternity/input.tsx`, `label.tsx`, `text-area.tsx`                                             | adapted        | Existing glow and field behavior retained through component-owned effects and shape variants                                                 |
| buttons and control variants           | `apps/next/src/components/ui/button.tsx`, `components/aceternity/input.tsx`, `components/aceternity/text-area.tsx`        | aligned        | Typed internal variants and light/dark behavior retained; public and product-specific effects excluded                                       |
| checkbox                               | `apps/next/src/components/ui/checkbox.tsx`                                                                                | adapted        | Radix behavior retained through a direct dependency                                                                                          |
| dialogs and form system                | `apps/next/src/components/ui/dialog.tsx`, `alert-dialog.tsx`, `form.tsx`                                                  | adapted        | Next-specific imports removed; accessibility relationships retained                                                                          |
| date/time controls                     | Impression calendar/date/time component family identified by style guide                                                  | rewritten      | Product-neutral calendar, time, timezone, date-time, and range compositions                                                                  |
| errors                                 | Impression public and internal error patterns                                                                             | rewritten      | Public marketing shell excluded; compact operational states added                                                                            |
| overlays and command                   | Impression Radix and command-menu component family                                                                        | aligned        | Popover, tooltip, dropdown, and command variants retain shared internal light/dark behavior                                                  |
| data display                           | Impression tabs, table, scroll, badge, card, and separator component family                                               | aligned        | Typed appearance and spacing variants move into the package                                                                                  |
| application shells                     | Impression `sidebar.tsx`, `brand-switch-dropdown.tsx`, `common.tsx`; shadcn `dashboard-01` sidebar and nav-user structure | adapted        | Shared responsive CTX9 sidebar, tenant/account footer menu, Auth shell, keyboard toggle, and mobile drawer                                   |
| tenant and account settings            | Impression `apps/next/src/components/settings/settings-dialog.tsx`                                                        | adapted        | Near-full-viewport dialog, left tab rail, and discrete opacity/scale motion; CTX9 tokens and product-neutral tabs replace Impression content |
| retained CTX9 compositions             | Current `@ctx9/ui` application navigation, settings, date/time, and error components                                      | retained       | Retained only where active consumers need them; styling is rewritten against the shared Impression contract                                  |

The MultipleSelector port uses Impression `06967d08d`, `apps/next/src/components/ui/multiple-selector.tsx`. Its selection/search behavior and existing option normalization are retained. The linked-account height and shared pill background become typed variants; remove/clear actions are private appearance-owned buttons. Nested input and command appearance overrides are not part of the new contract. Impression's call sites remain unmigrated until visual verification.

The Button comparison uses Impression `01dd4e76d`, `apps/next/src/components/ui/button.tsx`. Its existing `typography="tiny"` variant stays at 11px. Changing it to `text-xs` would alter live outreach actions, so the migration preserves that existing size rather than applying a design change.

The interaction comparison also preserves Impression's `focus:dark:` and `hover:dark:` modifier order and onboarding dark-mode important flags. Normalizing those strings changed focus/hover colors when combined with the retained host stylesheet. The shared recipes keep the source class contracts unchanged.

Auth fields retain Impression's separate default-height and auto-height recipes,
including the inactive `dark:placeholder-text-mono-600` token and existing
`focus-visible:ring-[1px]` utility. Combining the height recipes or repairing the
placeholder token would restyle existing auth fields rather than extract them.

Checkbox recipes match Impression's current `a0ff86dae` source in
`apps/next/src/components/styles/common.tsx`. The browser comparison caught
missing indeterminate black/white colors and unchecked, checked, and
indeterminate hover rules in the draft. These source recipes are restored,
including the existing `/12` hover token, without normalizing their meaning.

The animated action port uses Impression `dce669e84`,
`apps/next/src/components/buttons/funky-loader-button.tsx` and
`components/aceternity/bottom-gradient.tsx`. It keeps the existing loader icon,
gradient colors, hover treatment, and link/disabled composition. Only the typed
gradient choices are retained; arbitrary gradient class overrides are not part
of the shared contract. This port is
unpublished and does not accept consumer appearance parity by itself.

The animated action comparison also caught a draft auth recipe mismatch. Auth
buttons retain Impression's `common-public.tsx` recipe, including its 40px
height, `border-input`, and shadow treatment. The earlier generic 36px auth
adaptation was not appearance-equivalent.

Checkbox and Switch now reject consumer `className` and `style` props in their
types and ignore those overrides at runtime. All 49 existing Impression usages
across 24 source files already follow that contract. The archived port passes
298 browser comparisons with no pixel or computed-style differences. The
stricter implementation also preserves the DOM across all 23 control cases,
apart from attribute and class ordering. Full Impression typechecking passes
against both the installed archive and the stricter compiled declarations.
Complete migrated-page acceptance remains separate.

## Font provenance

The package vendors normal variable fonts for standalone consumers. They are emitted inside `@ctx9/ui`; production makes no third-party font request. Font utilities first consume the host's `--font-geist-sans` and `--font-inter` bindings, preserving Impression's existing font selection when the stylesheets are combined. Standalone applications use the package's self-hosted defaults.

| File                        | Upstream package                                                                                          | License                                                              | SHA-256                                                            |
| --------------------------- | --------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- | ------------------------------------------------------------------ |
| `geist-sans-variable.woff2` | `geist@1.5.1`, `dist/fonts/geist-sans/Geist-Variable.woff2`, matching Impression's lockfile               | SIL Open Font License, copied as `dist/fonts/licenses/geist-ofl.txt` | `46525b05bbf4527d263f8624ca7024c7d0dce3c64430267d30c31c6dd3821e4d` |
| `inter-normal-variable.ttf` | Impression `35c1d4f85f1b637b363b5c245c4dbd5b17539fd9`, `apps/next/public/fonts/inter/normal-variable.ttf` | SIL Open Font License, copied as `dist/fonts/licenses/inter-ofl.txt` | `29160a80ff49ddcab2c97711247e08b1fab27a484a329ce8b813d820dc559031` |

The implementation is reviewed against this mapping before publication. Runtime dependency licenses are enforced by `scripts/check-provenance.ts`.

The standalone v8 foundation includes Tailwind 3 Preflight and Impression's
semantic base border color. CTX9 compositions own their primary action effect
through `funkyStable`; Impression's Button recipes and defaults remain unchanged.
The direct AlertDialog, DropdownMenu and Popover dependencies now use the
versions already included by Impression's `radix-ui@1.4.3`. This removes the
mixed old wrapper/new primitive graph without introducing a new version line.

The Publisher pilot adds semantic Badge success/warning choices and a metadata
Sheet variant with bordered header/footer choices. These are active consumer
compositions using the shared tokens, not compatibility exports. Existing
Impression Badge and Sheet defaults are unchanged.

The Secret Bindings pilot adds generic code-field and transparent overlay
Textarea presets, semantic InlineStatus tones, and a compact notice Popover.
These consume the shared theme tokens. The product still owns syntax
highlighting, gutter geometry, protected-data handling and autosave. Existing
Impression field, feedback and Popover defaults are unchanged.

The pre-v8 Toaster's static loading-dot override was introduced under the
retired no-spinner guide. Removing that override restores Sonner's native
animated loader, also used by Impression's current Toaster. Other toast
appearance and theme adoption still need their own Impression comparisons.

The Tabs presets extract the active Impression `8b501f147` recipes from space
settings, campaign navigation, the admin sidebar and compact inspiration tabs.
Existing Tabs defaults and keyboard behavior remain unchanged. The compact
trigger retains the source's 11px typography; changing it to 12px would restyle
the existing control. Consumer migration still requires browser comparison.

The CSS compiler is aligned to Impression `25e5df778`: PostCSS 8.5.18 and
Autoprefixer 10.4.22, with its resolved Browserslist and browser-data versions.
The explicit browser targets match Next 15's modern-browser defaults. The
shared build does not import Next. Its default and color transition lists keep
Impression's emitted WebKit aliases in the same order, preserving the existing
computed properties when both stylesheets are loaded.
