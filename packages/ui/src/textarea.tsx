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
import { scrollbarStyles } from "./impression-recipes.js";
import { useDebounceValue } from "./use-debounce-value.js";

type ControlVariantProps = VariantProps<typeof controlVariants>;
type TextareaMinHeight =
  | "default"
  | "14"
  | "24"
  | "28"
  | "32"
  | "100"
  | "110"
  | "120"
  | "150"
  | "180"
  | "280"
  | "320";

const textareaMinHeightClassNames: Record<TextareaMinHeight, string> = {
  default: "",
  "14": "min-h-14",
  "24": "min-h-24",
  "28": "min-h-28",
  "32": "min-h-32",
  "100": "min-h-[100px]",
  "110": "min-h-[110px]",
  "120": "min-h-[120px]",
  "150": "min-h-[150px]",
  "180": "min-h-[180px]",
  "280": "min-h-[280px]",
  "320": "min-h-[320px]",
};

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> &
  Omit<ControlVariantProps, "surface" | "variant" | "size"> & {
    /** `quiet` is borderless and transparent at rest and always grows with its content (question-style forms). */
    surface?: ControlSurface | "quiet";
    variant?: AppControlVariant | AuthControlVariant;
    autoResize?: boolean;
    effect?: ControlEffect;
    minHeight?: TextareaMinHeight;
    resize?: "default" | "none" | "y";
    scroll?: "default" | "auto" | "styled" | "hidden";
    grow?: boolean;
    shape?: ControlShape;
    tone?:
      | "default"
      | "paper"
      | "editor"
      | "editorTitle"
      | "code"
      | "codeOverlay";
    preset?: "default" | "onboarding" | "reply";
    highlighting?: "default" | "overlay";
  };

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      autoResize = false,
      className,
      effect,
      grow = false,
      minHeight = "default",
      onInput,
      resize = "default",
      scroll = "default",
      shape = "default",
      surface = "app",
      tone = "default",
      preset = "default",
      highlighting = "default",
      value,
      variant = "default",
      ...props
    },
    ref,
  ) => {
    const textareaRef = React.useRef<HTMLTextAreaElement>(null);
    const debouncedValue = useDebounceValue(value, 100);
    const quiet = surface === "quiet";
    const resolvedEffect = effect ?? (surface === "auth" ? "glow" : "standard");

    const adjustHeight = React.useCallback(() => {
      if ((!autoResize && !quiet) || !textareaRef.current) return;
      textareaRef.current.style.height = "auto";
      const { scrollHeight } = textareaRef.current;
      textareaRef.current.style.height = `${String(
        quiet ? scrollHeight : Math.min(Math.max(scrollHeight, 80), 150),
      )}px`;
    }, [autoResize, quiet]);

    React.useEffect(() => {
      adjustHeight();
    }, [adjustHeight, debouncedValue]);

    React.useEffect(() => {
      if (!autoResize && !quiet) return;
      window.addEventListener("resize", adjustHeight);
      return () => {
        window.removeEventListener("resize", adjustHeight);
      };
    }, [adjustHeight, autoResize, quiet]);

    const control = (
      <textarea
        className={cn(
          tone === "codeOverlay"
            ? "ctx9-code-overlay-input"
            : quiet
              ? cn(
                  "block min-h-10 w-full resize-none overflow-hidden rounded-md border-0 bg-transparent px-3 py-2 text-base leading-6 shadow-none outline-none transition-colors duration-150",
                  "text-mono-700 placeholder:text-mono-400 dark:text-mono-300 dark:placeholder:text-mono-600",
                  "hover:bg-neutral-100 focus:bg-neutral-100 focus:text-mono-900 focus-visible:ring-1 focus-visible:ring-neutral-300",
                  "dark:hover:bg-mono-900 dark:focus:bg-mono-900 dark:focus:text-mono-100 dark:focus-visible:ring-mono-700",
                  "disabled:cursor-default disabled:hover:bg-transparent",
                )
              : cn(
                  "flex min-h-[80px]",
                  controlVariants({
                    surface,
                    variant,
                    size: "auto",
                  }),
                  controlShapeClassNames[shape],
                ),
          resolvedEffect === "glow" &&
            cn("resize-y overflow-y-auto", scrollbarStyles),
          textareaMinHeightClassNames[minHeight],
          resize === "none" && "resize-none",
          resize === "y" && "resize-y",
          scroll === "auto" && "overflow-y-auto",
          scroll === "styled" && cn("overflow-y-auto", scrollbarStyles),
          scroll === "hidden" && "overflow-y-hidden",
          grow && "flex-1",
          tone === "paper" && "bg-white dark:bg-mono-900",
          tone === "editor" && "bg-white dark:bg-mono-950",
          tone === "code" && "font-mono text-xs leading-relaxed",
          tone === "editorTitle" && "bg-neutral-20 dark:bg-mono-900",
          preset === "onboarding" &&
            "rounded-none border-0 bg-white text-mono-950 shadow-none dark:!bg-white dark:!text-mono-950 dark:placeholder:text-mono-400 dark:shadow-none min-h-[140px]",
          preset === "reply" &&
            cn(
              "mb-1 max-h-32 min-h-14 w-full resize-none border-0 bg-transparent px-4 pb-3 pt-2 text-sm shadow-none outline-none placeholder:text-muted-foreground focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0",
              scrollbarStyles,
            ),
          highlighting === "overlay" &&
            "text-transparent caret-mono-900 selection:bg-amber-100 dark:caret-mono-50 dark:selection:bg-amber-400/25",
          className,
        )}
        ref={(node) => {
          textareaRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) ref.current = node;
        }}
        value={value}
        onInput={(event) => {
          adjustHeight();
          onInput?.(event);
        }}
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
Textarea.displayName = "Textarea";
