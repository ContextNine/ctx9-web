import * as ToastPrimitive from "@radix-ui/react-toast";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { Button } from "./button.js";
import { cn } from "./cn.js";
import type { ErrorDescriptor } from "./error.js";

const badgeVariants = cva(
  "inline-flex min-h-6 items-center rounded-sm border px-2 text-xs font-medium",
  {
    variants: {
      tone: {
        neutral: "border-border-strong bg-surface text-muted-foreground",
        selected: "border-focus bg-selected text-foreground",
        success: "border-success/40 bg-success/10 text-success",
        warning: "border-warning/40 bg-warning/10 text-warning",
        danger: "border-danger/40 bg-danger/10 text-danger",
      },
    },
    defaultVariants: { tone: "neutral" },
  },
);

export interface BadgeProps
  extends
    React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({
  tone,
  className,
  ...props
}: BadgeProps): React.JSX.Element {
  return <span className={cn(badgeVariants({ tone }), className)} {...props} />;
}

export function StatusText({
  tone = "neutral",
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & {
  tone?: "neutral" | "success" | "warning" | "danger";
}): React.JSX.Element {
  return (
    <span
      className={cn(
        "text-sm",
        tone === "neutral" && "text-muted-foreground",
        tone === "success" && "text-success",
        tone === "warning" && "text-warning",
        tone === "danger" && "text-danger",
        className,
      )}
      {...props}
    />
  );
}

export function InlineStatus({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>): React.JSX.Element {
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn("border-l-2 border-focus pl-3 text-sm", className)}
      {...props}
    />
  );
}

export function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>): React.JSX.Element {
  return (
    <div
      aria-hidden="true"
      className={cn("rounded-sm bg-surface-raised", className)}
      {...props}
    />
  );
}

export const ToastProvider = ToastPrimitive.Provider;
export const ToastViewport = React.forwardRef<
  React.ComponentRef<typeof ToastPrimitive.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Viewport
    ref={ref}
    className={cn(
      "fixed right-0 bottom-0 z-[100] flex max-h-dvh w-full flex-col gap-2 p-4 sm:max-w-sm",
      className,
    )}
    {...props}
  />
));
ToastViewport.displayName = ToastPrimitive.Viewport.displayName;

export const Toast = React.forwardRef<
  React.ComponentRef<typeof ToastPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Root>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Root
    ref={ref}
    className={cn(
      "grid gap-1 rounded-md border border-border-strong bg-popover p-4 text-foreground shadow-2xl",
      className,
    )}
    {...props}
  />
));
Toast.displayName = ToastPrimitive.Root.displayName;
export const ToastTitle = ToastPrimitive.Title;
export const ToastDescription = ToastPrimitive.Description;
export const ToastAction = ToastPrimitive.Action;
export const ToastClose = ToastPrimitive.Close;

interface StatePageProps {
  title: string;
  message: string;
  reference?: string;
  actions?: React.ReactNode;
  tone?: "neutral" | "danger" | "warning";
  className?: string;
}

function StatePage({
  title,
  message,
  reference,
  actions,
  tone = "neutral",
  className,
}: StatePageProps): React.JSX.Element {
  return (
    <section
      className={cn(
        "mx-auto grid w-full max-w-xl gap-4 border-l-2 py-1 pl-4",
        tone === "neutral" && "border-border-strong",
        tone === "warning" && "border-warning",
        tone === "danger" && "border-danger",
        className,
      )}
    >
      <header className="grid gap-1.5">
        <h1 className="text-2xl font-medium tracking-tight">{title}</h1>
        <p className="text-sm text-muted-foreground">{message}</p>
      </header>
      {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
      {reference && (
        <p className="font-mono text-xs text-muted-foreground">
          Reference: {reference}
        </p>
      )}
    </section>
  );
}

export function ErrorPage({
  error,
  className,
  back,
}: {
  error: ErrorDescriptor;
  className?: string;
  back?: { label: string; action: () => void };
}): React.JSX.Element {
  return (
    <StatePage
      title={error.title}
      message={error.message}
      {...(error.reference ? { reference: error.reference } : {})}
      tone="danger"
      {...(className ? { className } : {})}
      actions={
        <>
          {error.retry && (
            <Button
              type="button"
              variant="primary"
              onClick={error.retry.action}
            >
              {error.retry.label}
            </Button>
          )}
          {back && (
            <Button
              type="button"
              onClick={() => {
                back.action();
              }}
            >
              {back.label}
            </Button>
          )}
        </>
      }
    />
  );
}

export function EmptyState(
  props: Omit<StatePageProps, "tone">,
): React.JSX.Element {
  return <StatePage {...props} tone="neutral" />;
}

export function LoadingState({
  label = "Loading…",
}: {
  label?: string;
}): React.JSX.Element {
  return (
    <div role="status" className="text-sm text-muted-foreground">
      {label}
    </div>
  );
}

export function AccessDeniedState(
  props: Omit<StatePageProps, "tone">,
): React.JSX.Element {
  return <StatePage {...props} tone="danger" />;
}

export function UnavailableState(
  props: Omit<StatePageProps, "tone">,
): React.JSX.Element {
  return <StatePage {...props} tone="warning" />;
}
