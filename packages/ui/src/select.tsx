"use client";

import * as React from "react";
import { cn } from "./cn.js";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown, ChevronUp } from "lucide-react";

import type { ControlShape } from "./control-shape.js";
import type { ControlSurface } from "./control-variants.js";
import type { MenuVariant } from "./menu-variants.js";
import { PortalBoundary } from "./portal-boundary.js";
import {
  buttonStyles,
  defaultButtonStyles,
  defaultInputBackgroundStyles,
  outlineButtonStyles,
  sidebarTextStyles,
} from "./impression-recipes.js";
import { controlShapeClassNames } from "./control-shape.js";
import { controlVariants } from "./control-variants.js";
import { menuContentVariants, menuItemVariants } from "./menu-variants.js";

export type AppSelectVariant =
  | "default"
  | "compact"
  | "analytics"
  | "analyticsSoft"
  | "bare";
export type AuthSelectVariant = "default" | "bare";
export type SelectSize = "sm" | "default" | "md" | "lg";
export type SelectWidth =
  | "auto"
  | "full"
  | "fit"
  | "20"
  | "40"
  | "44"
  | "65"
  | "135"
  | "140"
  | "160"
  | "170"
  | "172"
  | "180"
  | "200"
  | "220"
  | "240"
  | "250";

const selectTriggerSizeClassNames: Record<SelectSize, string> = {
  sm: "h-8 px-2",
  default: "h-9 px-3",
  md: "h-10 px-3",
  lg: "h-12 px-4",
};

const selectTriggerWidthClassNames: Record<SelectWidth, string> = {
  auto: "",
  full: "w-full",
  fit: "w-fit",
  "20": "w-20",
  "40": "w-40",
  "44": "w-44",
  "65": "w-[65px]",
  "135": "w-[135px] min-w-[135px]",
  "140": "w-[140px]",
  "160": "w-[160px]",
  "170": "w-[170px]",
  "172": "w-[172px]",
  "180": "w-[180px]",
  "200": "w-[200px]",
  "220": "w-[220px]",
  "240": "w-[240px]",
  "250": "w-[250px]",
};

interface SelectStyleContextValue {
  shape: ControlShape;
  size: SelectSize;
  surface: ControlSurface;
  variant: AppSelectVariant | AuthSelectVariant;
}

const SelectStyleContext = React.createContext<SelectStyleContextValue>({
  shape: "default",
  size: "default",
  surface: "app",
  variant: "default",
});

interface AppSelectAppearance {
  surface?: "app";
  variant?: AppSelectVariant;
}
interface AuthSelectAppearance {
  surface: "auth";
  variant?: AuthSelectVariant;
}

export type SelectProps = React.ComponentPropsWithoutRef<
  typeof SelectPrimitive.Root
> &
  (AppSelectAppearance | AuthSelectAppearance) & {
    shape?: ControlShape;
    size?: SelectSize;
  };

const Select = ({
  shape = "default",
  size,
  surface = "app",
  variant = "default",
  ...props
}: SelectProps) => {
  const resolvedSize =
    size ??
    (variant === "compact"
      ? "sm"
      : variant === "analytics" || variant === "analyticsSoft"
        ? "md"
        : "default");
  return (
    <SelectStyleContext.Provider
      value={{ shape, size: resolvedSize, surface, variant }}
    >
      <SelectPrimitive.Root {...props} />
    </SelectStyleContext.Provider>
  );
};

const SelectGroup = SelectPrimitive.Group;

const SelectValue = SelectPrimitive.Value;

const SelectTrigger = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> & {
    shape?: ControlShape;
    size?: SelectSize;
    width?: SelectWidth;
    weight?: "default" | "medium" | "normal";
    status?: "default" | "error";
    minWidth?: "default" | "none" | "194";
    preset?: "default" | "outline" | "sidebar" | "tableCompact";
    focus?: "default" | "accent" | "noRing";
  }
