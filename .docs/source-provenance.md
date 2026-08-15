# Source provenance

Reference repository: Impression

Pinned reference commit: `24f2833abf7a24e7ada6b2f516a599cae8fcc50b`

CTX9 never imports Impression at build or runtime. Reference files are reviewed at the pinned commit and CTX9 code is classified below.

| CTX9 surface                    | Impression reference                                                                | Classification                | Notes                                                                                          |
| ------------------------------- | ----------------------------------------------------------------------------------- | ----------------------------- | ---------------------------------------------------------------------------------------------- |
| dark mono and semantic tokens   | `tooling/tailwind/colors.css`                                                       | adapted                       | Light roots, theme selectors, warm marketing neutrals, and media-query theme detection removed |
| reusable layout/control recipes | `apps/next/src/components/styles/common.tsx`                                        | rewritten                     | Product/social recipes and light variants excluded; plain CTX9 names                           |
| class merging                   | generic `cn` usage across UI                                                        | rewritten                     | Small typed `clsx` plus `tailwind-merge` utility                                               |
| input/label/textarea direction  | `apps/next/src/components/aceternity/input.tsx`, `label.tsx`, `text-area.tsx`       | pending mock approval         | Decorative gradients and animation excluded                                                    |
| buttons and control variants    | `apps/next/src/components/ui/button.tsx`, `control-variants.ts`, `control-shape.ts` | pending mock approval         | Dark-only and compact internal-product variants                                                |
| checkbox                        | `apps/next/src/components/ui/checkbox.tsx`                                          | pending mock approval         | Radix behavior retained through direct dependency                                              |
| dialogs and form system         | `apps/next/src/components/ui/dialog.tsx`, `alert-dialog.tsx`, `form.tsx`            | pending mock approval         | Next-specific imports removed                                                                  |
| date/time controls              | Impression calendar/date/time component family identified by style guide            | pending mock approval         | Product-neutral, accessible compositions only                                                  |
| errors                          | Impression public and internal error patterns                                       | rewritten after mock approval | Public marketing shell explicitly excluded                                                     |

## Font provenance

Only the normal variable files needed by the dark internal product are vendored. They are emitted inside `@ctx9/ui`; production makes no third-party font request.

| File                                  | Upstream package                                                          | License                                                                       | SHA-256                                                            |
| ------------------------------------- | ------------------------------------------------------------------------- | ----------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| `geist-sans-variable.woff2`           | `geist@1.7.2`, `dist/fonts/geist-sans/Geist-Variable.woff2`               | SIL Open Font License, copied as `dist/fonts/licenses/geist-ofl.txt`          | `a369fcf5628ea2aa4e1b9e2ec6a5b3624e365bda588e1f0f2f12b564f728fbb8` |
| `jetbrains-mono-latin-variable.woff2` | `@fontsource-variable/jetbrains-mono@5.3.0`, Latin normal variable subset | SIL Open Font License, copied as `dist/fonts/licenses/jetbrains-mono-ofl.txt` | `18be452724bfdc236c074ca94a249a7f41a86752c7d04ab258ce9ed5651f6a7e` |

No code is copied until its classification, license, public API, and visual approval are recorded here.
