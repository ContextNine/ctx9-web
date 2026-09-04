# Component inventory

The v2 inventory is split into foundations, shared controls, and product compositions. The canonical direction uses Impression's dark mono system, a shared left sidebar, restrained rows, and true-black content surfaces.

## Foundations

- dark semantic tokens and mono scale;
- self-hosted interface and mono fonts;
- `cn` class merger;
- shared page, panel, row, label, focus, status, and typography recipes;
- safe error descriptor model.

## Shared controls

- Button, FunkyLoaderButton, LoadingButton compatibility alias, and ButtonGroup;
- Input, Textarea, Label, Checkbox, Select, Switch;
- Form field, description, and error association;
- Dialog, AlertDialog, Popover, DropdownMenu, Tooltip;
- Tabs, Table, Pagination, ScrollArea, Separator;
- Badge and status text;
- Calendar, date input, time input, date-time, timezone selector, and date range;
- Toast/status announcement and ErrorPage;
- skeleton without continuous animation.

## Product compositions

- `AppShell`, `AppSidebar`, `AppSidebarHeader`, `AppSidebarGroup`, `AppSidebarLink`, `AppSidebarFooter`, `SidebarInset`, `AccountMenu`, `AuthShell`, `FocusedShell`, `PageHeading`, `OperationalList`, and `OperationalRow` are published shared compositions. `AppSidebarHeader` owns the CTX9 grid mark and service switcher; product navigation stays text-only. Navigational `OperationalRow` instances use their full row as the link.
- `ApplicationShell` and the horizontal Workbench navigation contract were removed in the v2 breaking release.
- Tenant selectors, authentication/enrollment/recovery forms, settings/member/invitation forms, artifact viewers, and protected-action boundaries are product compositions built from the shared controls.
- Unavailable, denied, not-found, renderer-error, loading, and empty states use the shared state primitives.

Animated/public-marketing Aceternity components, product-specific Impression recipes, editor/social components, and light-mode variants are excluded.
