import { cva } from "class-variance-authority";

import { standardCommandItemStyle } from "./impression-recipes.js";

export type MenuVariant = "standard" | "panel" | "compact" | "bare";

export const menuContentVariants = cva("", {
  variants: {
    variant: {
      standard: "",
      panel: "border bg-popover text-popover-foreground shadow-2xl",
      compact:
        "rounded-md border bg-popover p-1 text-popover-foreground shadow-lg",
      bare: "border-0 bg-transparent p-0 shadow-none",
    },
  },
  defaultVariants: { variant: "standard" },
});

export const menuItemVariants = cva(
  "outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
  {
    variants: {
      variant: {
        standard: standardCommandItemStyle,
        panel:
          "rounded-sm px-2 py-1.5 focus:bg-accent focus:text-accent-foreground",
        compact:
          "rounded-sm px-2 py-1 text-xs focus:bg-accent focus:text-accent-foreground",
        bare: "rounded-none p-0",
      },
    },
    defaultVariants: { variant: "standard" },
  },
);
