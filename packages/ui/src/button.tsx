import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "./cn.js";

export const buttonVariants = cva(
  "inline-flex min-h-9 items-center justify-center gap-2 whitespace-nowrap rounded-md border px-3 text-sm font-medium disabled:pointer-events-none disabled:border-border disabled:bg-black disabled:text-disabled focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-black",
  {
    variants: {
      variant: {
        default:
          "border-border-strong bg-black text-white shadow-none transition-colors hover:border-white hover:bg-black hover:text-white",
        outline:
          "border-border-strong bg-black text-white transition-colors hover:border-muted-foreground hover:bg-surface-raised hover:text-white",
        secondary:
          "border-border bg-surface text-foreground transition-colors hover:bg-surface-raised",
        ghost:
          "border-transparent bg-black text-white transition-colors hover:bg-surface-raised hover:text-white",
        destructive:
          "border-danger/50 bg-danger/10 text-danger hover:border-danger hover:bg-danger/15",
        link: "min-h-0 border-transparent bg-transparent px-0 text-link underline-offset-4 hover:underline",
      },
      size: {
        sm: "min-h-8 px-2.5",
        default: "min-h-9 px-3",
        lg: "min-h-10 px-4",
        icon: "size-9 px-0",
        "icon-sm": "size-8 min-h-8 px-0",
      },
      selected: {
        true: "border-focus bg-selected text-foreground",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
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
  loading?: boolean;
  loadingLabel?: string;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      asChild = false,
      className,
      variant,
      size,
      selected,
      loading = false,
      loadingLabel = "Working…",
      disabled,
      children,
      ...props
    },
    ref,
  ) => {
    const Component = asChild ? Slot : "button";
    return (
      <Component
        ref={ref}
        aria-busy={loading || undefined}
        data-loading={loading || undefined}
        disabled={asChild ? disabled : loading || disabled}
        className={cn(buttonVariants({ variant, size, selected }), className)}
        {...props}
      >
        {asChild ? children : loading ? loadingLabel : children}
      </Component>
    );
  },
);
Button.displayName = "Button";

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
