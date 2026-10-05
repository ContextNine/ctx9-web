import * as React from "react";

import { Button } from "./button.js";
import { cn } from "./cn.js";
import type { ErrorDescriptor } from "./error.js";

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
