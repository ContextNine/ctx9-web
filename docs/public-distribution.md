# Public distribution

Matt selected Apache-2.0 for the shared packages on October 16, 2026. Notenv's own AGPL license is separate. `@ctx9/ui` and `@ctx9/web-auth` retain their existing names. The extracted `@ctx9/identity` authority joins them in the staged 9.0.1 npm bootstrap. Source now prepares 9.1.0 with installation-owned navigation and a Node authority adapter. The 9.0.1 bootstrap is public and verified below. Version 9.1.0 remains the next OIDC release candidate.

## Package contract

All three packages include their Apache-2.0 LICENSE and NOTICE. UI also ships the shadcn/ui MIT notice and the bundled Geist Sans, Inter and JetBrains Mono OFL files. Source ownership and adapted-component origins remain documented in [source provenance](source-provenance.md). CTX9 names and logos do not become licensed trademarks through the code license.

The workspace stays private to prevent accidental publication of its root. Individual package manifests select public access and `https://registry.npmjs.org/`. Existing private registry versions remain immutable historical artifacts; new versions have one public registry destination.

The declared runtime lines are Node 22.16+, 24.21+ and 26.11.1+, limited to those majors. The release workflow checks each line. pnpm remains 11.22.0. Runtime support must be proven by the package and isolated-consumer checks before release acceptance.

## Publication

`.github/workflows/publish.yml` is the only publisher for new SDK releases. It uses GitHub-hosted runners because npm OIDC does not support the existing self-managed GitLab runner. GitLab continues source validation and mirroring, with no new private-package publisher. Product deployment remains in the existing private delivery system.

Before the first public release:

1. Review source history, repository metadata, CI artifacts and adapted-source permissions before making the source repository public. Record redacted scan findings and remediation. A clean scan alone does not review internal operational material.
2. Verify control of the npm `ctx9` organization and package names. Establish each package through npm's supported first-publication process, then configure its trusted publisher to organization `ContextNine`, repository `ctx9-web`, workflow `publish.yml`, environment `npm-publication`.
3. Configure the GitHub `npm-publication` environment to admit only protected semantic version tags. Verify branch/tag protection and source checks. Do not enable privileged execution for pull-request code.
4. Run `pnpm check` and isolated anonymous archive installation for each declared runtime line. Commit the matching source and package version, then create its exact `vX.Y.Z` tag from `master`.
5. The workflow validates the tag/version and ancestry, builds all three archives once, records SHA-256 and source identity, and publishes those bytes with npm provenance. It uses OIDC without a long-lived npm token.
6. Independently read all three versions from public npm without credentials and compare downloaded archive digests with the release manifest. Record the source SHA, workflow URL, registry versions and digests here.

If some packages publish and another fails, the released version is immutable. Inspect the exact published archive before resuming only the missing publication. Do not overwrite a version, rebuild different bytes under it, or unpublish as rollback. A correction receives a new version.

## Consumption

Pin exact versions and update lockfiles in each consumer. Remove the old `@ctx9` private-registry route from migrated projects. Inspect machine helper configuration through its owning tooling; retain authentication for unrelated private packages. No new private-registry fallback is supported.

Public Notenv source and Docker builds must install these packages without registry credentials. Source builds may not depend on a sibling checkout. Local SDK development aliases remain a development convenience only.

`pnpm install:check` installs packed archives in a clean temporary consumer with public registry configuration and no user/global npm configuration. It runs the pinned npm 11.20.0 CLI under the selected Node runtime. npm 10.9.2 bundled with Node 22.16.0 crashes in its peer resolver for the authority dependency graph; the supported package-manager toolchain uses npm 11 or pnpm 11.22.0. The check typechecks and renders UI and imports both server auth packages. Archive checks also enforce real license/font contents and client boundaries.

## Acceptance record

All three 9.0.1 bootstrap packages are public. Matt completed required 2FA and approved the staged versions. Anonymous registry reads and downloaded SHA-256 digests match the staged release manifest from `b8b745cc587737a315d564694dd914400d002b13`. The [read-back receipt](evidence/public-npm-bootstrap-2026-10-16.json) records each exact archive. This one-time local bootstrap has no npm provenance attestation. Trusted-publisher setup and a real OIDC release remain required before routine publication is accepted.

The October 16 publication review scanned all 114 Git commits reachable at `f0795ec` with Gitleaks 8.30.1 and full redaction. No findings were reported. The tracked tree and historical path inventory contain package source, docs, design examples and workflows; no production projections or custody files were found. GitHub has no releases, issues or retained Actions artifacts to expose at this checkpoint. Adapted shadcn code and bundled font notices are included in the candidate archives. Publication review must include any later changes, not only this baseline.

The Node 22.16.0 full check passes all 22 tests, archive checks and isolated install/typecheck/render. The same 22 tests and isolated install/typecheck/render also pass on Node 24.21.0 and 26.11.1. The existing development-path fixture needed realpath comparison for macOS's `/var` to `/private/var` alias. Runtime behavior was unchanged. Node 22.16.0 and 26.11.1 were fetched from Node's official distribution and verified against its published archive checksums without changing the machine's installed runtime.

