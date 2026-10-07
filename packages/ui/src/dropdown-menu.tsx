"use client";

import type { VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "./cn.js";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { cva } from "class-variance-authority";
import { Check, ChevronRight, Circle } from "lucide-react";

import type { ControlShape } from "./control-shape.js";
import type { ControlSurface } from "./control-variants.js";
import type { MenuVariant } from "./menu-variants.js";
import { controlShapeClassNames } from "./control-shape.js";
import { menuContentVariants, menuItemVariants } from "./menu-variants.js";
import { hoverStyles, sidebarTextStyles } from "./impression-recipes.js";

const dropdownContentLayoutVariants = cva("", {
  variants: {
    width: {
      default: "",
      full: "w-full",
      fit: "w-fit",
      narrow: "w-32",
      menu: "w-40",
      medium: "w-48",
      wide: "w-56",
      panel: "w-64",
      "200": "w-[200px]",
      "210": "w-[210px]",
      "220": "w-[220px]",
      "230": "w-[230px]",
      "240": "w-[240px]",
      "270": "w-[270px]",
      "280": "w-[280px]",
      "360": "w-[360px]",
      responsive230: "w-[calc(100vw-2rem)] max-w-[230px] sm:w-[230px]",
      responsive360: "w-[calc(100vw-2rem)] max-w-[360px] sm:w-[360px]",
    },
    height: {
      default: "",
      full: "h-full",
    },
    layout: {
      default: "",
      column: "flex flex-col",
      growingColumn: "flex flex-grow flex-col",
    },
    spacing: {
      default: "",
      none: "p-0",
      compact: "p-1",
      comfortable: "p-2",
      vertical: "p-0 py-4",
    },
    groupSpacing: {
      none: "",
      compact: "space-y-1",
      comfortable: "space-y-2",
    },
    layer: {
      default: "",
      content: "z-30",
      editor: "z-[60]",
      overlay: "z-100",
    },
    overflow: {
      default: "",
      visible: "overflow-visible",
    },
    maxWidth: {
      default: "",
      narrow: "max-w-[180px]",
    },
    tone: {
      default: "",
      editor: "bg-white dark:bg-black",
    },
    preset: {
      default: "",
      account: "w-max min-w-[320px] max-w-[calc(100vw-1rem)] rounded-lg p-1.5",
      appSwitcher: "w-[230px] rounded-lg p-1.5",
    },
  },
  defaultVariants: {
    width: "default",
    height: "default",
    layout: "default",
    spacing: "default",
    groupSpacing: "none",
    layer: "default",
    overflow: "default",
    maxWidth: "default",
    tone: "default",
    preset: "default",
  },
});

const dropdownItemLayoutVariants = cva("", {
  variants: {
    layout: {
      default: "",
      between: "flex items-center justify-between gap-3",
    },
    gap: {
      none: "",
      standard: "gap-2",
    },
    spacing: {
      default: "",
      comfortable: "px-3 py-2",
    },
    cursor: {
      default: "",
      pointer: "cursor-pointer",
    },
    preset: {
      default: "",
      accountAction:
        "grid min-h-9 cursor-pointer grid-cols-[1rem_minmax(0,1fr)] gap-2 rounded-md px-2 text-sm",
      tenant: "min-h-12 cursor-pointer gap-2 rounded-md p-1",
      application: "min-h-9 cursor-pointer gap-2 rounded-md px-2 text-sm",
    },
  },
  defaultVariants: {
    layout: "default",
    gap: "none",
    spacing: "default",
    cursor: "default",
    preset: "default",
  },
});

const dropdownCheckboxItemVariants = cva("", {
  variants: {
    size: {
      default: "",
      compact: "h-8 py-1 pl-7",
      touch: "min-h-[44px] py-0 pl-7 pr-2",
    },
    transform: {
      default: "",
      capitalize: "capitalize",
    },
  },
  defaultVariants: { size: "default", transform: "default" },
});

interface DropdownMenuStyleContextValue {
  surface: ControlSurface;
  variant: MenuVariant;
}

const DropdownMenuStyleContext =
  React.createContext<DropdownMenuStyleContextValue>({
    surface: "app",
    variant: "standard",
  });

type DropdownMenuProps = React.ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.Root
> & {
  surface?: ControlSurface;
  variant?: MenuVariant;
};

const DropdownMenu = ({
  surface = "app",
  variant = "standard",
  ...props
}: DropdownMenuProps) => (
  <DropdownMenuStyleContext.Provider value={{ surface, variant }}>
    <DropdownMenuPrimitive.Root {...props} />
  </DropdownMenuStyleContext.Provider>
);

const DropdownMenuTrigger = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Trigger> & {
    preset?: "default" | "workspace";
    sidebar?: "expanded" | "collapsed" | "sheet";
  }
>(({ className, preset = "default", sidebar = "collapsed", ...props }, ref) => (
  <DropdownMenuPrimitive.Trigger
    ref={ref}
    className={
      cn(
        preset === "workspace" && [
          "flex items-center transition-[margin] duration-150 ease-in-out",
          hoverStyles,
          sidebarTextStyles,
          sidebar === "expanded"
            ? "ml-3 mr-3 w-fit justify-between space-x-2"
            : sidebar === "sheet"
              ? "mx-auto justify-center space-x-2"
              : "mx-auto justify-center",
          "rounded-bl-[60px] rounded-tl-[60px] rounded-br-[60px] rounded-tr-[60px]",
        ],
        className,
      ) || undefined
    }
    {...props}
  />
));
DropdownMenuTrigger.displayName = DropdownMenuPrimitive.Trigger.displayName;

const DropdownMenuGroup = DropdownMenuPrimitive.Group;

const DropdownMenuPortal = DropdownMenuPrimitive.Portal;

const DropdownMenuSub = DropdownMenuPrimitive.Sub;

const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

const DropdownMenuSubTrigger = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {
    inset?: boolean;
  }
>(({ className, inset, children, ...props }, ref) => (
  <DropdownMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[state=open]:bg-accent focus:bg-accent",
      inset && "pl-8",
      className,
    )}
    {...props}
  >
    {children}
    <ChevronRight className="ml-auto h-4 w-4" />
  </DropdownMenuPrimitive.SubTrigger>
));
DropdownMenuSubTrigger.displayName =
  DropdownMenuPrimitive.SubTrigger.displayName;

