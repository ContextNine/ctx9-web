"use client";

import type { ButtonProps } from "./button.js";
import * as React from "react";
import { Button } from "./button.js";
import { cn } from "./cn.js";
import { Loader2Icon } from "lucide-react";
import {
  funkyBlueButtonColourAndText,
  sidebarTextStyles,
} from "./impression-recipes.js";

import {
  BottomGradient,
  type BottomGradientVariant,
} from "./bottom-gradient.js";

const buttonLoadingIconStyles = "mr-2 h-4 w-4 animate-spin";
const groupedActionStyles = cn(
  "h-[36px] rounded-xl",
  sidebarTextStyles,
  "border border-input bg-inherit",
  funkyBlueButtonColourAndText,
);
const groupChevronStyles = cn(
  groupedActionStyles,
  "origin-center transition-all duration-300 ml-0 flex items-center justify-center rounded-br-xl rounded-tr-xl p-0",
);
const activeSelectionStyles =
  "border-input bg-brandPrimary text-white hover:bg-brandPrimary hover:text-white dark:bg-brandPrimary dark:text-white dark:hover:bg-brandPrimary";

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
  inlineAction: "m-0 flex items-center",
  inlineRoomy: "m-0 flex items-center p-4",
  roundIcon: "w-fit rounded-xl px-0",
  accentIcon: cn(
    groupedActionStyles,
    "origin-center transition-all duration-300 m-0 flex w-fit items-center justify-center px-2 py-1",
  ),
  accentCardIcon: cn(
    groupedActionStyles,
    "m-0 w-fit px-0",
    "bg-white dark:bg-mono-900 hover:bg-neutral-10 hover:dark:bg-mono-800 hover:text-black hover:dark:text-white",
  ),
  groupStart: cn(
    groupedActionStyles,
    "m-0 w-fit rounded-br-none rounded-tr-none px-2",
  ),
  groupEnd: cn(
    groupedActionStyles,
    "origin-center transition-all duration-300 ml-0 flex w-[36px] items-center justify-center rounded-none rounded-br-xl rounded-tr-xl border-l-0 px-0 py-1",
  ),
  groupChevron: cn(groupChevronStyles, "w-[36px] border-l-0"),
  groupChevronCompact: cn(groupChevronStyles, "w-[30px] border-l-0"),
  groupAction: cn(groupedActionStyles, "m-0 w-fit"),
  groupActionStart: cn(
    groupedActionStyles,
    "m-0 w-fit rounded-br-none rounded-tr-none",
  ),
  groupActionMiddle: cn(
    groupedActionStyles,
    "m-0 w-fit border-l-0 rounded-none",
  ),
  composerSend: cn(
    "h-[36px] rounded-xl origin-center transition duration-300 ml-0 flex w-full items-center justify-center rounded-xl px-1 py-1",
    sidebarTextStyles,
    "border border-input bg-inherit bg-white dark:bg-black",
    funkyBlueButtonColourAndText,
    "group/btn relative size-[42px] overflow-hidden rounded-full",
  ),
  contentAction:
    "h-8 w-8 min-w-8 rounded-xl border border-input p-0 shadow-none",
};

export type FunkyLoaderButtonProps = Omit<
  ButtonProps,
  "loading" | "loadingLabel" | "preset"
> & {
  isLoading?: boolean;
  gradient?: BottomGradientVariant;
  preset?: keyof typeof presetClassNames;
  selection?: "default" | "active";
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
      selection = "default",
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
        selection === "active" && activeSelectionStyles,
        preset === "contentAction" &&
          props.disabled &&
          "cursor-not-allowed opacity-50",
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
