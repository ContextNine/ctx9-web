"use client";

import { Toggle as TogglePrimitive } from "@base-ui/react/toggle";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "./cn.js";

export const toggleVariants = cva(
  "inline-flex min-h-8 min-w-8 items-center justify-center gap-1 rounded-md px-2 text-sm font-medium text-muted-foreground outline-none transition-colors hover:bg-sidebar-hover hover:text-foreground focus-visible:ring-2 focus-visible:ring-focus disabled:pointer-events-none disabled:text-disabled aria-pressed:bg-selected aria-pressed:text-foreground",
  {
    variants: {
      variant: {
        default: "border border-transparent",
        outline: "border border-border bg-black",
      },
      size: {
        sm: "min-h-7 min-w-7 text-xs",
        default: "min-h-8 min-w-8",
        lg: "min-h-9 min-w-9",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

export function Toggle({
  className,
  variant,
  size,
  ...props
}: TogglePrimitive.Props & VariantProps<typeof toggleVariants>) {
  return (
    <TogglePrimitive
      data-slot="toggle"
      className={cn(toggleVariants({ variant, size }), className)}
      {...props}
    />
  );
}
