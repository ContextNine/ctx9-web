# Source provenance

Reference repository: Impression

Implementation authority: Impression `master` at `ccc4fd09d4f3f5eee0adb501f145c4ceb5d51e41` for the v8 migration baseline. Each later package release records the exact source commit used.

Structural sidebar reference: shadcn/ui `dashboard-01` at `b9938d94635fca7a4560449713b0b1ba87d77bc6` (MIT).

The pre-v8 package used a shadcn `base-nova` snapshot and CTX9-only dark adaptations. Version 8 replaces that component contract with Impression's internal application components and Tailwind 3 implementation.

`@ctx9/ui` never imports Impression at build or runtime. Source moves are reviewed and recorded against the exact Impression commit, then owned and released from this repository.

The shared `Ctx9Mark` is the original six-cell vector served by `ctx9.com/tenants/ctx9/icons/favicon.svg`. The package embeds the mark so internal products make no runtime request to the public site.

| CTX9 surface                           | Impression reference                                                                                                      | Classification | Notes                                                                                                                                        |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- | -------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| light, dark, mono, and semantic tokens | `tooling/tailwind/colors.css`                                                                                             | aligned        | Internal light and dark tokens retained; public marketing-only tokens remain outside this package                                            |
| reusable layout/control recipes        | `apps/next/src/components/styles/common.tsx`                                                                              | aligned        | Product and social recipes remain in Impression; reusable internal recipes move with their components                                        |
| class merging                          | generic `cn` usage across UI                                                                                              | rewritten      | Small typed `clsx` plus `tailwind-merge` utility                                                                                             |
| input/label/textarea direction         | `apps/next/src/components/aceternity/input.tsx`, `label.tsx`, `text-area.tsx`                                             | adapted        | Decorative gradients and animation excluded; shared shape tokens used                                                                        |
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

## Font provenance

The package vendors normal variable fonts for standalone consumers. They are emitted inside `@ctx9/ui`; production makes no third-party font request. Font utilities first consume the host's `--font-geist-sans` and `--font-inter` bindings, preserving Impression's existing font selection when the stylesheets are combined. Standalone applications use the package's self-hosted defaults.

| File                        | Upstream package                                                                                          | License                                                              | SHA-256                                                            |
| --------------------------- | --------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- | ------------------------------------------------------------------ |
| `geist-sans-variable.woff2` | `geist@1.5.1`, `dist/fonts/geist-sans/Geist-Variable.woff2`, matching Impression's lockfile               | SIL Open Font License, copied as `dist/fonts/licenses/geist-ofl.txt` | `46525b05bbf4527d263f8624ca7024c7d0dce3c64430267d30c31c6dd3821e4d` |
| `inter-normal-variable.ttf` | Impression `35c1d4f85f1b637b363b5c245c4dbd5b17539fd9`, `apps/next/public/fonts/inter/normal-variable.ttf` | SIL Open Font License, copied as `dist/fonts/licenses/inter-ofl.txt` | `29160a80ff49ddcab2c97711247e08b1fab27a484a329ce8b813d820dc559031` |

The implementation is reviewed against this mapping before publication. Runtime dependency licenses are enforced by `scripts/check-provenance.ts`.
