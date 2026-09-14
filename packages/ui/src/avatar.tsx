"use client";

import { Avatar as AvatarPrimitive } from "@base-ui/react/avatar";
import * as React from "react";

import { cn } from "./cn.js";

export function Avatar({
  className,
  size = "default",
  ...props
}: AvatarPrimitive.Root.Props & { size?: "sm" | "default" | "lg" }) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      data-size={size}
      className={cn(
        "group/avatar relative flex size-8 shrink-0 overflow-hidden rounded-full border border-border-strong bg-input select-none data-[size=lg]:size-10 data-[size=sm]:size-6",
        className,
      )}
      {...props}
    />
  );
}

export function AvatarImage({
  className,
  ...props
}: AvatarPrimitive.Image.Props) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn("aspect-square size-full object-cover", className)}
      {...props}
    />
  );
}

export function AvatarFallback({
  className,
  ...props
}: AvatarPrimitive.Fallback.Props) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        "flex size-full items-center justify-center text-sm text-muted-foreground group-data-[size=sm]/avatar:text-xs",
        className,
      )}
      {...props}
    />
  );
}

export function AvatarBadge({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="avatar-badge"
      className={cn(
        "absolute right-0 bottom-0 z-10 size-2.5 rounded-full bg-success ring-2 ring-black",
        className,
      )}
      {...props}
    />
  );
}

export function AvatarGroup({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="avatar-group"
      className={cn("flex -space-x-2", className)}
      {...props}
    />
  );
}

export function AvatarGroupCount({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="avatar-group-count"
      className={cn(
        "relative flex size-8 shrink-0 items-center justify-center rounded-full bg-input text-sm text-muted-foreground ring-2 ring-black",
        className,
      )}
      {...props}
    />
  );
}
