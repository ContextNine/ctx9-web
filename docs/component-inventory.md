# Component inventory

The v8 inventory uses Impression's internal application components and semantic variants. CTX9 applications use the same light and dark token contract and may default to dark.

## Foundations

- shared light and dark semantic tokens and mono scale;
- self-hosted Geist 1.5.1 and Impression's Inter asset, including its `font-mono` mapping;
- `cn` class merger;
- shared page, panel, row, label, focus, status, and typography recipes;
- safe error descriptor model.

## Shared controls

- Button with stable loading text, and ButtonGroup;
- Input, Textarea, Label, Checkbox, Select, Switch;
- MultipleSelector with keyboard selection, async search, grouping, fixed choices, and typed single-row and selection-tone variants. Its private remove/clear actions own their classes; consumers cannot override nested input, command, or button appearance.
- Form field, description, and error association;
- Dialog, AlertDialog, Popover, DropdownMenu, Tooltip;
- Avatar, Badge, Breadcrumb, Button, Card, Chart, Checkbox, DropdownMenu, Input, Label, Select, Separator, Sheet, Sidebar, Skeleton, Sonner, Table, Tabs, Toggle, ToggleGroup, Tooltip;
- typed TanStack Table v8 building blocks with sorting, pagination, column visibility, keyboard row navigation, and background-refresh state;
- resizable panel groups, panels, and keyboard-accessible handles, aligned with Impression's assistant sidebar;
- Badge and status text;
- Calendar, date input, time input, date-time, timezone selector, and date range;
- Toast/status announcement and ErrorPage;
- Skeleton uses Impression's existing pulse animation.

## Product compositions

- `ApplicationLayout`, `AppSidebar`, `AppSidebarHeader`, `AppSidebarGroup`, `AppSidebarLink`, `AppSidebarFooter`, `AccountMenu`, `TenantAccountSettingsDialog`, `AuthShell`, `FocusedShell`, and `PageHeading` are published shared compositions. `ApplicationLayout` accepts a typed complete breadcrumb path, while `PageHeading` accepts an optional typed parent link rendered as an icon-only chevron. `createCtx9Applications` owns the fixed Secrets, Publisher, Testimonials ordering. `AppSidebarHeader` owns the CTX9 grid mark and All apps menu. Product navigation stays text-only.
- `@ctx9/ui/icon.svg` is the canonical self-contained CTX9 browser icon copied into each Next application's `app/icon.svg`.
- `NavigationProvider` and `NavigationLink` form the framework-neutral link adapter. Next consumers supply `next/link` once at the provider boundary.
- `AppShell`, `OperationalList`, `OperationalRow`, `LoadingButton`, and `FunkyLoaderButton` were removed in the v4 breaking release. Products use `ApplicationLayout`, `DataTable`, and `Button` directly.
- The shared tenant and account dialog owns layout, motion, focus, and typed tab identifiers. Host applications provide authorized tab content through their same-origin BFF. Authentication, enrollment, recovery, member and invitation forms, artifact viewers, and protected-action boundaries remain owner-specific compositions built from shared controls.
- Unavailable, denied, not-found, renderer-error, loading, and empty states use the shared state primitives.

Impression public-marketing components, product-specific recipes, and editor/social components are excluded. Light and dark internal variants are included.

The unused Sheet-based Drawer aliases are removed in v8. None of the four migration consumers or Impression imports Drawer. Impression's unused Vaul implementation is not ported. Mobile navigation continues to use the shared Sheet implementation.
