# Public distribution

Matt selected Apache-2.0 for the shared packages on October 16, 2026. Notenv's own AGPL license is separate. `@ctx9/ui` and `@ctx9/web-auth` retain their existing names. The extracted `@ctx9/identity` authority joins them in the 9.0.1 public npm candidate. This document records a release candidate until actual publication and anonymous read-back are recorded below.

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
5. The workflow validates the tag/version and ancestry, builds both archives once, records SHA-256 and source identity, and publishes those bytes with npm provenance. It uses OIDC without a long-lived npm token.
6. Independently read both versions from public npm without credentials and compare downloaded archive digests with the release manifest. Record the source SHA, workflow URL, registry versions and digests here.

If one package publishes and the other fails, the released version is immutable. Inspect the exact published archive before resuming only the missing publication. Do not overwrite a version, rebuild different bytes under it, or unpublish as rollback. A correction receives a new version.

## Consumption

Pin exact versions and update lockfiles in each consumer. Remove the old `@ctx9` private-registry route from migrated projects. Inspect machine helper configuration through its owning tooling; retain authentication for unrelated private packages. No new private-registry fallback is supported.

Public Notenv source and Docker builds must install these packages without registry credentials. Source builds may not depend on a sibling checkout. Local SDK development aliases remain a development convenience only.

`pnpm install:check` installs packed archives in a clean temporary consumer with public registry configuration and no user/global npm configuration. It typechecks and renders UI and imports the server auth package. Archive checks also enforce real license/font contents and client boundaries.

## Acceptance record

Public package distribution is not yet claimed. Pending items are npm organization authority, first publication/trusted-publisher setup, runtime checks, real publication and anonymous read-back. Update this record with actual evidence; configuration alone does not prove release.

The October 16 publication review scanned all 114 Git commits reachable at `f0795ec` with Gitleaks 8.30.1 and full redaction. No findings were reported. The tracked tree and historical path inventory contain package source, docs, design examples and workflows; no production projections or custody files were found. GitHub has no releases, issues or retained Actions artifacts to expose at this checkpoint. Adapted shadcn code and bundled font notices are included in the candidate archives. Publication review must include any later changes, not only this baseline.

The Node 22.16.0 full check passes all 22 tests, archive checks and isolated install/typecheck/render. The same 22 tests and isolated install/typecheck/render also pass on Node 24.21.0 and 26.11.1. The existing development-path fixture needed realpath comparison for macOS's `/var` to `/private/var` alias. Runtime behavior was unchanged. Node 22.16.0 and 26.11.1 were fetched from Node's official distribution and verified against its published archive checksums without changing the machine's installed runtime.

The free npm `ctx9` organization was created and the signed-in account is verified as its owner. A temporary owner-only CLI session was authorized through npm's email challenge. GitHub environment `npm-publication` admits version tags only, and active ruleset `25241779` prevents version-tag updates/deletion. Initial package creation and trusted-publisher registration remain pending.

The source repository is now public under Apache-2.0, with anonymous API access verified. Private vulnerability reporting is enabled. [GitHub check 38906007581](https://github.com/ContextNine/ctx9-web/actions/runs/38906007581) passes for the initial public-distribution source `58194f2`.
