"use client";

import type { VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "./cn.js";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { cva } from "class-variance-authority";
import { CheckIcon, MinusIcon } from "lucide-react";

const checkboxVariants = cva("", {
  variants: {
    variant: {
      neutral: cn(
        "peer size-4 shrink-0 cursor-pointer rounded border border-neutral-300 bg-transparent text-white shadow-sm transition-colors dark:border-mono-600",
        "data-[state=checked]:border-mono-900 data-[state=checked]:bg-mono-900 data-[state=indeterminate]:border-mono-900 data-[state=indeterminate]:bg-mono-900",
        "dark:data-[state=checked]:border-mono-100 dark:data-[state=checked]:bg-mono-100 dark:data-[state=checked]:text-mono-900 dark:data-[state=indeterminate]:border-mono-100 dark:data-[state=indeterminate]:bg-mono-100 dark:data-[state=indeterminate]:text-mono-900",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      ),
      dailyGoal: cn(
        "h-8 w-8 rounded-md border-2 transition-all duration-300 ease-out",
        "data-[state=unchecked]:border-ns-green-bg-dark/35 data-[state=unchecked]:bg-white/80 data-[state=unchecked]:text-ns-green-bg-dark/65",
        "data-[state=unchecked]:hover:scale-105 data-[state=unchecked]:hover:border-ns-green-bg-dark/60 data-[state=unchecked]:hover:bg-ns-green-bg-dark/10",
        "data-[state=checked]:border-ns-green-bg-dark data-[state=checked]:bg-ns-green-bg-dark data-[state=checked]:text-white",
        "data-[state=checked]:shadow-[0_0_0_3px_rgba(57,153,24,0.14)] data-[state=checked]:hover:scale-105",
        "dark:data-[state=unchecked]:border-ns-green-bg-dark/60 dark:data-[state=unchecked]:bg-mono-950/70 dark:data-[state=unchecked]:text-ns-green-bg/75",
        "dark:data-[state=unchecked]:hover:border-ns-green-bg dark:data-[state=unchecked]:hover:bg-ns-green-bg-dark/20",
        "dark:data-[state=checked]:border-ns-green-bg dark:data-[state=checked]:bg-ns-green-bg dark:data-[state=checked]:text-mono-950",
      ),
    },
    interaction: {
      default: "",
      none: "pointer-events-none",
    },
  },
  defaultVariants: { variant: "neutral", interaction: "default" },
});

type CheckboxVariant = "neutral" | "dailyGoal";

interface CheckboxProps
  extends Omit<
      React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>,
      "className" | "style"
    >,
    VariantProps<typeof checkboxVariants> {
  variant?: CheckboxVariant;
  className?: never;
  style?: never;
}

const Checkbox = React.forwardRef<
  React.ComponentRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ interaction, variant = "neutral", ...props }, ref) => {
  return (
    <CheckboxPrimitive.Root
      {...props}
      ref={ref}
      className={cn(checkboxVariants({ interaction, variant }))}
      style={undefined}
    >
      <CheckboxPrimitive.Indicator className="group flex items-center justify-center text-current">
        <CheckIcon
          className="group-data-[state=indeterminate]:hidden"
          size={variant === "dailyGoal" ? 16 : 14}
          strokeWidth={variant === "dailyGoal" ? 3 : 2.5}
        />
        <MinusIcon
          className="hidden group-data-[state=indeterminate]:block"
          size={14}
          strokeWidth={2.5}
        />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
});
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox, type CheckboxVariant };