The free npm `ctx9` organization was created and the signed-in account is verified as its owner. A temporary owner-only CLI session was authorized through npm's email challenge. GitHub environment `npm-publication` admits version tags only, and active ruleset `25241779` prevents version-tag updates/deletion. The first-package approval required npm security-key/passkey 2FA. Matt completed setup and package approval, then confirmed replacement recovery codes were saved privately. No recovery material is a repository input. Routine releases use the protected GitHub workflow rather than the temporary owner CLI session.

The source repository is now public under Apache-2.0, with anonymous API access verified. Private vulnerability reporting is enabled. [GitHub check 38906007581](https://github.com/ContextNine/ctx9-web/actions/runs/38906007581) passes for the initial public-distribution source `58194f2`.

The 9.1.0 candidate passes the complete Node 26.11.1 `pnpm check`, including
23 tests and an isolated install/typecheck/render of all three archives. Its
standalone navigation journey uses one operator-supplied application origin;
the managed three-application journey remains covered. Consumer pins still
await accepted public publication.

## License inventory checks

The [October 17 inventory](evidence/source-license-inventory-2026-10-17.json) covers 47 runtime, optional and peer dependency entries using each public package's actual installed metadata. Release checks derive this inventory from manifests, so a newly declared dependency cannot be omitted from a hand-maintained list. All three retained font hashes and OFL files are checked, including JetBrains Mono's original source record at `9081c77a0d8eec6db95e87d2ef1c9f0391930029`. Archive checks require the three font binaries and their notices. Runtime package source and immutable release tags are unchanged. Direct metadata and asset checks do not establish all transitive licenses or copied-code ownership.

[Check run 38997414696](https://github.com/ContextNine/ctx9-web/actions/runs/38997414696), exact source `f413f9e121452f8bdd83bd4c45a6bee0cb9fae79`, passes the full 24-case package, archive and isolated-install checks on Node 22.16.0. Local Node 24.21.0 validation also passes, including a separate repository-script TypeScript check. This verifies the expanded release checks; it publishes no package and does not change the pending trusted-publisher setup.

## Private security reporting

Notenv and the shared packages use one [private security intake](https://github.com/ContextNine/ctx9-web/security/advisories/new) on the public shared-package repository. Both root security policies name the components, synthetic reproduction requirements and release support policy. Notenv has no supported standalone public release yet; the shared packages target their latest stable public versions.

The [October 17 receipt](evidence/security-reporting-2026-10-17.json) records anonymous repository visibility, enabled private vulnerability reporting and an available maintainer advisory form. No report or advisory was submitted. This establishes the configured channel and policy; it does not test a submission from a separate reporter account.

## Current public-source check

The actual [Check run 38979753701](https://github.com/ContextNine/ctx9-web/actions/runs/38979753701), source `b4f7e74d3beecfc0dbabcfb3ef23e190ff406073`, passes on Node 22.16.0: 23 tests, archive checks and an isolated install/typecheck/render/style journey. The [receipt](evidence/public-sdk-check-2026-10-17.json) separates this from the Release workflow, whose master-branch job only mirrors source. Node 24.21.0/26.11.1 retain their earlier local matrix evidence; protected publication rechecks all three runtime lines. No npm publisher is exercised by this run.

Anonymous npm metadata for every immutable 9.0.1 package declares `^22.16.0 || ^24.21.0 || ^26.11.1`. The public PR check uses read-only repository permission and no private registry/deployment credential. Privileged mirroring runs on source pushes, and npm publication runs on reviewed version tags through its protected environment.

## Protected 9.1.0 release attempt

[Run 38984250543](https://github.com/ContextNine/ctx9-web/actions/runs/38984250543), immutable tag `v9.1.0` at `02a4f78be715a973771c491c77611fee2b2c03db`, passes the full 24-case package/archive/isolated-install check on all three runtime lines. The approved protected job then exchanges its GitHub OIDC identity for UI successfully, while web-auth and identity return authorization 404s. The [receipt](evidence/protected-npm-release-9.1.0-2026-10-17.json) records that release archive creation, artifact upload and all npm publish commands were skipped. Anonymous metadata confirms no 9.1.0 version for any package. This proves the release stopped before a partial publication; successful exchange alone does not validate UI's first publish.

Matt has the permanent npm settings links and the exact already-approved connection fields for the other two packages. After those connections authorize the workflow, rerun the failed publish job on the unchanged tag. Do not create a fallback token, move the tag or accept 9.1.0 until exact archive/provenance read-back passes.

The private mirror rejected the first public version tag through its existing protected-tag policy. The mirror now follows master only, with [run 38984720610](https://github.com/ContextNine/ctx9-web/actions/runs/38984720610) passing at `6e8e8beb253a3d16d7b212ea67b9adb651df5b63`. GitHub owns new public release tags; historical private tags/artifacts remain retained and no GitLab permission is expanded.

The unchanged-tag publish-job retry in [attempt 2](https://github.com/ContextNine/ctx9-web/actions/runs/38984250543/attempts/2) returns the same 201/404/404 exchanges. Install, release build, artifact upload and publication remain skipped. Fresh anonymous metadata still returns 404 for all three 9.1.0 versions. The accepted three-runtime matrix belongs to attempt 1 and was not repeated for this permission recheck.
