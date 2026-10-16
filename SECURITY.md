# Security reports

Report vulnerabilities through [GitHub private vulnerability reporting](https://github.com/ContextNine/ctx9-web/security/advisories/new). Do not include credentials, protected configuration, session material or customer data in a public issue.

This shared intake covers Notenv's CLI, broker, server and console as well as `@ctx9/ui`, `@ctx9/web-auth` and `@ctx9/identity`. Identify the affected component and exact version or source commit. Include a minimal reproduction using synthetic values, the expected security boundary and impact. Do not attach live credentials, private keys, account recovery kits or customer data.

Ordinary shared-package bugs and contribution questions can use public issues.

## Supported releases

Security fixes target the latest stable public release of each shared package. Consumers should pin an exact version and follow the release notes when upgrading. Fixes ship as new immutable versions.

No supported standalone Notenv release has been published yet. Reports against its source candidates are welcome; source verification does not accept public distribution, installed broker execution, upgrade or offline restore.
