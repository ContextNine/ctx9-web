# @ctx9/ui

Dark-only shadcn controls and Operational Dense application compositions for CTX9 internal products. Import `@ctx9/ui/styles.css` exactly once in the application root.

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

- the shadcn `dashboard-01` component family adapted to CTX9 tokens;
- a typed TanStack Table v9 composition for real operational rows;
- calendar, time, timezone, date-time, and date-range controls;
- static loading, empty, denied, unavailable, and error states;
- a responsive collapsible sidebar, complete route breadcrumbs, service switcher, account menu, and focused or two-column authentication shells;
- an icon-only parent action for detail-page headings and the canonical CTX9 favicon at `@ctx9/ui/icon.svg`;
- a framework-neutral link adapter. Next applications supply `next/link` through `NavigationProvider`.

Applications own product row types, columns, URL state, and mutations. Shared components own keyboard behavior, focus, overflow, and dark styling.
