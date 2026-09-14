# shadcn Next rebuild mocks

These static mocks cover the required design gate for the CTX9 Next.js rebuild. They use synthetic data and ship no runtime code.

- `a-dashboard-faithful.html` follows the generated `dashboard-01` composition most closely.
- `b-operational-dense.html` keeps the shadcn shell but favors compact tables and section boundaries.
- `c-split-editor.html` adds persistent repository context beside the Secrets editor.

Each direction includes selectors for Secrets repositories, the Secrets editor, Publisher inventory, Publisher detail, Auth account security, Tenant settings, and shared loading and error states. Resize the browser to inspect the mobile treatment.
