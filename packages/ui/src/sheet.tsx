"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import * as React from "react";

import { Button } from "./button.js";
import { cn } from "./cn.js";

export const Sheet = DialogPrimitive.Root;
export const SheetTrigger = DialogPrimitive.Trigger;
export const SheetClose = DialogPrimitive.Close;

export const SheetContent = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
    side?: "top" | "right" | "bottom" | "left";
    showCloseButton?: boolean;
  }
>(
  (
    { className, children, side = "right", showCloseButton = true, ...props },
    ref,
  ) => (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/70" />
      <DialogPrimitive.Content
        ref={ref}
        data-slot="sheet-content"
        data-side={side}
        className={cn(
          "fixed z-50 flex max-h-dvh flex-col gap-4 border-border bg-popover text-foreground shadow-xl outline-none",
          "data-[side=right]:inset-y-0 data-[side=right]:right-0 data-[side=right]:w-[min(26rem,88vw)] data-[side=right]:border-l",
          "data-[side=left]:inset-y-0 data-[side=left]:left-0 data-[side=left]:w-[min(26rem,88vw)] data-[side=left]:border-r",
          "data-[side=top]:inset-x-0 data-[side=top]:top-0 data-[side=top]:border-b",
          "data-[side=bottom]:inset-x-0 data-[side=bottom]:bottom-0 data-[side=bottom]:border-t",
          className,
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <DialogPrimitive.Close asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute top-3 right-3 size-8"
            >
              <X aria-hidden="true" className="size-4" />
              <span className="sr-only">Close</span>
            </Button>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  ),
);
SheetContent.displayName = "SheetContent";

export function SheetHeader({
  className,
  ...props
}: React.ComponentProps<"header">) {
  return <header className={cn("grid gap-1 p-4", className)} {...props} />;
}

export function SheetFooter({
  className,
  ...props
}: React.ComponentProps<"footer">) {
  return (
    <footer
      className={cn("mt-auto flex flex-col gap-2 p-4", className)}
      {...props}
    />
  );
}

export const SheetTitle = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn("text-base font-semibold", className)}
    {...props}
  />
));
SheetTitle.displayName = "SheetTitle";

export const SheetDescription = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
SheetDescription.displayName = "SheetDescription";
