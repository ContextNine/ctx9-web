"use client";

import * as React from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";

import { cn } from "./cn.js";
import { cva, type VariantProps } from "class-variance-authority";

const separatorVariants = cva("shrink-0 bg-border", {
  variants: {
    tone: {
      default: "",
      neutral: "bg-neutral-200 dark:bg-neutral-800",
      muted: "bg-muted-foreground",
      sidebar: "bg-sidebar-border",
      editor: "bg-neutral-200 dark:bg-mono-700",
    },
    visibility: {
      default: "",
      toggleHover: "opacity-100 group-hover/ToggleButton:opacity-0",
    },
  },
});

const Separator = React.forwardRef<
  React.ComponentRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root> &
    VariantProps<typeof separatorVariants>
>(
  (
    {
      className,
      tone,
      visibility,
      orientation = "horizontal",
      decorative = true,
      ...props
    },
    ref,
  ) => (
    <SeparatorPrimitive.Root
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      className={cn(
        separatorVariants({ tone, visibility }),
        orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
        className,
      )}
      {...props}
    />
  ),
);
Separator.displayName = SeparatorPrimitive.Root.displayName;

export { Separator };
