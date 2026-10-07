# Component inventory

The v8 inventory uses Impression's internal application components and semantic variants. CTX9 applications use the same light and dark token contract and may default to dark.

## Foundations

- shared light and dark semantic tokens and mono scale;
- self-hosted Geist 1.5.1 and Impression's Inter asset, including its `font-mono` mapping;
- `cn` class merger;
- shared page, panel, row, label, focus, status, and typography recipes;
- safe error descriptor model.

## Shared controls

- Button with stable loading text, ButtonGroup, and Impression's animated
  FunkyLoaderButton with typed loading and gradient options;
- FunkyLoaderButton's growing-row width owns the existing full-width flex
  composition used by paired actions;
- ShimmerBorderButton owns the existing rotating gradient, hover motion and
  pricing/upgrade/top-up recipes. It rejects class/style overrides. Pricing
  loaders likewise own their established appearance through a typed preset;
- FunkyLoaderButton has its own typed presets for Impression's existing
  recovery, compact, large, fixed-width, responsive and form-submit actions.
  These preserve the original recipes without consumer appearance classes;
- Grouped scheduling/generation actions use loader start, end and chevron
  presets. Standalone round, accent and card-icon actions also have owned
  presets; loading and gradient behavior remain unchanged.
- Tooltip-backed generation groups, the composer send action and compact
  selected content actions have loader-owned presets. The shared medium
  shape retains the tooltip loader's rounded default; private tooltip
  behavior and framework markers remain in Impression.
- Primary tooltip icons own their compact dimensions, padding and hover
  recipe through a Button preset, with the standard typed selected state.
- Content icon and external-link actions use Button presets for the
  established 32px, 28px and 24px recipes. Dropdown rows retain their
  existing full-width, start-aligned preset. Tooltip behavior stays local.
- AppButtonProps and AuthButtonProps constrain product wrappers to their own
  surface and variant family without copying the Button contract;
- Compact editor, media, dismissal, filter and preview actions have owned
  Button presets. Selection, copied-state emphasis and hover cursors use
  typed choices; standard dimensions, padding and defaults remain unchanged.
- Filter/selection triggers, inline actions, compact generation chips and
  editor rail icons have owned presets. Typed rail density replaces injected
  important size classes; active and shimmer-loading states retain their
  established recipes without changing Button defaults or animations.
- Table, calendar, timezone, carousel, command and side-tab actions also own
  their existing recipes. Product wrappers retain typed placement, navigation
  state and behavior. Loader upgrade presets preserve existing blue actions,
  expanded/collapsed content and loading animations.
- Workspace options and sidebar menu, settings and upload actions use Button
  presets. The sidebar prop owns expanded/collapsed sizing and alignment;
  selected and dragging states remain typed choices. Product navigation and
  file-upload behavior stay in the consumer.
- Connection palettes and accent/neutral loader navigation presets own their
  existing colors, transitions, sizing and alignment. Domain-to-palette maps,
  OAuth, post creation and cursor-only availability behavior stay local.
- Chat thread creation, overflow menus, suggestions and draft actions use
  Button presets. Thread selection, menu state and message generation stay
  in the consumer; hover and group-reveal appearance belong to the component.
- Assistant icon, scroll, send, menu, edit, modal, attachment and recording
  presets own their established dimensions, padding and interaction colors.
  Assistant runtime state and tooltip content remain in the consumer.
- Input, Textarea, Label, Checkbox, Select, Switch;
- ColorPicker retains Impression's hex field, two-dimensional color/hue
  controls, default palette and selected swatch. Private color actions own
  dynamic background data and reject arbitrary appearance. The input ref and
  blur callback, disabled trigger and modal/portal placement stay supported.
- Textarea's `code` and `codeOverlay` presets own code-field appearance. The
  overlay inherits editor typography and accepts gutter geometry through the
  containing editor's `--code-overlay-padding`; highlighting and editing
  workflows stay in the product. `scroll="hidden"` supports content-driven
  fields without changing the standard auto-resize height limit.
- MultipleSelector with keyboard selection, async search, grouping, fixed choices, and typed single-row and selection-tone variants. Its private remove/clear actions own their classes; consumers cannot override nested input, command, or button appearance.
- Form field, description, and error association;
- Form owns recurring choice-row, settings-label, compact-entity and disclosure
  content recipes through typed layout and preset props. Disclosure and example
  actions use Button variants, including the existing animated disclosure;
  example actions reject caller class/style overrides.