>(
  (
    {
      className,
      children,
      focus = "default",
      minWidth = "default",
      preset = "default",
      shape,
      size,
      status = "default",
      weight = "default",
      width = "auto",
      ...props
    },
    ref,
  ) => {
    const style = React.useContext(SelectStyleContext);
    const resolvedShape = shape ?? style.shape;
    const resolvedSize = size ?? style.size;
    const controlVariant = style.variant === "bare" ? "bare" : "default";

    return (
      <SelectPrimitive.Trigger
        ref={ref}
        className={cn(
          "flex w-full items-center justify-between whitespace-nowrap text-sm data-[placeholder]:text-muted-foreground focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
          controlVariants({
            surface: style.surface,
            variant: controlVariant,
            size: "auto",
          }),
          selectTriggerSizeClassNames[resolvedSize],
          style.surface === "app" &&
            controlVariant === "default" &&
            defaultInputBackgroundStyles,
          (style.variant === "analytics" ||
            style.variant === "analyticsSoft") &&
            "rounded-xl border-border/70 bg-background text-sm",
          style.variant === "analyticsSoft" && "bg-background/90",
          controlShapeClassNames[resolvedShape],
          selectTriggerWidthClassNames[width],
          weight === "medium" && "font-medium",
          weight === "normal" && "font-normal",
          status === "error" && "border-destructive",
          minWidth === "none" && "min-w-0",
          minWidth === "194" && "min-w-[194px]",
          preset === "outline" && cn(defaultButtonStyles, outlineButtonStyles),
          preset === "sidebar" && cn(sidebarTextStyles, buttonStyles),
          preset === "tableCompact" && "h-8",
          focus === "accent" && "focus:bg-accent focus:text-accent-foreground",
          focus === "noRing" && "focus:ring-0",
          className,
        )}
        {...props}
      >
        {children}
        <SelectPrimitive.Icon asChild>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>
    );
  },
);
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const SelectScrollUpButton = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className,
    )}
    {...props}
  >
    <ChevronUp className="h-4 w-4" />
  </SelectPrimitive.ScrollUpButton>
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;

const SelectScrollDownButton = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className,
    )}
    {...props}
  >
    <ChevronDown className="h-4 w-4" />
  </SelectPrimitive.ScrollDownButton>
));
SelectScrollDownButton.displayName =
  SelectPrimitive.ScrollDownButton.displayName;

const SelectContent = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content> & {
    insideModal?: boolean;
    variant?: MenuVariant;
    shape?: ControlShape;
    layer?: "default" | "modal";
    minWidth?: "default" | "180";
  }
>(
  (
    {
      className,
      children,
      insideModal = false,
      layer = "default",
      minWidth = "default",
      position = "popper",
      shape,
      variant,
      ...props
    },
    ref,
  ) => {
    const style = React.useContext(SelectStyleContext);
    const inheritedMenuVariant: MenuVariant =
      style.variant === "compact"
        ? "compact"
        : style.variant === "bare"
          ? "bare"
          : "standard";

    return (
      <PortalBoundary insideModal={insideModal} portal={SelectPrimitive.Portal}>
        <SelectPrimitive.Content
          ref={ref}
          className={cn(
            "relative z-50 max-h-[--radix-select-content-available-height] min-w-[8rem] origin-[--radix-select-content-transform-origin] overflow-y-auto overflow-x-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
            position === "popper" &&
              "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
            menuContentVariants({ variant: variant ?? inheritedMenuVariant }),
            (style.variant === "analytics" ||
              style.variant === "analyticsSoft") &&
              "rounded-xl",
            shape && controlShapeClassNames[shape],
            layer === "modal" && "z-[1000]",
            minWidth === "180" && "min-w-[180px]",
            className,
          )}
          position={position}
          {...props}
        >
          <SelectScrollUpButton />
          <SelectPrimitive.Viewport
            className={cn(
              "p-1",
              position === "popper" &&
                "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]",
            )}
          >
            {children}
          </SelectPrimitive.Viewport>
          <SelectScrollDownButton />
        </SelectPrimitive.Content>
      </PortalBoundary>
    );
  },
);
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectLabel = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn("px-2 py-1.5 text-sm font-semibold", className)}
    {...props}
  />
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;

const SelectItem = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item> & {
    shape?: ControlShape;
    variant?: MenuVariant;
  }
>(({ className, children, shape, variant, ...props }, ref) => {
  const style = React.useContext(SelectStyleContext);
  const inheritedMenuVariant: MenuVariant =
    style.variant === "compact"
      ? "compact"
      : style.variant === "bare"
        ? "bare"
        : "standard";

  return (
    <SelectPrimitive.Item
      ref={ref}
      className={cn(
        "relative flex w-full cursor-default select-none items-center pr-8 text-sm",
        menuItemVariants({ variant: variant ?? inheritedMenuVariant }),
        (style.variant === "analytics" || style.variant === "analyticsSoft") &&
          "rounded-lg text-sm",
        shape && controlShapeClassNames[shape],
        className,
      )}
      {...props}
    >
      <span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <Check className="h-4 w-4" />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
});
SelectItem.displayName = SelectPrimitive.Item.displayName;

const SelectSeparator = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
};
