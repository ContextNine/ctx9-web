"use client";

import type { ButtonHTMLAttributes } from "react";
import * as React from "react";
import { Check } from "lucide-react";
import { Button } from "./button.js";
import { cn } from "./cn.js";

type ColorSwatchProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "className" | "style" | "children" | "color" | "rel"
> & {
  color: string;
  variant: "trigger" | "preset";
  selected?: boolean;
  layer?: "default" | "raised";
  className?: never;
  style?: never;
};

/** Private color-picker actions consume the chosen color, not caller styles. */
export const ColorSwatch = React.forwardRef<
  HTMLButtonElement,
  ColorSwatchProps
>(({ color, variant, selected = false, layer = "default", ...props }, ref) => {
  if (variant === "trigger") {
    return (
      <Button
        {...props}
        ref={ref}
        preset="mainIcon"
        variant="secondary"
        className={cn("block", layer === "raised" && "z-10")}
        style={{ backgroundColor: color }}
      >
        <div />
      </Button>
    );
  }

  return (
    <button
      {...props}
      ref={ref}
      className="w-6 h-6 rounded-full relative"
      style={{ backgroundColor: color }}
    >
      {selected && (
        <Check className="w-4 h-4 text-white absolute inset-0 m-auto" />
      )}
    </button>
  );
});
ColorSwatch.displayName = "ColorSwatch";
