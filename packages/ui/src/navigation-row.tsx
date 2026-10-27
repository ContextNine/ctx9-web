"use client";

import { ChevronRight } from "lucide-react";
import * as React from "react";

import { NavigationLink } from "./navigation.js";
import type { AppIcon } from "./shell.js";

/** Separated rows for short navigational lists. Use DataTable when rows need columns. */
export function NavigationList({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}): React.JSX.Element {
  return (
    <ul
      aria-label={label}
      className="grid divide-y divide-border border-y border-border"
    >
      {children}
    </ul>
  );
}

/**
 * One full-width link: optional icon, title with detail beneath, right-aligned meta
 * and a chevron at the far edge. Never add a second link or Open button inside it.
 */
export function NavigationRow({
  href,
  title,
  detail,
  meta,
  icon: Icon,
  onIntent,
}: {
  href: string;
  title: React.ReactNode;
  detail?: React.ReactNode;
  meta?: React.ReactNode;
  icon?: AppIcon;
  /** Pointer or keyboard intent, for prefetching the destination's data. */
  onIntent?: () => void;
}): React.JSX.Element {
  return (
    <li>
      <NavigationLink
        href={href}
        {...(onIntent ? { onPointerEnter: onIntent, onFocus: onIntent } : {})}
        className="group/row flex min-h-12 items-center gap-3 px-3 py-2 text-sm no-underline transition-colors hover:bg-sidebar-hover focus-visible:bg-sidebar-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-focus"
      >
        {Icon && (
          <Icon
            aria-hidden="true"
            className="size-4 shrink-0 text-muted-foreground"
          />
        )}
        <span className="grid min-w-0 flex-1 gap-0.5">
          <span className="truncate font-medium text-foreground">{title}</span>
          {detail && (
            <span className="truncate text-mono-700 dark:text-mono-300">
              {detail}
            </span>
          )}
        </span>
        {meta && (
          <span className="shrink-0 text-mono-700 dark:text-mono-300">
            {meta}
          </span>
        )}
        <ChevronRight
          aria-hidden="true"
          className="size-4 shrink-0 text-muted-foreground transition-colors group-hover/row:text-foreground group-focus-visible/row:text-foreground"
        />
      </NavigationLink>
    </li>
  );
}
