"use client";

import type { VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "./cn.js";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { cva } from "class-variance-authority";
import { CheckIcon } from "lucide-react";

import {
  checkboxBlackWhiteStyles,
  checkboxBrandStyles,
} from "./impression-recipes.js";

const checkboxVariants = cva("", {
  variants: {
    variant: {
      brand: checkboxBrandStyles,
      blackWhite: checkboxBlackWhiteStyles,
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
  defaultVariants: { variant: "brand", interaction: "default" },
});

type CheckboxVariant = "brand" | "blackWhite" | "dailyGoal";

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
>(({ interaction, variant = "brand", ...props }, ref) => {
  return (
    <CheckboxPrimitive.Root
      {...props}
      ref={ref}
      className={cn(checkboxVariants({ interaction, variant }))}
      style={undefined}
    >
      <CheckboxPrimitive.Indicator className="flex items-center justify-center text-current">
        <CheckIcon size={16} strokeWidth={3} />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
});
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox, type CheckboxVariant };
