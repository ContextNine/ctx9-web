import * as React from "react";

import { cn } from "./cn.js";

export interface ApplicationNavItem {
  id: string;
  label: string;
  href: string;
  current?: boolean;
}

export function ApplicationShell({
  product,
  tenantControl,
  accountControl,
  navigation,
  children,
  className,
}: {
  product: string;
  tenantControl?: React.ReactNode;
  accountControl?: React.ReactNode;
  navigation: readonly ApplicationNavItem[];
  children: React.ReactNode;
  className?: string;
}): React.JSX.Element {
  return (
    <div className={cn("min-h-dvh bg-black text-foreground", className)}>
      <header className="border-b border-border bg-black">
        <div className="mx-auto flex min-h-14 w-full max-w-7xl items-center gap-4 px-4 sm:px-6">
          <a
            href="https://platform.ctx9.com"
            className="font-medium text-foreground no-underline"
          >
            CTX9
          </a>
          <span className="text-sm text-muted-foreground">{product}</span>
          <div className="ml-auto flex items-center gap-3">
            {tenantControl}
            {accountControl}
          </div>
        </div>
        {navigation.length > 0 && (
          <nav aria-label={`${product} navigation`} className="overflow-x-auto">
            <div className="mx-auto flex min-h-10 w-full max-w-7xl items-end gap-1 px-4 sm:px-6">
              {navigation.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  aria-current={item.current ? "page" : undefined}
                  className={cn(
                    "min-h-10 shrink-0 border-b-2 border-transparent px-3 py-2 text-sm text-muted-foreground no-underline hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus",
                    item.current && "border-foreground text-foreground",
                  )}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </nav>
        )}
      </header>
      <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6">
        {children}
      </main>
    </div>
  );
}

export function FocusedShell({
  title,
  description,
  children,
  footer,
  className,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}): React.JSX.Element {
  return (
    <main className="min-h-dvh bg-black px-4 py-12 text-foreground sm:px-6">
      <div className={cn("mx-auto grid w-full max-w-md gap-6", className)}>
        <a
          href="https://platform.ctx9.com"
          className="font-medium text-foreground no-underline"
        >
          CTX9
        </a>
        <header className="grid gap-2">
          <h1 className="text-2xl font-medium tracking-tight">{title}</h1>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </header>
        {children}
        {footer && (
          <footer className="text-sm text-muted-foreground">{footer}</footer>
        )}
      </div>
    </main>
  );
}

export function PageHeading({
  title,
  description,
  actions,
  className,
}: {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  className?: string;
}): React.JSX.Element {
  return (
    <header
      className={cn(
        "mb-6 flex flex-wrap items-start justify-between gap-4",
        className,
      )}
    >
      <div className="grid gap-1.5">
        <h1 className="text-2xl font-medium tracking-tight">{title}</h1>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
    </header>
  );
}

export function OperationalList({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>): React.JSX.Element {
  return (
    <div
      className={cn("divide-y divide-border border-y border-border", className)}
      {...props}
    />
  );
}

export function OperationalRow({
  title,
  description,
  status,
  action,
  className,
}: {
  title: React.ReactNode;
  description?: React.ReactNode;
  status?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}): React.JSX.Element {
  return (
    <div
      className={cn(
        "grid min-h-14 grid-cols-[minmax(9rem,1fr)_minmax(12rem,2fr)_auto] items-center gap-4 px-1 py-2 max-sm:grid-cols-[1fr_auto]",
        className,
      )}
    >
      <div className="text-sm font-medium">{title}</div>
      {description && (
        <div className="text-sm text-muted-foreground max-sm:col-span-2 max-sm:row-start-2">
          {description}
        </div>
      )}
      <div className="flex items-center justify-end gap-3">
        {status}
        {action}
      </div>
    </div>
  );
}
