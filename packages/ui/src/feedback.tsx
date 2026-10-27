import { ArrowLeft, RotateCw, TriangleAlert } from "lucide-react";
import * as React from "react";

import { Button } from "./button.js";
import { cn } from "./cn.js";
import type { ErrorDescriptor } from "./error.js";
import type { AppIcon } from "./shell.js";

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

/** A status line. `action` holds its one recovery control, right-aligned on the same row. */
export function InlineStatus({
  tone = "neutral",
  className,
  action,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  tone?: "neutral" | "success" | "warning" | "danger";
  action?: React.ReactNode;
}): React.JSX.Element {
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "border-l-2 border-focus pl-3 text-sm",
        tone === "neutral" && "text-mono-700 dark:text-mono-300",
        action && "flex flex-wrap items-center justify-between gap-x-4 gap-y-2",
        tone === "success" && "border-success text-success",
        tone === "warning" && "border-warning text-warning",
        tone === "danger" && "border-danger text-danger",
        className,
      )}
      {...props}
    >
      {action ? <div className="min-w-0">{children}</div> : children}
      {action && <div className="flex shrink-0 gap-2">{action}</div>}
    </div>
  );
}

interface StatePageProps {
  title: string;
  message: string;
  reference?: string;
  actions?: React.ReactNode;
  tone?: "neutral" | "danger" | "warning";
  icon?: AppIcon;
  /** Use h2 inside a page that already has its own h1. */
  headingLevel?: "h1" | "h2";
  className?: string;
}

/** Centred empty, error and access states inside the content area. */
function StatePage({
  title,
  message,
  reference,
  actions,
  tone = "neutral",
  icon: Icon,
  headingLevel: Heading = "h1",
  className,
}: StatePageProps): React.JSX.Element {
  return (
    <section
      className={cn(
        "mx-auto grid w-full max-w-md justify-items-center gap-4 py-16 text-center",
        className,
      )}
    >
      {Icon && (
        <Icon
          aria-hidden="true"
          className={cn(
            "size-6",
            tone === "neutral" && "text-muted-foreground",
            tone === "warning" && "text-warning",
            tone === "danger" && "text-danger",
          )}
        />
      )}
      <header className="grid gap-1.5">
        <Heading className="text-lg font-medium">{title}</Heading>
        <p className="text-sm text-muted-foreground">{message}</p>
      </header>
      {actions && (
        <div className="flex flex-wrap justify-center gap-2">{actions}</div>
      )}
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
      icon={TriangleAlert}
      {...(className ? { className } : {})}
      actions={
        <>
          {back && (
            <Button
              type="button"
              variant="secondary"
              icon={ArrowLeft}
              onClick={() => {
                back.action();
              }}
            >
              {back.label}
            </Button>
          )}
          {error.retry && (
            <Button
              type="button"
              variant="primary"
              effect="funkyStable"
              icon={RotateCw}
              onClick={error.retry.action}
            >
              {error.retry.label}
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
