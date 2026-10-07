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
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, width, ...props }: BadgeProps) {
  return (
    <div
      className={cn(badgeVariants({ variant, width }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
