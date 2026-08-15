# @ctx9/ui

Dark-only shared controls and Workbench compositions for CTX9 internal products. Import `@ctx9/ui/styles.css` exactly once in the application root.

```tsx
import "@ctx9/ui/styles.css";
import {
  ApplicationShell,
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
- focused authentication and Workbench application shells.

Applications compose these primitives for product-specific workflows. They do not copy the package source or create local replacements for standard controls.
