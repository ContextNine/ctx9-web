"use client";

import type { VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "./cn.js";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cva } from "class-variance-authority";
import { X } from "lucide-react";

import {
  panelBgStyles,
  scrollbarStyles,
  sidebarTextStyles,
} from "./impression-recipes.js";
import { tiempos7xlHeadingStyles } from "./impression-recipes.js";

const Dialog = DialogPrimitive.Root;

const DialogTrigger = DialogPrimitive.Trigger;

const DialogPortal = DialogPrimitive.Portal;

const DialogClose = DialogPrimitive.Close;

const defaultDialogContentStyles =
  "max-w-lg gap-1 p-8 shadow-2xl dark:border dark:border-t-mono-700 lg:rounded-lg";

const dialogContentVariants = cva(
  "relative z-20 grid w-full overflow-hidden bg-background duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
  {
    variants: {
      variant: {
        default: defaultDialogContentStyles,
        panel:
          "max-w-2xl rounded-lg border bg-popover p-0 text-popover-foreground shadow-2xl",
        compact: "max-w-md gap-1 rounded-lg border p-6 shadow-xl",
        confirmation: cn(
          "max-w-lg gap-1 border border-white p-16 shadow-[0px_8px_40px_20px_#00000022,0px_6px_15px_5px_#00000024,0px_3px_40px_2px_#00000030] dark:border-neutral-600 dark:border-t-neutral-400",
          panelBgStyles,
        ),
        bare: "max-w-2xl border-0 bg-transparent p-0 shadow-none",
        floating: cn(
          defaultDialogContentStyles,
          "flex h-fit w-fit max-w-6xl gap-0 p-10 dark:border dark:border-t-mono-700 sm:rounded-lg",
        ),
        brandForm: cn(
          defaultDialogContentStyles,
          "fixed border border-white bg-neutral-10 p-10 shadow-[0px_8px_40px_20px_#00000022,0px_6px_15px_5px_#00000024,0px_3px_40px_2px_#00000030] dark:border-neutral-600 dark:border-t-neutral-400 dark:bg-mono-950 lg:min-w-xl",
        ),
        motion: cn(
          defaultDialogContentStyles,
          "flex w-full max-w-2xl items-center justify-center overflow-visible border-0 bg-transparent p-0 shadow-none dark:border-0 sm:min-w-[450px]",
        ),
        settingsWorkspace: cn(
          defaultDialogContentStyles,
          "flex justify-center gap-0 bg-transparent p-0",
        ),
        tenantSettings: cn(
          defaultDialogContentStyles,
          "h-[calc(100dvh-1rem)] max-h-[calc(100dvh-1rem)] max-w-[calc(100vw-1rem)] gap-0 overflow-hidden rounded-lg bg-panel p-0 sm:h-[92dvh] sm:max-h-[92dvh] sm:w-[90vw] sm:max-w-[1600px]",
        ),
        fullScreen: cn(
          defaultDialogContentStyles,
          "m-0 flex max-w-full gap-0 rounded-none border-0 bg-transparent p-0 shadow-none dark:border-0",
        ),
        extensionFullScreen: cn(
          defaultDialogContentStyles,
          "m-0 max-w-full gap-0 rounded-none border-0 bg-transparent p-0 shadow-none",
        ),
        attachmentPreview: cn(
          defaultDialogContentStyles,
          "aui-attachment-preview-dialog-content [&>button]:ring-0! p-2 sm:max-w-3xl [&>button]:rounded-full [&>button]:bg-foreground/60 [&>button]:p-1 [&>button]:opacity-100 [&_svg]:text-background [&>button]:hover:[&_svg]:text-destructive",
        ),
        command: cn(
          defaultDialogContentStyles,
          "overflow-hidden p-0 shadow-lg",
        ),
        menu: cn(
          defaultDialogContentStyles,
          "max-w-sm border p-2 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
        ),
      },
      spacing: {
        none: "p-0",
        tight: "p-2",
        compact: "p-4",
        relaxed: "p-6",
        comfortable: "p-8",
        roomy: "p-10",
        spacious: "p-16",
      },
      size: {
        default: "",
        wide: "lg:min-w-xl",
        large: "max-w-2xl",
        xlarge: "max-w-3xl",
        fourXl: "max-w-4xl",
        fiveXl: "max-w-5xl",
        xl: "max-w-xl",
        medium: "max-w-md",
        small: "max-w-sm",
        preview: "max-w-[760px]",
        modalLg: "sm:max-w-lg",
        modal500: "sm:max-w-[500px]",
        modal525: "sm:max-w-[525px]",
        modal600: "sm:max-w-[600px]",
        modal700: "sm:max-w-[700px]",
      },
      viewport: {
        default: "",
        scroll80: cn("max-h-[80vh] overflow-y-auto", scrollbarStyles),
        scroll85: cn("max-h-[85vh] overflow-auto", scrollbarStyles),
        scrollY85: "max-h-[85vh] overflow-y-auto",
        scroll90: "max-h-[90vh] overflow-y-auto",
        hidden85: "max-h-[85vh] overflow-hidden",
      },
      layout: {
        default: "",
        column: "flex-col",
      },
      layer: {
        default: "",
        consent: "z-[3001]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      viewport: "default",
      layout: "default",
      layer: "default",
    },
  },
);

const DialogOverlay = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay> & {
    overlay?: boolean;
  }
>(({ className, overlay = true, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-40 grid max-h-screen place-items-center",
      overlay && "bg-black/30 backdrop-blur-sm",
      "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className,
    )}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
    showCloseIcon?: boolean;
    overlay?: boolean;
    dialogOverlayClassName?: string;
  } & VariantProps<typeof dialogContentVariants>
>(
  (
    {
      className,
      children,
      showCloseIcon = true,
      overlay = true,
      dialogOverlayClassName,
      variant,
      spacing,
      size,
      viewport,
      layout,
      layer,
      ...props
    },
    ref,
  ) => (
    <DialogPortal>
      <DialogOverlay overlay={overlay} className={dialogOverlayClassName}>
        <DialogPrimitive.Content
          ref={ref}
          className={cn(
            dialogContentVariants({
              variant,
              spacing,
              size,
              viewport,
              layout,
              layer,
            }),
            className,
          )}
          {...props}
        >
          {children}
          {showCloseIcon && (
            <DialogPrimitive.Close className="hover:scale-104 transition-[opacity, transform] absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background duration-150 ease-in-out data-[state=open]:bg-accent data-[state=open]:text-muted-foreground hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none">
              <X className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </DialogPrimitive.Close>
          )}
        </DialogPrimitive.Content>
      </DialogOverlay>
    </DialogPortal>
  ),
);
DialogContent.displayName = DialogPrimitive.Content.displayName;

const dialogHeaderVariants = cva("flex flex-col", {
  variants: {
    variant: {
      default: "space-y-1.5",
      divided: "mb-4 space-y-1.5 border-b pb-1",
      compact: "space-y-1",
      relaxed: "space-y-2",
      spacious: "space-y-1.5 pb-8",
      preview: "mb-5 space-y-1.5 pr-12",
    },
    align: {
      responsive: "text-center sm:text-left",
      left: "text-left",
      center: "text-center",
    },
    layout: {
      default: "",
      rowCompact: "flex-row items-center gap-1",
      rowBetween: "flex-row items-center justify-between",
      hero: "mx-auto w-full max-w-4xl items-center",
    },
  },
  defaultVariants: {
    variant: "default",
    align: "responsive",
    layout: "default",
  },
});

type DialogHeaderProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof dialogHeaderVariants>;

const DialogHeader = ({
  align,
  className,
  layout,
  variant,
  ...props
}: DialogHeaderProps) => (
  <div
    className={cn(dialogHeaderVariants({ align, layout, variant }), className)}
    {...props}
  />
);
DialogHeader.displayName = "DialogHeader";

const dialogFooterVariants = cva("flex gap-2", {
  variants: {
    variant: {
      default: "flex-col-reverse sm:flex-row sm:justify-end",
      split: "[&>*]:flex-1",
      stacked: "flex-col-reverse",
      between: "flex-col-reverse sm:flex-row sm:justify-between sm:space-x-0",
      betweenRelaxed:
        "flex-col-reverse pt-5 sm:flex-row sm:justify-between sm:space-x-0",
    },
    placement: {
      default: "",
      fill: "mt-auto",
    },
  },
  defaultVariants: { variant: "default", placement: "default" },
});

type DialogFooterProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof dialogFooterVariants>;

const DialogFooter = ({
  className,
  placement,
  variant,
  ...props
}: DialogFooterProps) => (
  <div
    className={cn(dialogFooterVariants({ placement, variant }), className)}
    {...props}
  />
);
DialogFooter.displayName = "DialogFooter";

const dialogTitleVariants = cva(
  "text-lg font-semibold leading-none tracking-tight",
  {
    variants: {
      variant: {
        default: "",
        sidebar: sidebarTextStyles,
        sidebarPadded: cn("pb-2", sidebarTextStyles),
        sidebarSection: cn("flex items-center gap-2 pb-4", sidebarTextStyles),
        settings: cn("pb-2 pl-3 text-xl", sidebarTextStyles),
        tenantSettings: "px-2 text-xl",
        hidden: "sr-only",
        attachmentHidden: "aui-sr-only sr-only",
        compact: "text-md",
        extensionHero: tiempos7xlHeadingStyles,
      },
      align: {
        default: "",
        center: "text-center",
      },
    },
    defaultVariants: { variant: "default", align: "default" },
  },
);

type DialogTitleProps = React.ComponentPropsWithoutRef<
  typeof DialogPrimitive.Title
> &
  VariantProps<typeof dialogTitleVariants>;

const DialogTitle = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Title>,
  DialogTitleProps
>(({ align, className, variant, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(dialogTitleVariants({ align, variant }), className)}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const dialogDescriptionVariants = cva("text-sm text-muted-foreground", {
  variants: {
    variant: {
      default: "",
      mono: "text-mono-500",
      padded: "pb-3",
    },
  },
  defaultVariants: { variant: "default" },
});

type DialogDescriptionProps = React.ComponentPropsWithoutRef<
  typeof DialogPrimitive.Description
> &
  VariantProps<typeof dialogDescriptionVariants>;

const DialogDescription = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Description>,
  DialogDescriptionProps
>(({ className, variant, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn(dialogDescriptionVariants({ variant }), className)}
    {...props}
  />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  dialogContentVariants,
};
