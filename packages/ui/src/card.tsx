"use client";

import type { VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "./cn.js";
import { cva } from "class-variance-authority";

import {
  cardPanelStyles,
  darkBorderTopStyle,
  editorBg,
  funkyOutlineStyles,
  outerCardStyles,
  panelBgStyles,
  scrollbarStyles,
  sidebarTextStyles,
} from "./impression-recipes.js";

const cardVariants = cva(
  "rounded-lg border bg-card text-card-foreground shadow-sm",
  {
    variants: {
      variant: {
        default: "",
        panel: cardPanelStyles,
        outer: outerCardStyles,
        bare: "rounded-none border-0 bg-transparent shadow-none",
        flat: "shadow-none",
        editorSurface: editorBg,
        analytics:
          "rounded-xl border-border bg-white shadow-none dark:bg-black",
        contentPanel: cn(
          "rounded-xl border p-0 text-sm shadow-aceternity",
          panelBgStyles,
          darkBorderTopStyle,
        ),
        contentPanelCompact: cn(
          "rounded-xl border p-0 text-xs shadow-aceternity",
          panelBgStyles,
          darkBorderTopStyle,
        ),
        offline: "bg-neutral-20 p-0 dark:bg-neutral-20",
        destructive:
          "border-destructive/50 bg-destructive/5 px-4 py-3 text-sm text-destructive",
        editorMenu: cn(editorBg, funkyOutlineStyles, "p-3 text-base shadow-xl"),
        editorMenuScrollable: cn(
          editorBg,
          funkyOutlineStyles,
          scrollbarStyles,
          "p-2 shadow-xl",
        ),
      },
      width: {
        default: "",
        full: "w-full",
      },
      container: {
        none: "",
        card: "@container/card",
        unnamed: "@container",
      },
      layout: {
        default: "",
        stretchColumn: "flex h-full min-h-0 flex-col",
      },
      emphasis: {
        default: "",
        ghostLeading: "opacity-65",
        ghostTrailing: "opacity-45",
      },
      height: {
        default: "",
        full: "h-full",
        tall: "h-[560px]",
        previewFront: "h-[500px] sm:h-[560px]",
        previewBack: "h-[480px] sm:h-[536px]",
      },
      minHeight: {
        default: "",
        preview: "min-h-[500px]",
      },
      maxWidth: {
        default: "",
        small: "max-w-sm",
        large: "max-w-2xl",
        editor: "w-[360px]",
        spotlight: "w-[330px]",
      },
      overflow: {
        default: "",
        hidden: "overflow-hidden",
        scrollEditor: "max-h-[360px] overflow-y-auto",
        scrollSpotlight: cn("max-h-[500px] overflow-y-auto", scrollbarStyles),
      },
    },
    defaultVariants: {
      variant: "default",
      width: "default",
      container: "none",
      layout: "default",
      emphasis: "default",
      height: "default",
      minHeight: "default",
      maxWidth: "default",
      overflow: "default",
    },
  },
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      container,
      emphasis,
      height,
      layout,
      maxWidth,
      minHeight,
      overflow,
      variant,
      width,
      ...props
    },
    ref,
  ) => (
    <div
      ref={ref}
      className={cn(
        cardVariants({
          container,
          emphasis,
          height,
          layout,
          maxWidth,
          minHeight,
          overflow,
          variant,
          width,
        }),
        className,
      )}
      {...props}
    />
  ),
);
Card.displayName = "Card";

const cardHeaderVariants = cva("flex flex-col space-y-1.5", {
  variants: {
    spacing: {
      default: "p-6",
      analytics: "p-2 pb-3",
      analyticsTight: "p-2 pb-2",
      comfortable: "p-5",
      integration: "flex-none space-y-3 p-5",
    },
    divider: {
      none: "",
      bottom: "border-b",
    },
    layout: {
      default: "",
      relative: "relative",
      rowBetween: "flex-row items-center justify-between",
      relativeRowBetween: "relative flex-row items-center justify-between",
      responsiveBetween:
        "flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between",
    },
    gap: {
      default: "",
      comfortable: "gap-4",
      compact: "gap-2",
    },
  },
  defaultVariants: {
    spacing: "default",
    divider: "none",
    layout: "default",
    gap: "default",
  },
});

type CardHeaderProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof cardHeaderVariants>;

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, divider, gap, layout, spacing, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        cardHeaderVariants({ divider, gap, layout, spacing }),
        className,
      )}
      {...props}
    />
  ),
);
CardHeader.displayName = "CardHeader";

