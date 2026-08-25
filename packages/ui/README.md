# @ctx9/ui

Dark-only shared controls and Impression-style sidebar compositions for CTX9 internal products. Import `@ctx9/ui/styles.css` exactly once in the application root.

```tsx
import "@ctx9/ui/styles.css";
import {
  AppShell,
  AuthShell,
  Button,
  Input,
  OperationalList,
  OperationalRow,
} from "@ctx9/ui";
```

The package owns:

- buttons, inputs, labels, checkbox, switch, select, and form relationships;
- dialogs, alerts, popovers, dropdowns, tooltips, and command menus;
- tabs, tables, pagination, scroll areas, separators, badges, and status feedback;
- calendar, time, timezone, date-time, and date-range controls;
- loading, empty, denied, unavailable, and error states;
- responsive authenticated sidebar, account/tenant menu, and focused or two-column authentication shells.

Applications compose these primitives for product-specific workflows. They do not copy the package source or create local replacements for standard controls.
