import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "./cn.js";

export const buttonVariants = cva(
  "inline-flex min-h-9 items-center justify-center gap-2 whitespace-nowrap rounded-md border px-3 text-sm font-medium transition-colors disabled:pointer-events-none disabled:border-border disabled:bg-black disabled:text-disabled focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-black",
  {
    variants: {
      variant: {
        primary:
          "border-foreground bg-foreground text-black hover:border-white hover:bg-white",
        secondary:
          "border-border-strong bg-surface text-foreground hover:border-muted-foreground hover:bg-surface-raised",
        quiet:
          "border-transparent bg-transparent text-muted-foreground hover:bg-surface hover:text-foreground",
        destructive:
          "border-danger/50 bg-danger/10 text-danger hover:border-danger hover:bg-danger/15",
        link: "min-h-0 border-transparent bg-transparent px-0 text-link underline-offset-4 hover:underline",
      },
      size: {
        compact: "min-h-8 px-2.5",
        default: "min-h-9 px-3",
        large: "min-h-10 px-4",
        icon: "size-9 px-0",
      },
      selected: {
        true: "border-focus bg-selected text-foreground",
        false: "",
      },
    },
    defaultVariants: {
      variant: "secondary",
      size: "default",
      selected: false,
    },
  },
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ asChild = false, className, variant, size, selected, ...props }, ref) => {
    const Component = asChild ? Slot : "button";
    return (
      <Component
        ref={ref}
        className={cn(buttonVariants({ variant, size, selected }), className)}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export interface LoadingButtonProps extends ButtonProps {
  loading?: boolean;
  loadingLabel?: string;
}

export const LoadingButton = React.forwardRef<
  HTMLButtonElement,
  LoadingButtonProps
>(
  (
    {
      loading = false,
      loadingLabel = "Working…",
      disabled,
      children,
      ...props
    },
    ref,
  ) => (
    <Button
      ref={ref}
      aria-busy={loading}
      data-loading={loading || undefined}
      disabled={loading ? true : disabled}
      {...props}
    >
      {loading ? loadingLabel : children}
    </Button>
  ),
);
LoadingButton.displayName = "LoadingButton";

export function ButtonGroup({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>): React.JSX.Element {
  return (
    <div
      role="group"
      className={cn(
        "inline-flex items-center [&>*:not(:first-child)]:-ml-px [&>*:not(:first-child)]:rounded-l-none [&>*:not(:last-child)]:rounded-r-none",
        className,
      )}
      {...props}
    />
  );
}
