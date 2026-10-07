"use client";

import * as React from "react";
import { cn } from "./cn.js";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { motion } from "framer-motion";

import { PortalBoundary } from "./portal-boundary.js";

const Popover = PopoverPrimitive.Root;

const PopoverTrigger = PopoverPrimitive.Trigger;

export type PopoverContentVariant = "standard" | "panel" | "notice";

const popoverContentVariantClassNames: Record<PopoverContentVariant, string> = {
  standard: "",
  panel:
    "w-full max-w-lg rounded-lg border bg-popover p-0 text-popover-foreground sm:min-w-96",
  notice: "max-w-sm",
};

const popoverContentPresetClassNames = {
  default: "",
  choice:
    "w-fit min-w-[140px] rounded-lg border bg-popover p-1 text-popover-foreground",
  explanation:
    "w-[340px] max-w-[calc(100vw-2rem)] rounded-2xl border border-neutral-200 bg-white p-0 shadow-xl dark:border-mono-800 dark:bg-mono-950",
  filter: "w-[260px] p-0",
  spacedFilter: "w-[280px] space-y-3 p-3",
  platform: "z-[100] w-48 p-1",
  paddedPanel:
    "w-full max-w-lg rounded-lg border bg-popover p-3 text-popover-foreground sm:min-w-96",
  editorPanel: "w-xl rounded-lg border bg-popover p-0 text-popover-foreground",
  compact: "w-auto p-1",
  auto: "w-auto p-0",
  automation: "w-[420px]",
  dateTime: "mt-0 w-full p-0",
  timezone: "w-[300px] p-0",
  confirmation: "z-50 w-80 p-4",
  position: "z-100 w-40 p-1",
} as const;

const PopoverContent = React.forwardRef<
  React.ComponentRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content> & {
    noBg?: boolean;
    insideModal?: boolean;
    variant?: PopoverContentVariant;
    preset?: keyof typeof popoverContentPresetClassNames;
  }
>(
  (
    {
      className,
      align = "center",
      sideOffset = 4,
      noBg = false,
      insideModal = false,
      variant = "standard",
      preset = "default",
      ...props
    },
    ref,
  ) => (
    <PortalBoundary insideModal={insideModal} portal={PopoverPrimitive.Portal}>
      <PopoverPrimitive.Content
        ref={ref}
        align={align}
        sideOffset={sideOffset}
        className={cn(
          "z-[50] w-64 outline-none",
          "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          popoverContentVariantClassNames[variant],
          popoverContentPresetClassNames[preset],
          className,
          "flex w-full max-w-2xl items-center justify-center border-0 bg-transparent p-0 shadow-none dark:border-0",
        )}
        {...props}
        onOpenAutoFocus={(e) => {
          // Prevent auto-focusing the first focusable element
          e.preventDefault();
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.85 }}
          transition={{
            duration: 0.2,
            scale: { duration: 0.2, ease: "easeOut" },
          }}
          className={cn(
            "w-full max-w-lg rounded-lg border bg-popover p-0 text-popover-foreground shadow-2xl sm:min-w-64",
            popoverContentVariantClassNames[variant],
            variant === "notice" && "p-3 text-sm leading-relaxed sm:min-w-0",
            popoverContentPresetClassNames[preset],
            className,
            noBg && "border-0 bg-transparent shadow-none",
          )}
        >
          {props.children}
        </motion.div>
      </PopoverPrimitive.Content>
    </PortalBoundary>
  ),
);
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

const PopoverAnchor = PopoverPrimitive.Anchor;
export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor };
