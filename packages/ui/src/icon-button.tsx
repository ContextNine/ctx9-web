"use client";

import { Check, Copy } from "lucide-react";
import * as React from "react";

import { Button, type AppButtonProps } from "./button.js";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip.js";
import type { AppIcon } from "./shell.js";

type IconButtonProps = Omit<
  AppButtonProps,
  "icon" | "children" | "aria-label" | "size"
> & {
  /** Accessible name and tooltip text. */
  label: string;
  icon: AppIcon;
  /** `compact` (28px) keeps table rows at their text height. */
  size?: "default" | "compact";
};

/** A 32px icon-only action whose label is both its accessible name and its tooltip. */
export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    { label, icon: Icon, variant = "ghost", size = "default", ...props },
    ref,
  ) => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            ref={ref}
            type="button"
            variant={variant}
            size={size === "compact" ? "icon7" : "iconSm"}
            aria-label={label}
            {...props}
          >
            <Icon aria-hidden="true" className="size-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>{label}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
);
IconButton.displayName = "IconButton";

/** Copies `value` and briefly confirms with a check mark. */
export function CopyButton({
  value,
  label = "Copy",
  variant = "ghost",
}: {
  value: string;
  label?: string;
  /** `secondary` matches neighbouring secondary actions. */
  variant?: "ghost" | "secondary";
}): React.JSX.Element {
  const [copied, setCopied] = React.useState(false);
  React.useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => {
      setCopied(false);
    }, 1500);
    return () => {
      window.clearTimeout(timer);
    };
  }, [copied]);
  return (
    <IconButton
      label={copied ? "Copied" : label}
      icon={copied ? Check : Copy}
      variant={variant}
      onClick={() => {
        void navigator.clipboard.writeText(value).then(() => {
          setCopied(true);
        });
      }}
    />
  );
}
