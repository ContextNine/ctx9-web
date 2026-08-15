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

No code is copied until its classification, license, public API, and visual approval are recorded here.
