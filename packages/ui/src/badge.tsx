import * as React from "react";
import { cva } from "class-variance-authority";
import type { VariantProps } from "class-variance-authority";

import { cn } from "./cn.js";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        success: "border-success/30 bg-success/10 text-success",
        warning: "border-warning/30 bg-warning/10 text-warning",
        connectionActive:
          "border-transparent bg-brandBlue/20 text-mono-900 hover:bg-brandBlue/20 dark:bg-brandBlue/20 dark:text-mono-100 dark:hover:bg-brandBlue/20",
        connectionIdle:
          "border-neutral-300 bg-neutral-100 text-mono-700 hover:bg-neutral-100 dark:border-mono-700 dark:bg-mono-900 dark:text-mono-300 dark:hover:bg-mono-900",
        outline: "text-foreground",
      },
      width: {
        default: "",
        fit: "w-fit shrink-0",
      },
      preset: {
        default: "",
        compact: "rounded-full px-2 py-0.5 text-xs",
        compactCapitalize: "rounded-full px-2 py-0.5 text-xs capitalize",
        tinyCapitalize: "rounded-full px-2 py-0.5 text-[10px] capitalize",
        inverseCount:
          "rounded-full border-transparent bg-mono-900 px-2 py-0.5 text-[10px] font-semibold text-white dark:bg-mono-200 dark:text-mono-950",
        filterCount: "rounded-full px-1.5 py-0 text-[10px]",
        tableLabel: "px-1.5 text-muted-foreground",
        tableStatus: "flex gap-1 px-1.5 text-muted-foreground [&_svg]:size-3",
        tabCount:
          "flex h-5 w-5 items-center justify-center rounded-full bg-muted-foreground/30",
        metric: "flex gap-1 rounded-lg text-xs",
        statusLabel: "text-[11px] uppercase tracking-wide",
        selection:
          "data-[disabled]:bg-muted-foreground data-[disabled]:text-muted data-[disabled]:hover:bg-muted-foreground data-[fixed]:bg-muted-foreground data-[fixed]:text-muted data-[fixed]:hover:bg-muted-foreground",
        warningCompact:
          "rounded-full border-amber-200 bg-amber-50 px-2 py-0.5 text-xs font-semibold text-amber-800 dark:border-amber-900 dark:bg-amber-950/60 dark:text-amber-200",
      },
      selectionTone: {
        default: "",
        muted: "bg-neutral-600 dark:bg-mono-200",
      },
      active: { true: "", false: "" },
    },
    compoundVariants: [
      {
        preset: "filterCount",
        active: true,
        className: "bg-white/20 text-white dark:bg-black/10 dark:text-mono-900",
      },
      {
        preset: "filterCount",
        active: false,
        className:
          "bg-neutral-100 text-mono-600 dark:bg-mono-800 dark:text-mono-200",
      },
    ],
    defaultVariants: {
      variant: "default",
      active: false,
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({
  className,
  variant,
  width,
  preset,
  selectionTone,
  active,
  ...props
}: BadgeProps) {
  return (
    <div
      className={cn(
        badgeVariants({ variant, width, preset, selectionTone, active }),
        className,
      )}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
