# Package release and consumption

GitHub `ContextNine/ctx9-web` is the canonical source. A GitHub Actions deploy key mirrors authoritative branches and tags to the private GitLab project `ctx9/web` (`85438020`). GitLab CI validates mirrored refs and publishes immutable tagged releases to its private npm registry.

## Release

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
3. Run `pnpm install --frozen-lockfile` and `pnpm check` under the Impression-authoritative Node 22.16.0 and pnpm 11.1.2 versions.
4. Prove both generated archives install and build in a clean isolated consumer.
5. Commit and push `master` to GitHub. Wait for the GitHub mirror and matching GitLab check pipeline.
6. Create and push the matching `vX.Y.Z` tag on GitHub.
7. Wait for the mirror and GitLab publish job, then record registry archive hashes and pipeline URLs.

The publish job creates both package archives once, records their SHA-256
digests and the full source commit in `web-X.Y.Z.release.json`, and publishes
those exact archives. The tagged pipeline retains the archives, checksum file,
and release record as non-expiring artifacts.

Never republish or overwrite a released version. Correct a package with a new patch version.

The v8 package line uses Tailwind 3 and the exact frontend dependency matrix captured from Impression for the release. Consumers align to that matrix before installing the new major version.

## CI consumption

Consumer projects pin exact versions. The package project allowlists the consumer project for inbound CI job-token access. A consumer job creates an ephemeral npm configuration containing:

```ini
@ctx9:registry=https://gitlab.com/api/v4/projects/85438020/packages/npm/
//gitlab.com/api/v4/projects/85438020/packages/npm/:_authToken=${CI_JOB_TOKEN}
```

The generated file is removed with the job workspace and is never committed. Local installation uses an operator's existing GitLab package-read credential through an environment-expanded user configuration outside this repository.

## Workspace local overlay

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
