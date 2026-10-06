# @ctx9/ui

Impression-aligned controls and application compositions for internal products, with one light theme and one dark theme. Import `@ctx9/ui/styles.css` exactly once in the application root.

```tsx
import "@ctx9/ui/styles.css";
import {
  ApplicationLayout,
  AuthShell,
  Button,
  DataTable,
  Input,
  NavigationProvider,
} from "@ctx9/ui";
```

The package owns:

- typed Impression component variants and shared style enforcement;
- a typed TanStack Table v8 composition for real operational rows;
- calendar, time, timezone, date-time, and date-range controls;
- loading, empty, denied, unavailable, and error states;
- a responsive collapsible sidebar, complete route breadcrumbs, service switcher, account menu, and focused or two-column authentication shells;
- an icon-only parent action for detail-page headings and the canonical CTX9 favicon at `@ctx9/ui/icon.svg`;
- a framework-neutral link adapter. Next applications supply `next/link` through `NavigationProvider`.

Applications own product row types, columns, URL state, and mutations. Shared components own keyboard behavior, focus, overflow, and light/dark styling. Select variants instead of supplying appearance classes, and run `ctx9-ui-style-check` over application sources.

Animations are allowed. Keep Impression's existing spinning action loader and
pulsing skeletons when migrating their usages.
