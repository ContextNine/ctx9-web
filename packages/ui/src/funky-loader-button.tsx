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

const presetClassNames = {
  default: "",
  authRecovery: "px-5 text-base",
  large: "h-12 px-6",
  largeBlack: "h-12 bg-black px-6",
  largeContrast:
    "h-12 bg-black px-6 text-white dark:!bg-white dark:!text-black",
  flex: "flex-1",
  compact: "border border-input h-9 px-4",
  compactFlex: "border border-input h-9 px-4 flex-1",
  compactWide: "border border-input h-9 px-4 min-w-[160px]",
  field: "h-[36px] border border-input",
  standardWide: "h-[36px] p-2 w-fit min-w-[200px]",
  fixedMedium: "m-0 w-[200px] border border-input",
  fixedWide: "w-[300px] border border-input",
  responsiveCentered: "m-0 w-full justify-center text-nowrap sm:w-auto",
  formSubmit: "mt-4 w-fit",
};

export type FunkyLoaderButtonProps = Omit<
  ButtonProps,
  "loading" | "loadingLabel" | "preset"
> & {
  isLoading?: boolean;
  gradient?: BottomGradientVariant;
  preset?: keyof typeof presetClassNames;
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
      width,
      preset = "default",
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
        width === "grow" && "w-full",
        presetClassNames[preset],
        className,
      ),
      disabled: isLinkLike ? props.disabled : isLoading || props.disabled,
      effect: surface === "app" ? "funky" : "funkyStable",
      ...(href === undefined ? {} : { href }),
      id,
      surface,
      variant,
      width,
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
