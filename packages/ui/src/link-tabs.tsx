"use client";

import * as React from "react";

import { NavigationLink } from "./navigation.js";
import type { AppIcon } from "./shell.js";

export interface LinkTab {
  id: string;
  label: string;
  href: string;
  current?: boolean;
  count?: number;
  icon?: AppIcon;
}

/** Segmented links for URL-backed views such as environments, scopes or status queues. Scrolls when narrow. */
export function LinkTabs({
  label,
  items,
}: {
  label: string;
  items: readonly LinkTab[];
}): React.JSX.Element {
  return (
    <nav
      aria-label={label}
      className="inline-flex h-9 max-w-full items-center gap-0.5 overflow-x-auto rounded-md bg-neutral-100 p-1 [scrollbar-width:none] dark:bg-mono-900 [&::-webkit-scrollbar]:hidden"
    >
      {items.map(
        ({ id, label: itemLabel, href, current, count, icon: Icon }) => (
          <NavigationLink
            key={id}
            href={href}
            aria-current={current ? "page" : undefined}
            className="inline-flex h-7 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-sm px-3 text-sm font-medium text-mono-600 no-underline transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus aria-[current=page]:bg-background aria-[current=page]:text-foreground aria-[current=page]:shadow-sm dark:text-mono-400"
          >
            {Icon && <Icon aria-hidden="true" className="size-4 shrink-0" />}
            {itemLabel}
            {count !== undefined && (
              <span className="tabular-nums text-muted-foreground">
                {count}
              </span>
            )}
          </NavigationLink>
        ),
      )}
    </nav>
  );
}
