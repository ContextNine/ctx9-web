import { ChevronRight, MoreHorizontal } from "lucide-react";
import * as React from "react";

import { cn } from "./cn.js";
import { NavigationLink, type NavigationLinkProps } from "./navigation.js";

export function Breadcrumb({
  className,
  ...props
}: React.ComponentProps<"nav">) {
  return (
    <nav
      aria-label="Breadcrumb"
      data-slot="breadcrumb"
      className={className}
      {...props}
    />
  );
}

export function BreadcrumbList({
  className,
  ...props
}: React.ComponentProps<"ol">) {
  return (
    <ol
      data-slot="breadcrumb-list"
      className={cn(
        "flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}

export function BreadcrumbItem({
  className,
  ...props
}: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="breadcrumb-item"
      className={cn("inline-flex items-center gap-1", className)}
      {...props}
    />
  );
}

export const BreadcrumbLink = React.forwardRef<
  HTMLAnchorElement,
  NavigationLinkProps
>(({ className, ...props }, ref) => (
  <NavigationLink
    ref={ref}
    data-slot="breadcrumb-link"
    className={cn(
      "text-muted-foreground no-underline transition-colors hover:text-foreground",
      className,
    )}
    {...props}
  />
));
BreadcrumbLink.displayName = "BreadcrumbLink";

export function BreadcrumbPage({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="breadcrumb-page"
      aria-current="page"
      className={cn("text-foreground", className)}
      {...props}
    />
  );
}

export function BreadcrumbSeparator({
  children,
  className,
  ...props
}: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="breadcrumb-separator"
      role="presentation"
      aria-hidden="true"
      className={cn("[&>svg]:size-3.5", className)}
      {...props}
    >
      {children ?? <ChevronRight />}
    </li>
  );
}

export function BreadcrumbEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="breadcrumb-ellipsis"
      role="presentation"
      aria-hidden="true"
      className={cn("flex size-5 items-center justify-center", className)}
      {...props}
    >
      <MoreHorizontal className="size-4" />
      <span className="sr-only">More</span>
    </span>
  );
}
