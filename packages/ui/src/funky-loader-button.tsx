"use client";

import type { ButtonProps } from "./button.js";
import * as React from "react";
import { Button } from "./button.js";
import { cn } from "./cn.js";
import { Loader2Icon } from "lucide-react";

import {
  BottomGradient,
  type BottomGradientVariant,
} from "./bottom-gradient.js";

const buttonLoadingIconStyles = "mr-2 h-4 w-4 animate-spin";

export type FunkyLoaderButtonProps = Omit<
  ButtonProps,
  "loading" | "loadingLabel"
> & {
  isLoading?: boolean;
  gradient?: BottomGradientVariant;
};

function defaultGradient(variant: ButtonProps["variant"]) {
  if (variant === "accent") return "brandPrimary";
  return "black";
}

export const FunkyLoaderButton = React.forwardRef<
  HTMLButtonElement,
  FunkyLoaderButtonProps
>(
  (
    {
      children,
      isLoading = false,
      className,
      id,
      gradient,
      surface = "app",
      variant = "primary",
      asChild = false,
      href,
      type = "submit",
      ...props
    },
    ref,
  ) => {
    const isLinkLike = asChild || Boolean(href);
    const shouldRenderLoader = isLoading && !isLinkLike;
    const buttonProps: ButtonProps = {
      ...props,
      asChild,
      className: cn(
        "group/btn relative",
        surface === "app" && "px-4 font-medium shadow-none",
        className,
      ),
      disabled: isLinkLike ? props.disabled : isLoading || props.disabled,
      effect: surface === "app" ? "funky" : "funkyStable",
      ...(href === undefined ? {} : { href }),
      id,
      surface,
      variant,
      ...(!isLinkLike ? { type } : {}),
    };

    return (
      <Button ref={ref} {...buttonProps}>
        {asChild ? (
          children
        ) : (
          <>
            {shouldRenderLoader && (
              <Loader2Icon className={buttonLoadingIconStyles} />
            )}
            {children}
            <BottomGradient variant={gradient ?? defaultGradient(variant)} />
          </>
        )}
      </Button>
    );
  },
);

FunkyLoaderButton.displayName = "FunkyLoaderButton";
