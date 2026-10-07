"use client";

import type { VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "./cn.js";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cva } from "class-variance-authority";

import {
  panelTabStyles,
  panelTabTextStyles,
  tabsBgStyles,
  hoverSideTabsStyles,
} from "./impression-recipes.js";

const Tabs = TabsPrimitive.Root;

const tabsListVariants = cva("inline-flex items-center justify-center", {
  variants: {
    variant: {
      default: "h-10 rounded-md bg-muted p-1 text-muted-foreground",
      panel: cn(
        "h-9 rounded-md p-1 text-mono-600 dark:text-mono-400",
        tabsBgStyles,
      ),
      bare: "h-auto rounded-none bg-transparent p-0 text-muted-foreground",
      compact:
        "h-8 gap-1 rounded-xl border border-neutral-200 bg-white/90 p-1 text-muted-foreground dark:border-mono-800 dark:bg-mono-950/95",
      subtle:
        "h-9 rounded-md bg-neutral-100 p-1 text-muted-foreground dark:bg-mono-900",
      settings:
        "flex h-9 w-fit flex-grow grid-cols-3 justify-between rounded-md bg-muted p-1 text-muted-foreground",
      sidebar:
        "flex h-auto w-full flex-col items-stretch gap-1 rounded-md bg-transparent p-0 text-muted-foreground",
    },
  },
  defaultVariants: { variant: "default" },
});

const tabsTriggerVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "rounded-sm px-3 py-1.5 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
        panel: cn(panelTabStyles, panelTabTextStyles, "px-3 py-1.5"),
        bare: "rounded-none p-0 data-[state=active]:bg-transparent data-[state=active]:shadow-none",
        compact:
          "h-6 gap-1 rounded-lg px-2 py-1.5 text-[11px] data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
        settings:
          "h-8 flex-grow rounded-sm px-3 py-1.5 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
        sidebar: cn(
          "h-auto w-full items-start justify-start whitespace-normal rounded-xl px-3 py-3 text-left shadow-none",
          hoverSideTabsStyles,
          "data-[state=active]:bg-neutral-150 data-[state=active]:text-black data-[state=active]:shadow-none dark:data-[state=active]:bg-mono-850 dark:data-[state=active]:text-white",
        ),
      },
      gap: {
        default: "",
        tight: "gap-1",
        standard: "gap-2",
      },
    },
    defaultVariants: { variant: "default", gap: "default" },
  },
);

const TabsList = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> &
    VariantProps<typeof tabsListVariants>
>(({ className, variant, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(tabsListVariants({ variant }), className)}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> &
    VariantProps<typeof tabsTriggerVariants>
>(({ className, variant, gap, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(tabsTriggerVariants({ variant, gap }), className)}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const tabsContentVariants = cva(
  "mt-0 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        default: "",
        surface: "mt-2 h-full w-full rounded-2xl p-6 shadow-input",
        mainPanel: "m-0 mt-0 w-full h-0 focus-visible:h-full px-1",
      },
      padding: {
        none: "",
        comfortable: "p-4",
        responsive: "px-4 lg:px-6",
      },
      layout: {
        default: "",
        grow: "min-h-0 flex-1",
        activeFill:
          "data-[state=active]:h-full data-[state=active]:flex-1 data-[state=active]:overflow-hidden",
      },
    },
    defaultVariants: { variant: "default", padding: "none", layout: "default" },
  },
);

const TabsContent = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content> &
    VariantProps<typeof tabsContentVariants>
>(({ className, variant, padding, layout, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    suppressHydrationWarning
    className={cn(tabsContentVariants({ variant, padding, layout }), className)}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export {
  Tabs,
  TabsList,
  tabsListVariants,
  TabsTrigger,
  tabsTriggerVariants,
  TabsContent,
  tabsContentVariants,
};
