import * as React from "react";

import { cn } from "./cn.js";

export function Card({ className, ...props }: React.ComponentProps<"section">) {
  return (
    <section
      data-slot="card"
      className={cn(
        "flex flex-col gap-4 rounded-lg border border-border bg-panel p-4 text-sm text-foreground",
        className,
      )}
      {...props}
    />
  );
}

export function CardHeader({
  className,
  ...props
}: React.ComponentProps<"header">) {
  return (
    <header
      data-slot="card-header"
      className={cn("grid gap-1", className)}
      {...props}
    />
  );
}

export function CardTitle({ className, ...props }: React.ComponentProps<"h2">) {
  return (
    <h2
      data-slot="card-title"
      className={cn("text-base font-semibold", className)}
      {...props}
    />
  );
}

export function CardDescription({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="card-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}

export function CardAction({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn("justify-self-end", className)}
      {...props}
    />
  );
}

export function CardContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return <div data-slot="card-content" className={className} {...props} />;
}

export function CardFooter({
  className,
  ...props
}: React.ComponentProps<"footer">) {
  return (
    <footer
      data-slot="card-footer"
      className={cn("flex items-center border-t border-border pt-4", className)}
      {...props}
    />
  );
}