const cardTitleVariants = cva("leading-none tracking-tight", {
  variants: {
    size: {
      default: "text-2xl font-semibold",
      section: "text-lg font-medium",
      compact: "text-lg font-semibold",
      integration: "text-sm font-medium leading-tight tracking-normal",
      metric: "text-2xl font-semibold tabular-nums @[250px]/card:text-3xl",
    },
    tone: {
      default: "",
      foreground: "text-foreground",
      sidebar: sidebarTextStyles,
    },
    spacing: {
      default: "",
      relaxed: "pb-4",
    },
  },
  defaultVariants: { size: "default", tone: "default", spacing: "default" },
});

type CardTitleProps = React.HTMLAttributes<HTMLHeadingElement> &
  VariantProps<typeof cardTitleVariants>;

const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, size, spacing, tone, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn(cardTitleVariants({ size, spacing, tone }), className)}
      {...props}
    />
  ),
);
CardTitle.displayName = "CardTitle";

const cardDescriptionVariants = cva("text-sm text-muted-foreground", {
  variants: {
    tone: {
      default: "",
      secondary: "text-mono-500 dark:text-mono-400",
    },
    leading: {
      default: "",
      relaxed: "leading-6",
    },
  },
  defaultVariants: { leading: "default", tone: "default" },
});

type CardDescriptionProps = React.HTMLAttributes<HTMLParagraphElement> &
  VariantProps<typeof cardDescriptionVariants>;

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  CardDescriptionProps
>(({ className, leading, tone, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(cardDescriptionVariants({ leading, tone }), className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const cardContentVariants = cva("", {
  variants: {
    spacing: {
      default: "p-6 pt-0",
      none: "p-0",
      tight: "p-2 pt-1",
      dense: "p-1 pt-1",
      compactTight: "p-2 @[280px]/card:px-2 @[280px]/card:py-2",
      compact: "p-4",
      comfortable: "p-5",
      editor: "p-3",
      chart: "px-2 py-4 pt-2 sm:px-6 sm:py-6",
      chartTop: "px-2 pt-4 sm:px-6 sm:pt-6",
      section: "p-6 px-5 pb-5 pt-0",
      integration: "p-6 px-5 pb-5 pt-2",
    },
    tone: {
      default: "",
      muted: "text-sm text-mono-500",
      subtle: "text-sm text-black/50 dark:text-white/45",
      sidebar: sidebarTextStyles,
    },
    layout: {
      default: "",
      column: "flex flex-col",
      fullColumn: "flex h-full flex-col",
      fullColumnStart:
        "flex h-full flex-col items-start justify-start gap-4 text-left",
      growingColumn: "flex min-h-0 flex-1 flex-col",
      growingColumnEnd: "flex flex-1 flex-col justify-end",
      centeredRow: "flex items-center gap-2",
    },
    flow: {
      default: "",
      compact: "space-y-2",
      comfortable: "space-y-3",
      relaxed: "space-y-4",
      spacious: "space-y-5",
    },
  },
  defaultVariants: {
    spacing: "default",
    tone: "default",
    layout: "default",
    flow: "default",
  },
});

type CardContentProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof cardContentVariants>;

const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, flow, layout, spacing, tone, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        cardContentVariants({ flow, layout, spacing, tone }),
        className,
      )}
      {...props}
    />
  ),
);
CardContent.displayName = "CardContent";

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className,
      )}
      {...props}
    />
  );
}

const cardFooterVariants = cva("flex items-center", {
  variants: {
    variant: {
      default: "p-6 pt-0",
      dividedTight: "border-t p-1",
      dividedCompact: "border-t p-2",
      dense: "p-1 pt-0",
      metric: "flex-col items-start gap-1 p-6 pt-0 text-sm",
      unpadded: "p-0",
    },
    align: {
      default: "",
      between: "justify-between",
    },
    layout: {
      default: "",
      columnStart: "w-full flex-col items-start justify-start gap-1",
    },
  },
  defaultVariants: { variant: "default", align: "default", layout: "default" },
});

type CardFooterProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof cardFooterVariants>;

const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ align, className, layout, variant, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardFooterVariants({ align, layout, variant }), className)}
      {...props}
    />
  ),
);
CardFooter.displayName = "CardFooter";

export {
  Card,
  cardVariants,
  CardHeader,
  CardAction,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};
