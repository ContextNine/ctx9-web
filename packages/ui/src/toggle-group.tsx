"use client";

import { Toggle as TogglePrimitive } from "@base-ui/react/toggle";
import { ToggleGroup as ToggleGroupPrimitive } from "@base-ui/react/toggle-group";
import type { VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "./cn.js";
import { toggleVariants } from "./toggle.js";

type ToggleOptions = VariantProps<typeof toggleVariants>;
const ToggleGroupContext = React.createContext<ToggleOptions>({});

export function ToggleGroup({
  className,
  variant,
  size,
  children,
  ...props
}: ToggleGroupPrimitive.Props & ToggleOptions) {
  return (
    <ToggleGroupPrimitive
      data-slot="toggle-group"
      className={cn("flex w-fit items-center gap-1", className)}
      {...props}
    >
      <ToggleGroupContext.Provider value={{ variant, size }}>
        {children}
      </ToggleGroupContext.Provider>
    </ToggleGroupPrimitive>
  );
}

export function ToggleGroupItem({
  className,
  variant,
  size,
  ...props
}: TogglePrimitive.Props & ToggleOptions) {
  const context = React.useContext(ToggleGroupContext);
  return (
    <TogglePrimitive
      data-slot="toggle-group-item"
      className={cn(
        toggleVariants({
          variant: context.variant ?? variant,
          size: context.size ?? size,
        }),
        className,
      )}
      {...props}
    />
  );
}
