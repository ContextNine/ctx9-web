"use client";

import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";
import * as React from "react";
import { cva } from "class-variance-authority";
import type { VariantProps } from "class-variance-authority";
import { cn } from "./cn.js";

const rootVariants = cva("", {
  variants: {
    preset: {
      default: "",
      full: "w-full",
      reasoning: "group/reasoning-root aui-reasoning-root mb-4 w-full",
      toolGroup:
        "aui-tool-group-root group/tool-group w-full group/tool-group-root",
      toolFallback:
        "aui-tool-fallback-root group/tool-fallback-root w-full rounded-lg border py-3",
    },
    variant: { outline: "", ghost: "", muted: "" },
  },
  compoundVariants: [
    {
      preset: "reasoning",
      variant: "outline",
      className: "rounded-lg border px-3 py-2",
    },
    {
      preset: "reasoning",
      variant: "muted",
      className: "rounded-lg bg-muted/50 px-3 py-2",
    },
    {
      preset: "toolGroup",
      variant: "outline",
      className: "rounded-lg border py-3",
    },
    {
      preset: "toolGroup",
      variant: "muted",
      className:
        "rounded-lg border border-muted-foreground/30 bg-muted/30 py-3",
    },
    {
      preset: "toolFallback",
      variant: "muted",
      className: "border-muted-foreground/30 bg-muted/30",
    },
  ],
  defaultVariants: { preset: "default", variant: "outline" },
});

export type CollapsibleProps = Omit<
  React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Root>,
  "className" | "style"
> &
  VariantProps<typeof rootVariants> & { animationDuration?: number };

const Collapsible = React.forwardRef<
  React.ComponentRef<typeof CollapsiblePrimitive.Root>,
  CollapsibleProps
>(({ preset, variant, animationDuration, ...props }, ref) => (
  <CollapsiblePrimitive.Root
    {...props}
    ref={ref}
    className={rootVariants({ preset, variant }) || undefined}
    style={
      animationDuration === undefined
        ? undefined
        : ({
            "--animation-duration": `${animationDuration.toString()}ms`,
          } as React.CSSProperties)
    }
  />
));
Collapsible.displayName = CollapsiblePrimitive.Root.displayName;

const triggerVariants = cva("", {
  variants: {
    preset: {
      default: "",
      sidebar: "mb-1 [&[data-state=open]>div>div>svg]:rotate-180",
      group:
        "flex w-full items-center justify-between rounded-md border border-black/10 bg-background/70 px-3 py-2 text-left text-xs font-medium transition-colors hover:bg-background",
      reasoning:
        "aui-reasoning-trigger group/trigger flex max-w-[75%] items-center gap-2 py-1 text-muted-foreground text-sm transition-colors hover:text-foreground",
      toolGroup:
        "aui-tool-group-trigger group/trigger flex items-center gap-2 text-sm transition-colors group-data-[variant=outline]/tool-group-root:w-full group-data-[variant=outline]/tool-group-root:px-4 group-data-[variant=muted]/tool-group-root:w-full group-data-[variant=muted]/tool-group-root:px-4",
      toolFallback:
        "aui-tool-fallback-trigger group/trigger flex w-full items-center gap-2 px-4 text-sm transition-colors",
    },
  },
  defaultVariants: { preset: "default" },
});

export type CollapsibleTriggerProps = Omit<
  React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Trigger>,
  "className" | "style"
> &
  VariantProps<typeof triggerVariants>;

const CollapsibleTrigger = React.forwardRef<
  React.ComponentRef<typeof CollapsiblePrimitive.Trigger>,
  CollapsibleTriggerProps
>(({ preset, ...props }, ref) => (
  <CollapsiblePrimitive.Trigger
    {...props}
    ref={ref}
    className={triggerVariants({ preset }) || undefined}
    style={undefined}
  />
));
CollapsibleTrigger.displayName = CollapsiblePrimitive.Trigger.displayName;

const animatedContent =
  "group/collapsible-content ease-out data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down data-[state=closed]:fill-mode-forwards data-[state=closed]:pointer-events-none data-[state=open]:duration-(--animation-duration) data-[state=closed]:duration-(--animation-duration)";
const contentVariants = cva("", {
  variants: {
    preset: {
      default: "",
      settings: "space-y-10 pt-8",
      group: "space-y-[6px] pt-[6px]",
      sidebar:
        "data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down overflow-hidden",
      formDisclosure: "overflow-hidden pt-2",
      reasoning: cn(
        "aui-reasoning-content relative overflow-hidden text-muted-foreground text-sm outline-none",
        animatedContent,
      ),
      toolGroup: cn(
        "aui-tool-group-content relative overflow-hidden text-sm outline-none",
        animatedContent,
      ),
      toolFallback: cn(
        "aui-tool-fallback-content relative overflow-hidden text-sm outline-none",
        animatedContent,
      ),
    },
    motion: { instant: "", animated: "" },
    layout: { default: "", indented: "", fields: "" },
  },
  compoundVariants: [
    {
      preset: "formDisclosure",
      motion: "animated",
      className:
        "data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down motion-reduce:animate-none",
    },
    {
      preset: "formDisclosure",
      layout: "indented",
      className: "my-0 mt-1 pl-2",
    },
    { preset: "formDisclosure", layout: "fields", className: "space-y-4" },
  ],
  defaultVariants: { preset: "default" },
});

export type CollapsibleContentProps = Omit<
  React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Content>,
  "className" | "style"
> &
  VariantProps<typeof contentVariants>;

const CollapsibleContent = React.forwardRef<
  React.ComponentRef<typeof CollapsiblePrimitive.Content>,
  CollapsibleContentProps
>(({ preset, motion, layout, ...props }, ref) => (
  <CollapsiblePrimitive.Content
    {...props}
    ref={ref}
    className={cn(contentVariants({ preset, motion, layout })) || undefined}
    style={undefined}
  />
));
CollapsibleContent.displayName = CollapsiblePrimitive.Content.displayName;

const CollapsibleCount = React.forwardRef<
  HTMLSpanElement,
  Omit<React.ComponentPropsWithoutRef<"span">, "className" | "style">
>((props, ref) => (
  <span
    {...props}
    ref={ref}
    className="rounded-full bg-black/5 px-2 py-[2px] text-[11px] text-muted-foreground"
    style={undefined}
  />
));
CollapsibleCount.displayName = "CollapsibleCount";

export {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
  CollapsibleCount,
};