- NumberSelect owns the small previous/next buttons, adjacent value previews,
  numeric input and dragging cursor. It retains Impression's bounded editing,
  arrow-key and mouse/touch drag behavior without consumer appearance props.
  Its optional fit width owns the existing compact placement in settings.
- Dialog, AlertDialog, Popover, DropdownMenu, Tooltip;
- AlertDialog owns its overlay, content, header, footer, title, description,
  primary action and cancellation styling. Its existing responsive layout,
  animations and Radix focus behavior are retained; these controls reject
  caller class/style overrides, including on the trigger.
- Avatar, Badge, Breadcrumb, Button, Card, Chart, Checkbox, DropdownMenu, Input, Label, Select, Separator, Sheet, Sidebar, Skeleton, Sonner, Table, Tabs, Toggle, ToggleGroup, Tooltip;
- typed TanStack Table v8 building blocks with sorting, pagination, column visibility, keyboard row navigation, and background-refresh state;
- resizable panel groups, panels, and keyboard-accessible handles, aligned with Impression's assistant sidebar;
- Badge with semantic success, warning and destructive variants, and status text;
- Calendar, date input, time input, date-time, timezone selector, and date range;
- Existing date-time trigger layouts use Button presets and typed empty/intended
  states. Products compose date selection and scheduling without passing trigger
  appearance classes or border flags.
- Toast/status announcement and ErrorPage;
- Sonner retains its original animated loading spinner. The pre-v8 static-dot
  override is removed with the retired no-spinner restriction.
- InlineStatus has semantic neutral, success, warning and danger tones.
  PopoverContent's `notice` variant owns compact explanatory-message spacing.
- Skeleton uses Impression's existing pulse animation.
- Tabs own the existing compact, settings, subtle and sidebar recipes through
  variants, with typed trigger gaps. TabsContent owns the existing surface,
  main-panel, padded-panel, growing and active-fill recipes;
  product content and navigation state remain in the consumer.

## Product compositions

- `ApplicationLayout`, `AppSidebar`, `AppSidebarHeader`, `AppSidebarGroup`, `AppSidebarLink`, `AppSidebarFooter`, `AccountMenu`, `TenantAccountSettingsDialog`, `AuthShell`, `FocusedShell`, and `PageHeading` are published shared compositions. `ApplicationLayout` accepts a typed complete breadcrumb path, while `PageHeading` accepts an optional typed parent link rendered as an icon-only chevron. `createCtx9Applications` owns the fixed Secrets, Publisher, Testimonials ordering. `AppSidebarHeader` owns the CTX9 grid mark and All apps menu. Product navigation stays text-only.
- `@ctx9/ui/icon.svg` is the canonical self-contained CTX9 browser icon copied into each Next application's `app/icon.svg`.
- `NavigationProvider` and `NavigationLink` form the framework-neutral link adapter. Next consumers supply `next/link` once at the provider boundary.
- `AppShell`, `OperationalList`, `OperationalRow`, and `LoadingButton` were removed in the v4 breaking release. Products use `ApplicationLayout`, `DataTable`, and `Button` directly. The v8 `FunkyLoaderButton` comes from Impression's current component, not the retired pre-v4 implementation.
- The shared tenant and account dialog owns layout, motion, focus, and typed tab identifiers. Host applications provide authorized tab content through their same-origin BFF. Authentication, enrollment, recovery, member and invitation forms, artifact viewers, and protected-action boundaries remain owner-specific compositions built from shared controls.
- Unavailable, denied, not-found, renderer-error, loading, and empty states use the shared state primitives.

Impression public-marketing components, product-specific recipes, and editor/social components are excluded. Light and dark internal variants are included.

The unused Sheet-based Drawer aliases are removed in v8. None of the four migration consumers or Impression imports Drawer. Impression's unused Vaul implementation is not ported. Mobile navigation continues to use the shared Sheet implementation.

Publisher metadata editing uses SheetContent's `metadata` variant and bordered
SheetHeader/SheetFooter variants. The shared component owns panel sizing, border
and spacing rules; default Sheet output remains unchanged. Shared style checks
cover the sheet header, footer, title and description as well as its content.
