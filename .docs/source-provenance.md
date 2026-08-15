# Source provenance

Reference repository: Impression

Pinned reference commit: `24f2833abf7a24e7ada6b2f516a599cae8fcc50b`

CTX9 never imports Impression at build or runtime. Reference files are reviewed at the pinned commit and CTX9 code is classified below.

| CTX9 surface                    | Impression reference                                                                | Classification | Notes                                                                                          |
| ------------------------------- | ----------------------------------------------------------------------------------- | -------------- | ---------------------------------------------------------------------------------------------- |
| dark mono and semantic tokens   | `tooling/tailwind/colors.css`                                                       | adapted        | Light roots, theme selectors, warm marketing neutrals, and media-query theme detection removed |
| reusable layout/control recipes | `apps/next/src/components/styles/common.tsx`                                        | rewritten      | Product/social recipes and light variants excluded; plain CTX9 names                           |
| class merging                   | generic `cn` usage across UI                                                        | rewritten      | Small typed `clsx` plus `tailwind-merge` utility                                               |
| input/label/textarea direction  | `apps/next/src/components/aceternity/input.tsx`, `label.tsx`, `text-area.tsx`       | adapted        | Decorative gradients and animation excluded; shared shape tokens used                          |
| buttons and control variants    | `apps/next/src/components/ui/button.tsx`, `control-variants.ts`, `control-shape.ts` | adapted        | Dark-only compact internal-product variants with loading and selected states                   |
| checkbox                        | `apps/next/src/components/ui/checkbox.tsx`                                          | adapted        | Radix behavior retained through a direct dependency                                            |
| dialogs and form system         | `apps/next/src/components/ui/dialog.tsx`, `alert-dialog.tsx`, `form.tsx`            | adapted        | Next-specific imports removed; accessibility relationships retained                            |
| date/time controls              | Impression calendar/date/time component family identified by style guide            | rewritten      | Product-neutral calendar, time, timezone, date-time, and range compositions                    |
| errors                          | Impression public and internal error patterns                                       | rewritten      | Public marketing shell excluded; compact operational states added                              |
| overlays and command            | Impression Radix and command-menu component family                                  | adapted        | Popover, tooltip, dropdown, and command surfaces use opaque black operational styling          |
| data display                    | Impression tabs, table, scroll, badge, and separator component family               | rewritten      | Horizontal Workbench navigation and dense table/row behavior                                   |
| application shells              | Impression internal application layout patterns                                     | rewritten      | Product-neutral focused and operational Workbench shells                                       |

## Font provenance

Only the normal variable files needed by the dark internal product are vendored. They are emitted inside `@ctx9/ui`; production makes no third-party font request.

| File                                  | Upstream package                                                          | License                                                                       | SHA-256                                                            |
| ------------------------------------- | ------------------------------------------------------------------------- | ----------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| `geist-sans-variable.woff2`           | `geist@1.7.2`, `dist/fonts/geist-sans/Geist-Variable.woff2`               | SIL Open Font License, copied as `dist/fonts/licenses/geist-ofl.txt`          | `a369fcf5628ea2aa4e1b9e2ec6a5b3624e365bda588e1f0f2f12b564f728fbb8` |
| `jetbrains-mono-latin-variable.woff2` | `@fontsource-variable/jetbrains-mono@5.3.0`, Latin normal variable subset | SIL Open Font License, copied as `dist/fonts/licenses/jetbrains-mono-ofl.txt` | `18be452724bfdc236c074ca94a249a7f41a86752c7d04ab258ce9ed5651f6a7e` |

The implementation is reviewed against this mapping before publication. Runtime dependency licenses are enforced by `scripts/check-provenance.ts`.
