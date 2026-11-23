# Button hover and NewChatIcon

1. Document and add `group/btn` to every Button base recipe. Move the chat pen into the UI package with its own motion styles.
2. Prepare aligned 10.1.0 manifests, run `pnpm check` including isolated installation, and open a release PR.
3. Obtain Matt's confirmation before merging and pushing the immutable release tag through the protected npm workflow. Verify published archives and provenance.
4. Upgrade Impression on master after publication. Remove the local icon/keyframes, audit hover workarounds, and address the 10.x changes.
5. Run Impression lint, types, unit and sidebar checks, inspect the browser in both themes, then commit the verified migration.

The 9.4.0 to 10.x history is recorded in docs/package-release.md and commit 3a53845. Required sidebar icons and AppSidebarGroup labels affect CTX9 shell users; Impression uses its own sidebar. Shared Button routing, select check-mark spacing, dialog and feedback styles need consumer verification.

## Progress

- Shared UI implementation and 10.1.0 manifests are ready. The full Node 22 check passes, including all 26 tests and clean archive installation, typecheck, render and style-policy enforcement.
- Impression is current with origin/master at f58e456c. Frozen dependency installation passes after starting and unlocking the installed Notenv broker. Unrelated cache files and browser artifacts remain untouched.
- Impression has no CTX9 shell/DataTable consumers. Its migration is expected to change the exact UI pin and release-age exception, lockfile, sidebar import and local icon/keyframes, plus CreatePostMenuButton's existing named hover class.
- Other reviewed hover groups cover non-Button layouts or multiple controls. Keep those groups.
- Publication requires Matt's confirmation before merging the release PR and pushing v10.1.0. No npm publication or Impression migration commit has occurred.
