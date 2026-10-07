"use client";

import type { VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "./cn.js";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cva } from "class-variance-authority";
import { Info } from "lucide-react";
import { Button } from "./button.js";

import {
  tooltipContentBareStyles,
  tooltipContentCompactStyles,
  tooltipContentStandardStyles,
} from "./impression-recipes.js";

const TooltipProvider = function TooltipProvider(
  props: TooltipPrimitive.TooltipProviderProps,
) {
  return <TooltipPrimitive.Provider delayDuration={30} {...props} />;
};

const Tooltip = TooltipPrimitive.Root;

const TooltipTrigger = TooltipPrimitive.Trigger;

const tooltipContentVariants = cva(
  "z-60 m-0 mt-1 text-sm font-normal animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
  {
    variants: {
      variant: {
        standard: tooltipContentStandardStyles,
        compact: tooltipContentCompactStyles,
        bare: tooltipContentBareStyles,
      },
      preset: {
        default: "",
        action: "m-0 mt-1 p-1 text-center align-middle text-sm font-normal",
        details: "flex whitespace-normal break-words font-normal",
        centered: "flex justify-center",
        timing:
          "[&_svg]:!hidden rounded-lg border bg-popover px-3 py-2 text-popover-foreground shadow-md",
        source: "max-w-xs text-left",
        upload: "max-w-[320px] whitespace-normal text-left leading-snug",
      },
      layer: { default: "", standard: "z-50", foreground: "z-90" },
      spacing: { default: "", relaxed: "p-3", roomy: "p-4" },
      width: {
        default: "",
        fixed: "w-[400px]",
        medium: "max-w-[360px]",
        compact: "max-w-xs",
        sidebar: "max-w-[250px]",
        quarter: "w-64",
        narrow: "max-w-[300px]",
        billing: "w-[270px]",
        wide: "w-full max-w-[550px] min-w-[450px]",
      },
    },
    defaultVariants: { variant: "standard" },
  },
);

const TooltipContent = React.forwardRef<
  React.ComponentRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content> &
    VariantProps<typeof tooltipContentVariants>
>(
  (
    {
      className,
      sideOffset = 4,
      variant,
      preset,
      layer,
      spacing,
      width,
      ...props
    },
    ref,
  ) => (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        ref={ref}
        sideOffset={sideOffset}
        className={cn(
          tooltipContentVariants({ variant, preset, layer, spacing, width }),
          className,
        )}
        {...props}
      />
    </TooltipPrimitive.Portal>
  ),
);
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

/** Explanatory text beside a heading, available on hover, focus, and touch. */
export function InfoTooltip({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = React.useState(false);
  return (
    <TooltipProvider>
      <Tooltip open={open} onOpenChange={setOpen}>
        <TooltipTrigger asChild>
          <Button
            type="button"
            variant="ghost"
            size="iconSm"
            aria-label={label}
            onClick={(event) => {
              event.preventDefault();
              setOpen(true);
            }}
          >
            <Info aria-hidden="true" className="size-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent preset="details" width="compact">
          {children}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  tooltipContentVariants,
  TooltipProvider,
};