const DropdownMenuSubContent = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.SubContent
    ref={ref}
    className={cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className,
    )}
    {...props}
  />
));
DropdownMenuSubContent.displayName =
  DropdownMenuPrimitive.SubContent.displayName;

const DropdownMenuContent = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content> &
    VariantProps<typeof dropdownContentLayoutVariants> & {
      shape?: ControlShape;
      variant?: MenuVariant;
    }
>(
  (
    {
      className,
      sideOffset = 4,
      align = "start",
      groupSpacing,
      height,
      layer,
      layout,
      overflow,
      preset,
      maxWidth,
      shape,
      spacing,
      tone,
      variant,
      width,
      ...props
    },
    ref,
  ) => {
    const style = React.useContext(DropdownMenuStyleContext);
    return (
      <DropdownMenuPrimitive.Portal>
        <DropdownMenuPrimitive.Content
          ref={ref}
          align={align}
          sideOffset={sideOffset}
          className={cn(
            "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-2xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
            menuContentVariants({ variant: variant ?? style.variant }),
            dropdownContentLayoutVariants({
              groupSpacing,
              height,
              layer,
              layout,
              maxWidth,
              overflow,
              preset,
              spacing,
              tone,
              width,
            }),
            shape && controlShapeClassNames[shape],
            className,
          )}
          {...props}
        />
      </DropdownMenuPrimitive.Portal>
    );
  },
);
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;

const DropdownMenuItem = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
    inset?: boolean;
    shape?: ControlShape;
    tone?: "default" | "destructive";
    variant?: MenuVariant;
  } & VariantProps<typeof dropdownItemLayoutVariants>
>(
  (
    {
      className,
      cursor,
      gap,
      inset,
      layout,
      preset,
      shape,
      spacing,
      tone = "default",
      variant,
      ...props
    },
    ref,
  ) => {
    const style = React.useContext(DropdownMenuStyleContext);
    return (
      <DropdownMenuPrimitive.Item
        ref={ref}
        data-inset={inset}
        data-tone={tone}
        data-variant={tone}
        className={cn(
          "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50 focus:bg-accent focus:text-accent-foreground",
          tone === "destructive" && "text-destructive focus:text-destructive",
          inset && "pl-8",
          menuItemVariants({ variant: variant ?? style.variant }),
          dropdownItemLayoutVariants({ cursor, gap, layout, preset, spacing }),
          shape && controlShapeClassNames[shape],
          className,
        )}
        {...props}
      />
    );
  },
);
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;

const DropdownMenuCheckboxItem = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem> & {
    isRadio?: boolean;
  } & VariantProps<typeof dropdownCheckboxItemVariants>
>(
  (
    {
      className,
      children,
      checked,
      isRadio = false,
      size,
      transform,
      ...props
    },
    ref,
  ) => (
    <DropdownMenuPrimitive.CheckboxItem
      ref={ref}
      className={cn(
        "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50 hover:cursor-pointer focus:bg-accent focus:text-accent-foreground",
        dropdownCheckboxItemVariants({ size, transform }),
        className,
      )}
      {...(checked === undefined ? {} : { checked })}
      {...props}
    >
      <span
        className={cn(
          "absolute left-2 flex h-4 w-4 items-center justify-center",
          (isRadio || checked) && "border",
        )}
      >
        <DropdownMenuPrimitive.ItemIndicator>
          <Check className="h-4 w-4" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.CheckboxItem>
  ),
);
DropdownMenuCheckboxItem.displayName =
  DropdownMenuPrimitive.CheckboxItem.displayName;

const DropdownMenuRadioItem = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <DropdownMenuPrimitive.RadioItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50 focus:bg-accent focus:text-accent-foreground",
      className,
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Circle className="h-2 w-2 fill-current" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.RadioItem>
));
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;

const DropdownMenuLabel = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {
    inset?: boolean;
    truncate?: boolean;
  }
>(({ className, inset, truncate, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={cn(
      "px-2 py-1.5 text-sm font-semibold",
      inset && "pl-8",
      truncate && "max-w-[190px] truncate",
      className,
    )}
    {...props}
  />
));
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;

const DropdownMenuSeparator = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
));
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;

const DropdownMenuShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn("ml-auto text-xs tracking-widest opacity-60", className)}
      {...props}
    />
  );
};
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
};
