"use client";

import * as React from "react";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./sheet.js";
import { cn } from "./cn.js";

export const Drawer = Sheet;
export const DrawerTrigger = SheetTrigger;
export const DrawerClose = SheetClose;
export const DrawerTitle = SheetTitle;
export const DrawerDescription = SheetDescription;
export const DrawerHeader = SheetHeader;
export const DrawerFooter = SheetFooter;

export const DrawerContent = React.forwardRef<
  React.ComponentRef<typeof SheetContent>,
  React.ComponentPropsWithoutRef<typeof SheetContent>
>(({ className, children, ...props }, ref) => (
  <SheetContent
    ref={ref}
    side="bottom"
    className={cn(
      "max-h-[85dvh] overflow-y-auto rounded-t-lg px-1 pb-4",
      className,
    )}
    {...props}
  >
    <div
      aria-hidden="true"
      className="mx-auto mt-2 h-1 w-12 rounded-full bg-border-strong"
    />
    {children}
  </SheetContent>
));
DrawerContent.displayName = "DrawerContent";
