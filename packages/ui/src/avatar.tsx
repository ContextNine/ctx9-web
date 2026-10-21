"use client";

import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";

import { cn } from "./cn.js";

/** Avatars never render below 32px; smaller sizes made unreadable initials. */
const sizes = {
  "8": "h-8 w-8",
  "9": "h-9 w-9",
  "10": "h-10 w-10",
  "11": "h-11 w-11",
  "14": "h-14 w-14",
  "16": "h-16 w-16",
  full: "h-full w-full",
} as const;
export type AvatarProps = React.ComponentPropsWithoutRef<
  typeof AvatarPrimitive.Root
> & {
  size?: keyof typeof sizes;
  variant?: "default" | "comment" | "thread" | "attachment";
};

const Avatar = React.forwardRef<
  React.ComponentRef<typeof AvatarPrimitive.Root>,
  AvatarProps
>(({ className, size = "10", variant = "default", ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full font-semibold text-muted-foreground",
      sizes[size],
      variant === "comment" &&
        "border border-neutral-200 bg-neutral-50 dark:border-mono-800 dark:bg-mono-950",
      variant === "thread" &&
        "border border-neutral-200 bg-neutral-20 dark:border-mono-800 dark:bg-mono-950",
      variant === "attachment" && "rounded-none",
      className,
    )}
    {...props}
  />
));
Avatar.displayName = AvatarPrimitive.Root.displayName;

const AvatarImage = React.forwardRef<
  React.ComponentRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image> & {
    fit?: "default" | "cover";
  }
>(({ className, fit = "default", ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn(
      "aspect-square h-full w-full",
      fit === "cover" && "object-cover",
      className,
    )}
    {...props}
  />
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

const AvatarFallback = React.forwardRef<
  React.ComponentRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback> & {
    typography?: "default" | "tiny" | "compact";
  }
>(({ className, typography = "default", ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
      typography === "tiny" && "text-xs",
      typography === "compact" && "text-xs font-semibold",
      className,
    )}
    {...props}
  />
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

export { Avatar, AvatarImage, AvatarFallback };

export function AvatarIcon({
  url,
  displayName,
  size = "14",
  ...props
}: AvatarProps & {
  url?: string | null;
  displayName: string | null | undefined;
}) {
  return (
    <Avatar {...props} size={size}>
      {url && <AvatarImage src={url} />}
      <AvatarFallback typography={size === "8" ? "compact" : "default"}>
        {displayName?.substring(0, 2).toUpperCase() ?? "AA"}
      </AvatarFallback>
    </Avatar>
  );
}
