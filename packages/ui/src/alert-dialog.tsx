"use client";

import * as React from "react";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";

import { cn } from "./cn.js";
import { buttonVariants } from "./button.js";

const AlertDialog = AlertDialogPrimitive.Root;

type OwnedAppearance<Props> = Omit<Props, "className" | "style"> & {
  className?: never;
  style?: never;
};

const AlertDialogTrigger = React.forwardRef<
  React.ComponentRef<typeof AlertDialogPrimitive.Trigger>,
  OwnedAppearance<
    React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Trigger>
  >
>((props, ref) => (
  <AlertDialogPrimitive.Trigger
    {...props}
    ref={ref}
    className={undefined}
    style={undefined}
  />
));
AlertDialogTrigger.displayName = AlertDialogPrimitive.Trigger.displayName;

const AlertDialogPortal = AlertDialogPrimitive.Portal;

const AlertDialogOverlay = React.forwardRef<
  React.ComponentRef<typeof AlertDialogPrimitive.Overlay>,
  OwnedAppearance<
    React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay>
  >
>((props, ref) => (
  <AlertDialogPrimitive.Overlay
    {...props}
    className={cn(
      "fixed inset-0 z-40 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
    )}
    style={undefined}
    ref={ref}
  />
));
AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName;

const AlertDialogContent = React.forwardRef<
  React.ComponentRef<typeof AlertDialogPrimitive.Content>,
  OwnedAppearance<
    React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content>
  >
>((props, ref) => (
  <AlertDialogPortal>
    <AlertDialogOverlay />
    <AlertDialogPrimitive.Content
      {...props}
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
      )}
      style={undefined}
    />
  </AlertDialogPortal>
));
AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName;

const AlertDialogHeader = (
  props: OwnedAppearance<React.HTMLAttributes<HTMLDivElement>>,
) => (
  <div
    {...props}
    className={cn("flex flex-col space-y-2 text-center sm:text-left")}
    style={undefined}
  />
);
AlertDialogHeader.displayName = "AlertDialogHeader";

const AlertDialogFooter = (
  props: OwnedAppearance<React.HTMLAttributes<HTMLDivElement>>,
) => (
  <div
    {...props}
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
    )}
    style={undefined}
  />
);
AlertDialogFooter.displayName = "AlertDialogFooter";

const AlertDialogTitle = React.forwardRef<
  React.ComponentRef<typeof AlertDialogPrimitive.Title>,
  OwnedAppearance<
    React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title>
  >
>((props, ref) => (
  <AlertDialogPrimitive.Title
    {...props}
    ref={ref}
    className="text-lg font-semibold"
    style={undefined}
  />
));
AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName;

const AlertDialogDescription = React.forwardRef<
  React.ComponentRef<typeof AlertDialogPrimitive.Description>,
  OwnedAppearance<
    React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description>
  >
>((props, ref) => (
  <AlertDialogPrimitive.Description
    {...props}
    ref={ref}
    className="text-sm text-muted-foreground"
    style={undefined}
  />
));
AlertDialogDescription.displayName =
  AlertDialogPrimitive.Description.displayName;

const AlertDialogAction = React.forwardRef<
  React.ComponentRef<typeof AlertDialogPrimitive.Action>,
  OwnedAppearance<
    React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action>
  >
>((props, ref) => (
  <AlertDialogPrimitive.Action
    {...props}
    ref={ref}
    className={cn(buttonVariants())}
    style={undefined}
  />
));
AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName;

const AlertDialogCancel = React.forwardRef<
  React.ComponentRef<typeof AlertDialogPrimitive.Cancel>,
  OwnedAppearance<
    React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel>
  >
>((props, ref) => (
  <AlertDialogPrimitive.Cancel
    {...props}
    ref={ref}
    className={cn(buttonVariants({ variant: "secondary" }), "mt-2 sm:mt-0")}
    style={undefined}
  />
));
AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName;

export {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
};
