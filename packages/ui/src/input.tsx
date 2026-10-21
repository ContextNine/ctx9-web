"use client";

import type { VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "./cn.js";
import { ControlGlow } from "./control-glow.js";
import { controlShapeClassNames, type ControlShape } from "./control-shape.js";
import {
  controlVariants,
  type AppControlVariant,
  type AuthControlVariant,
  type ControlEffect,
  type ControlSurface,
} from "./control-variants.js";
import { defaultInputBackgroundStyles } from "./impression-recipes.js";

type ControlVariantProps = VariantProps<typeof controlVariants>;

export type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size"
> &
  Omit<ControlVariantProps, "surface" | "variant"> & {
    surface?: ControlSurface;
    variant?: AppControlVariant | AuthControlVariant;
    effect?: ControlEffect;
    htmlSize?: number;
    withEmbeddedAction?: boolean;
    shape?: ControlShape;
    textAlign?: "left" | "center" | "right";
    status?: "default" | "error";
    tone?: "default" | "sidebar" | "editor" | "editorTitle";
    preset?:
      | "default"
      | "onboarding"
      | "sidebar"
      | "titleAutosize"
      | "titleTeam"
      | "profileName"
      | "profileHeadline";
    width?:
      | "default"
      | "auto"
      | "fit"
      | "16"
      | "20"
      | "32"
      | "172"
      | "search"
      | "filter";
    inset?: "default" | "action" | "newsletter";
    interaction?: "default" | "dragging";
  };

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      surface = "app",
      variant = "default",
      size,
      shape = "default",
      effect,
      htmlSize,
      withEmbeddedAction = false,
      textAlign = "left",
      status = "default",
      tone = "default",
      preset = "default",
      width = "default",
      inset = "default",
      interaction = "default",
      ...props
    },
    ref,
  ) => {
    const resolvedEffect = effect ?? (surface === "auth" ? "glow" : "standard");
    const control = (
      <input
        type={type}
        size={htmlSize}
        className={cn(
          "flex file:border-0 file:bg-transparent file:text-sm file:font-medium",
          controlVariants({ surface, variant, size }),
          controlShapeClassNames[shape],
          surface === "app" &&
            variant === "default" &&
            defaultInputBackgroundStyles,
          withEmbeddedAction && "bg-mono-100 pr-[8.75rem] sm:pr-[13.75rem]",
          textAlign === "center" && "text-center",
          textAlign === "right" && "text-right",
          status === "error" && "border-destructive",
          tone === "sidebar" && "text-mono-800 dark:text-mono-100",
          width === "auto" && "w-auto",
          width === "fit" && "w-fit",
          width === "16" && "w-16",
          width === "20" && "w-20",
          width === "32" && "w-32",
          width === "172" && "w-[172px]",
          width === "search" && "w-[220px] sm:w-[280px] md:w-[320px]",
          width === "filter" && "min-w-[200px]",
          inset === "action" && "pr-20",
          inset === "newsletter" && "max-[410px]:pr-5",
          interaction === "dragging" && "select-none cursor-grabbing",
          (preset === "titleAutosize" || preset === "titleTeam") &&
            "h-8 w-auto min-w-full",
          preset === "titleTeam" &&
            "h-auto border-none bg-transparent p-0 px-3 py-1 text-md font-medium text-primary",
          preset === "sidebar" &&
            "h-8 w-full bg-background shadow-none focus-visible:ring-2 focus-visible:ring-sidebar-ring",
          preset === "onboarding" &&
            "rounded-none border-0 bg-white text-mono-950 shadow-none dark:!bg-white dark:!text-mono-950 dark:placeholder:text-mono-400 dark:shadow-none",
          preset === "profileName" &&
            "h-9 border-none bg-transparent px-2 text-lg font-semibold text-mono-900 shadow-none hover:bg-neutral-150 dark:bg-transparent dark:text-mono-100 dark:hover:bg-mono-700",
          preset === "profileHeadline" &&
            "h-8 border-transparent bg-transparent px-2 text-sm text-mono-500 shadow-none hover:bg-neutral-150 dark:bg-transparent dark:text-mono-400 dark:hover:bg-mono-700",
          tone === "editor" && "dark:bg-black bg-white",
          tone === "editorTitle" && "bg-neutral-20 dark:bg-mono-900",
          className,
        )}
        ref={ref}
        {...props}
      />
    );

    return resolvedEffect === "glow" ? (
      <ControlGlow disabled={props.disabled}>{control}</ControlGlow>
    ) : (
      control
    );
  },
);
Input.displayName = "Input";
