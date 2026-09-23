# Component inventory

The v4 inventory uses the selected Operational Dense direction and the shadcn `dashboard-01` component family. CTX9 keeps its dark mono tokens, compact rows, and true-black content surfaces.

## Foundations

- dark semantic tokens and mono scale;
- self-hosted interface and mono fonts;
- `cn` class merger;
- shared page, panel, row, label, focus, status, and typography recipes;
- safe error descriptor model.

## Shared controls

- Button with stable loading text, and ButtonGroup;
- Input, Textarea, Label, Checkbox, Select, Switch;
- Form field, description, and error association;
- Dialog, AlertDialog, Popover, DropdownMenu, Tooltip;
- Avatar, Badge, Breadcrumb, Button, Card, Chart, Checkbox, Drawer, DropdownMenu, Input, Label, Select, Separator, Sheet, Sidebar, static Skeleton, Sonner, Table, Tabs, Toggle, ToggleGroup, Tooltip;
- typed TanStack Table v9 building blocks with sorting, pagination, column visibility, keyboard row navigation, and background-refresh state;
- Badge and status text;
- Calendar, date input, time input, date-time, timezone selector, and date range;
- Toast/status announcement and ErrorPage;
- skeleton without continuous animation.

## Product compositions

- `ApplicationLayout`, `AppSidebar`, `AppSidebarHeader`, `AppSidebarGroup`, `AppSidebarLink`, `AppSidebarFooter`, `AccountMenu`, `TenantAccountSettingsDialog`, `AuthShell`, `FocusedShell`, and `PageHeading` are published shared compositions. `ApplicationLayout` accepts a typed complete breadcrumb path, while `PageHeading` accepts an optional typed parent link rendered as an icon-only chevron. `createCtx9Applications` owns the fixed Secrets, Publisher, Testimonials ordering. `AppSidebarHeader` owns the CTX9 grid mark and All apps menu. Product navigation stays text-only.
- `@ctx9/ui/icon.svg` is the canonical self-contained CTX9 browser icon copied into each Next application's `app/icon.svg`.
- `NavigationProvider` and `NavigationLink` form the framework-neutral link adapter. Next consumers supply `next/link` once at the provider boundary.
- `AppShell`, `OperationalList`, `OperationalRow`, `LoadingButton`, and `FunkyLoaderButton` were removed in the v4 breaking release. Products use `ApplicationLayout`, `DataTable`, and `Button` directly.
- The shared tenant and account dialog owns layout, motion, focus, and typed tab identifiers. Host applications provide authorized tab content through their same-origin BFF. Authentication, enrollment, recovery, member and invitation forms, artifact viewers, and protected-action boundaries remain owner-specific compositions built from shared controls.
- Unavailable, denied, not-found, renderer-error, loading, and empty states use the shared state primitives.

Animated/public-marketing Aceternity components, product-specific Impression recipes, editor/social components, and light-mode variants are excluded.
