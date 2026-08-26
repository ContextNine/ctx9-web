# Package release and consumption

GitHub `MDerman/ctx9-web` is the canonical source. A GitHub Actions deploy key mirrors authoritative branches and tags to the private GitLab project `ctx9/web` (`85438020`). GitLab CI validates mirrored refs and publishes immutable tagged releases to its private npm registry.

## Release

1. Confirm the approved visual identifiers and component provenance are recorded.
2. Set both package versions to the same exact semantic version.
3. Run `pnpm install --frozen-lockfile` and `pnpm check` under the pinned Node 24 and pnpm versions.
4. Prove both generated archives install and build in a clean isolated consumer.
5. Commit and push `master` to GitHub. Wait for the GitHub mirror and matching GitLab check pipeline.
6. Create and push the matching `vX.Y.Z` tag on GitHub.
7. Wait for the mirror and GitLab publish job, then record registry archive hashes and pipeline URLs.

Never republish or overwrite a released version. Correct a package with a new patch version.

## CI consumption

Consumer projects pin exact versions. The package project allowlists the consumer project for inbound CI job-token access. A consumer job creates an ephemeral npm configuration containing:

```ini
@ctx9:registry=https://gitlab.com/api/v4/projects/85438020/packages/npm/
//gitlab.com/api/v4/projects/85438020/packages/npm/:_authToken=${CI_JOB_TOKEN}
```

The generated file is removed with the job workspace and is never committed. Local installation uses an operator's existing GitLab package-read credential through an environment-expanded user configuration outside this repository.

## Workspace local overlay

The CTX9 workspace's loopback development harness builds `@ctx9/ui` and `@ctx9/web-auth` from this checkout, then creates ignored links beneath each consumer's `node_modules/@ctx9`. This is a development-only package channel. It does not edit a consumer manifest or lockfile, and production builds continue to consume exact immutable registry versions.

The shared shell accepts product, account-security, tenant-settings, tenant-creation, and brand destinations as typed props. Local consumers pass their `.localhost` origins; published consumers retain the production defaults. Do not add hostname checks to shared UI components.

## Upgrade and rollback

- Upgrade one component at a time with an exact package version and run its full component checks.
- Record the prior package and image digest before deployment.
- Roll back by restoring the previous exact package version, rebuilding the component, and deploying its previously validated image or the recorded Helm revision.
- Do not unpublish a package as a rollback mechanism.
