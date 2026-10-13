# Package release and consumption

GitHub `ContextNine/ctx9-web` is the canonical source. A GitHub Actions deploy key mirrors authoritative branches and tags to the private GitLab project `ctx9/web` (`85438020`). GitLab CI validates mirrored refs and publishes immutable tagged releases to its private npm registry.

## Release

Version 9 names the canonical secrets application Notenv. Consumers select
`current: "notenv"` and provide `origins.notenv` to `createCtx9Applications`.
The previous product ID is removed, so migrate each consumer with its exact
package pin. The application switcher displays Notenv across all CTX9 products.


Both packages at `9.0.0` are published from
`88b2bcbc616c026f78a79b09a994aefc8dfad21f`. Tagged
[pipeline 2943018285](https://gitlab.com/ctx9/web/-/pipelines/2943018285)
passes package checks and publication. Its existing mirror deploy key received
creation permission for the exact `v9.0.0` protected tag, with wildcard
protection unchanged. The core Notenv consumer passes frozen registry
installation against the new exact pins. Its application acceptance and the
other consumers' migrations remain separate release gates.

Published archive SHA-256 digests are
`a61aef440e689a969487a6459767936fdf261b73b4db5be094e71117bb6568dc`
for `@ctx9/ui` and
`371c93e6e6515787f1969224201f2721d72584e0f9da7e9ef9d883035eba97c0`
for `@ctx9/web-auth`. The pipeline record matches the locally generated
archives; registry SHA-1 metadata matches those same bytes. Direct registry
SHA-256 read-back and production adoption are still pending.

For this v8 migration, Matt's October 7 scope change separates shared-package
and CTX9 acceptance from Impression's final appearance pass. Finish component
ownership, focused CTX9 behavior/build checks and immutable pins without waiting
for exhaustive Impression screenshot matrices. Keep every unresolved Impression
comparison in its linked progress document; do not relabel differences as
passes. Full package checks, isolated archive acceptance and matching source CI
remain required before publication. Earlier paragraphs describing pending
complete Impression matrices are historical evidence, not a requirement to
repeat them before the CTX9 release.

The shared style-policy engine can also check additional component packages
through repeated `--package` arguments or the `{ packages, exceptions }` API.
Its integration fixture covers public action aliases, safe object props, and
appearance hidden in nested, quoted, or computed spreads. Impression's adoption
of the published checker and retirement of its transitional checks remain
consumer-migration gates.

The checker also accepts `--project <tsconfig.json>` to inspect controller and
framework-adapter prop types without exceptions. Only exact current program
sources are used. Props that permit appearance, unknown/any types, and index
signatures remain violations; optional `never` styling props are accepted.
Consumer typechecking remains a separate required CI check.

The v8 replacement is still unpublished. Its complete local check passes under Node 22.16.0, including 21 integration tests and isolated archive installation, typechecking, rendering, and policy checks. MultipleSelector has an additional 48-case browser comparison at desktop/mobile widths in light, class-based dark, and attribute-based dark. The port and combined stylesheet produce zero changed pixels. The direct compiled-stylesheet comparison differs only in the duplicate WebKit text-decoration transition alias; the full consumer-build CSS and remaining component/interaction matrix are still required before a v8 tag.

The Testimonials standalone pilot caught two missing foundation rules in the
initial archive: Tailwind 3 Preflight was disabled, and the shell skip link
occupied a grid cell. The package now supplies its reset and positions the skip
link only while focused. Rebuild source-specific archives and repeat standalone
and combined Impression appearance checks before accepting this correction.
Earlier archive comparisons do not cover these changed foundation rules.

The next candidate restores Impression's base semantic border rule alongside
Preflight. Its account menu opens settings after menu focus/pointer cleanup;
settings restores the initiating control on close, and handled Escape events
do not also close mobile navigation. The standalone browser acceptance must
cover repeated open/close, pointer recovery, both themes and mobile navigation.

The Publisher pilot adds semantic success/warning Badge variants and a metadata
Sheet variant with bordered header/footer choices and a visible close icon.
These choices leave Impression's existing defaults unchanged. The shared policy
also checks Sheet headers, footers, titles and descriptions. Consumer checks
must cover metadata save, read-only state, dismissal and focus restoration.

The Notenv pilot adds code-field and transparent overlay Textarea
presets, semantic InlineStatus tones, and a compact notice Popover. The console
must verify editor alignment, keyboard actions, autosave and protected-response
containment against synthetic data before accepting the migration. These
optional presets do not change existing Impression component defaults.

The Button fixture covers 169 cases at desktop/mobile widths in light/dark. After restoring Impression's existing 11px tiny typography variant, component output has identical computed styles, geometry, and pixels across 676 comparisons. Adding shared CSS also yields zero changed pixels. The remaining rendered-property difference is the WebKit transition alias. Added package variables and equivalent minified custom-property values differ textually, so this does not accept literal full-consumer CSS or the remaining interaction matrix.

A separate Button interaction fixture covers 29 cases across light/dark hover/focus states, 116 comparisons per stylesheet mode. It caught and corrected dark focus colors and onboarding hover text by restoring source modifier ordering and important flags. Component computed properties and geometry now match exactly, with zero changed pixels. Adding shared CSS also has zero changed pixels and differs only in the WebKit transition alias. Other shared controls and full-consumer acceptance remain pending.

The Input/Textarea fixture covers 35 hydrated app/auth cases across six
desktop/mobile width/theme combinations and 220 targeted interaction cases.
All 430 comparisons preserve computed properties, custom properties,
placeholder styles, geometry, native attributes, refs, events, and values. The
comparison caught fixed-height auth recipes incorrectly applied to auto-height
fields. Static screenshots now match exactly. Six whole-page interaction
captures have one or two changed shadow pixels; their strict pixel gate remains
open. Fresh unchanged-original public field captures also reproduce this shadow
variability. No masks or pixel tolerance were added.

Checkbox and Switch have 23 hydrated cases and 166 browser states across 1440,
390, and 411px in light/dark. All 298 comparisons match computed properties,
custom properties, geometry, refs, values, checked/ARIA states, event counts,
and pixels. The interactions include hover, focus, click, Space, and Enter.
Restoring the missing indeterminate black/white and source hover recipes fixed
the draft regressions. The complete package check still passes all 21 tests and
isolated archive acceptance. These component checks do not accept complete
consumer pages or authorize a v8 tag.

The October 6 candidate archives were installed into a separate Impression
verification consumer. Their Checkbox/Switch exports also pass the complete
298-comparison browser matrix. Impression typechecks against those installed
declarations. Checkbox/Switch now own their appearance in both their props and
runtime implementation; their 23-case DOM comparison passes with attribute and
class ordering ignored. A final archive from the stricter committed source and
complete migrated pages are still required before publication.

1. Confirm the approved visual identifiers and component provenance are recorded.
2. Set both package versions to the same exact semantic version.
3. Run `pnpm install --frozen-lockfile` and `pnpm check` under the Impression-authoritative Node 22.16.0 and pnpm 11.22.0 versions.
4. Prove both generated archives install and build in a clean isolated consumer.
5. Commit and push `master` to GitHub. Wait for the GitHub mirror and matching GitLab check pipeline.
6. Create and push the matching `vX.Y.Z` tag on GitHub.
7. Wait for the mirror and GitLab publish job, then record registry archive hashes and pipeline URLs.

The publish job creates both package archives once, records their SHA-256
digests and the full source commit in `web-X.Y.Z.release.json`, and publishes
those exact archives. The tagged pipeline retains the archives, checksum file,
and release record as non-expiring artifacts.

Never republish or overwrite a released version. Correct a package with a new patch version.

The October 8 `v8.0.0` tag mirror passed after granting its existing mirror key
creation permission for that exact protected tag. Its GitLab check passed in
[pipeline 2925488654](https://gitlab.com/ctx9/web/-/pipelines/2925488654), but
publication failed before either package reached the registry. npm interpreted
the relative archive argument without `./` as a Git reference and attempted to
spawn `git`. Publication must use `./dist-release/…tgz` to publish the local
archive. Release `8.0.2` fixes those paths and includes the current shared UI
source at `90d9e1b75aa6998029506cb766fafe09aeb1f38e`. Both existing `v8.0.0`
and `v8.0.1` tags stay unchanged. Matt approved the existing mirror key's
exact `v8.0.2` creation grant without changing wildcard protection. The exact
Node 22.16.0 GitHub check and GitLab master check pass; tagged
[pipeline 2925542896](https://gitlab.com/ctx9/web/-/pipelines/2925542896)
passes check and publication. Ordinary authenticated consumers resolve and
install both immutable registry packages.

The recorded release archive SHA-256 digests are
`933ebdc9bcf806c3f90154651ff3f271b6c1e627af03a9fa3c7d4c652d825a35`
for `@ctx9/ui` and
`2cbaec6d239ddbc95b4c60de7076488973b0e04423e136874616ea42bcf07c38`
for `@ctx9/web-auth`. Registry SHA-1 values are respectively
`835b576c3f2508e7aa1999cac5ca7935b20e78df` and
`9bfab62499ed1fa19e1dfd867adf1960ef2944e5`. Consumer image signing and
production promotion remain independent release checks.

The v8 package line uses Tailwind 3 and the exact frontend dependency matrix captured from Impression for the release. Consumers align to that matrix before installing the new major version.

The CSS build explicitly uses Impression's PostCSS 8.5.18, Autoprefixer 10.4.22
and resolved browser-data versions instead of the Tailwind CLI's bundled
prefixer defaults. Next 15's browser targets and emitted transition-list order
are preserved without adding a Next dependency. The corrected combined Button
fixture has zero changed pixels, geometry differences or rendered-property
differences across 676 comparisons. Added package custom properties and
equivalent minified custom-property strings still differ textually; whole-app
CSS and other component-family acceptance remain separate.

The remaining tooltip action presets match 184 source-level markup comparisons
across 46 configurations, including disabled states and both icon families.
The consumer now uses typed appearance and compact menu density instead of
appearance overrides. Archive, browser and complete-page gates remain separate.

## CI consumption

AlertDialog's ownership contract preserves Impression's existing default
recipes and rejects caller class/style overrides, including on nested titles,
descriptions and actions. Its three Impression consumers still require
installed-archive interaction and appearance checks before acceptance.

Pricing and shimmer controls have 14 exact normalized markup comparisons
against retained Impression `754aa61fa` source. The shared checker covers
ShimmerBorderButton, and isolated consumers render its upgrade preset and the
loader's pricing preset. Installed-archive, native animation and complete-page
checks remain required. The package does not depend on Impression's public UI.

Date-time trigger presets match 44 normalized closed-markup comparisons across
11 existing configurations, including date presence and disabled states.
Consumers use typed layouts and empty/intended states without appearance
classes. Installed archive, open-picker behavior and complete-page acceptance
remain required.

ColorPicker owns its trigger, swatch palette and hex field and is covered by
shared style enforcement. Twelve closed-markup comparisons match the retained
Impression source. Open-picker behavior, input refs, keyboard selection and
installed archive appearance remain consumer acceptance gates.

Connection palettes and loader navigation presets have 54 normalized markup
comparisons across 19 configurations. This includes disabled/loading output
without changing existing defaults or animations. Installed archive, native
interaction and complete-page acceptance remain required.

The navigation-control extraction has 80 normalized markup comparisons across
35 configurations, including selected, disabled and loading output. Installed
archive, native interaction and complete-page acceptance remain separate gates.

The menu/rail extraction has 62 normalized markup comparisons across 29
configurations. This includes disabled/loading controls and the unchanged
shimmer spinner and gradient markup. Its native interaction/animation and
installed-archive comparisons are required before consumer acceptance.

Consumer projects pin exact versions. The package project allowlists the consumer project for inbound CI job-token access. A consumer job creates an ephemeral npm configuration containing:

```ini
@ctx9:registry=https://gitlab.com/api/v4/projects/85438020/packages/npm/
//gitlab.com/api/v4/projects/85438020/packages/npm/:_authToken=${CI_JOB_TOKEN}
```

The generated file is removed with the job workspace and is never committed. Local installation uses an operator's existing GitLab package-read credential through an environment-expanded user configuration outside this repository.

## Workspace local overlay

For regular Next development, `@ctx9/ui/dev` discovers the local `Code/ctx9/web`
checkout by walking upward from the Next project directory. Pass `__dirname`
from `next.config.ts` so root-launched `next dev web` commands resolve the same
directory as the watcher. It supports nested
Impression workspaces as well as the four CTX9 consumers. Development-only
Webpack/Turbopack aliases resolve `@ctx9/ui` to the checkout's watched build.
The TypeScript watcher compiles edits and newly added exports automatically;
Next watches those files for hot reload. Next 15 Turbopack needs this emitted
JavaScript because the package's relative imports use `.js` extensions.
Each project's compiler output lives in an ignored, project-specific directory
under `packages/ui/.ctx9-ui-dev/`. It never shares `dist` with release builds or
another app's dev server, so package builds cannot delete live module factories.
The dev aliases also use the SDK's Recharts instance for consumer chart children.
Its context must match the shared ResponsiveContainer and tooltip; separate
dependency trees otherwise render blank plots. Production resolution is unchanged.

Web dev commands run through `ctx9-ui-dev -- next dev ...`. It builds shared
TypeScript and Tailwind CSS before the first request, then watches both
alongside Next. CSS and self-hosted fonts live in the application's ignored
`.ctx9-ui/` directory.
Each dev server owns and stops its watcher and child processes. No manifest,
lockfile, installed package or published artifact is modified by this loop.
If the checkout is absent, development uses the installed package normally.
Production config returns no local aliases, even when the checkout exists.

Install dependencies once in `ctx9/web`, then use the consumer's ordinary dev
command. No packing, reinstalling or package upload is needed for source edits.
This feature is in the next `8.0.1` SDK source draft; the existing `v8.0.0` tag
continues to identify its unchanged original source.

The CTX9 workspace's loopback development harness builds `@ctx9/ui` and `@ctx9/web-auth` from this checkout, then creates ignored links beneath each consumer's `node_modules/@ctx9`. This is a development-only package channel. It does not edit a consumer manifest or lockfile, and production builds continue to consume exact immutable registry versions.

The shared shell accepts the three application origins and current application as typed inputs. `createCtx9Applications` returns the fixed All apps order. The account menu accepts one optional product-settings action and one required handler that opens Tenant and account settings in the host application. Local consumers pass their `.localhost` origins; published consumers retain the production defaults. Do not add hostname checks to shared UI components.

## Testimonials release status

Release 5.0.0 adds Testimonials to All apps and requires every caller to supply its origin. The required origin makes this a breaking TypeScript contract change. Both packages use the same release version. The complete local package check and clean temporary-consumer archive check passed. GitLab [pipeline #2861051110](https://gitlab.com/ctx9/web/-/pipelines/2861051110) passed its check and publish stages for commit `44dc88b4`. The registry lists `@ctx9/ui` 5.0.0 with archive SHA-1 `62760aa1d5f3f2cd7b741dcb8b05a401a7a6517d` and `@ctx9/web-auth` 5.0.0 with archive SHA-1 `e93cfc2a6dbfcce1590115e4d5beba4b26f31868`. Consumer lockfile changes and clean image checks remain separate acceptance gates.

Release 6.0.0 removes the retired Agents product from the application ID, origin contract and All apps menu. Active consumers must remove their Agents origin and pin both packages to 6.0.0. The major version keeps the public TypeScript contract aligned with the live product topology instead of accepting an ignored legacy origin.

Release 7.0.0 replaces `ApplicationLayout.header` with the required typed `breadcrumbs` contract, adds the shared page-title parent chevron, widens the account menu for its longest action, and publishes the canonical favicon asset. The old arbitrary header prop is intentionally unsupported. GitLab [pipeline #2874071020](https://gitlab.com/ctx9/web/-/pipelines/2874071020) passed its check and publish stages for commit `1e9cb756`. The registry lists both packages at 7.0.0. The release archives use SHA-512 integrity `sha512-v7fXMPqZghPXjpL5qczgNBkk7PN+MbWKgxC5/i+DoBO1yZAs7IwyudUlbvCQuH102fA52Dg7HIPqwBsBgbziTA==` for `@ctx9/ui` and `sha512-6YQaLhTwP23c154I+4KaKruXlIyZJRjVWH07Je0YYTLs3S8xkCARpykKNiDxImvfQC+KxdZdzi4CS2wp+gK7VA==` for `@ctx9/web-auth`.

## Upgrade and rollback

- Upgrade one component at a time with an exact package version and run its full component checks.
- Record the prior package and image digest before deployment.
- Roll back by restoring the previous exact package version, rebuilding the component, and deploying its previously validated image or the recorded Helm revision.
- Do not unpublish a package as a rollback mechanism.

## Account menu correction

Version 8.0.3 aligns account-menu tenant and action rows, increases their left
inset, and keeps separators inside that inset. The app switcher displays the
selected product. Empty account names omit the identity line and use tenant
initials. Menu dismissal still releases focus and pointer guards before opening
the host's tenant/account dialog.

The exact `v8.0.3` tag identifies source
`5bbdfda23368e503f0e49bfc72e7249ab23f2636`. Full local checks and isolated
installation passed, followed by matching GitHub and GitLab source checks.
Tagged [pipeline 2942682766](https://gitlab.com/ctx9/web/-/pipelines/2942682766)
published both immutable packages. Matt approved the existing mirror deploy
key for this exact tag; the `v*` protection is unchanged. Secrets downloaded
and installed both exact package versions through ordinary pnpm authentication.
