"use client";

import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "./cn.js";
import {
  authButtonClassName,
  billingPageButtonStyles,
  btnTertiaryStyles,
  buttonStyles,
  defaultButtonStyles,
  defaultInputStyles,
  dropdownButtonStyles,
  funkyBlueButtonColourAndText,
  funkyBlueHoverButtonStyles,
  funkyOutlineButtonStyles,
  funkyOutlineStyles,
  hoverSideTabsStyles,
  hoverStyles,
  mainButtonStyles,
  minorButtonStyles,
  outlineButtonStyles,
  postExpansionButtonStyles,
  selectedBgStyles,
  selectedButtonStyles,
  selectedSidebarStyles,
  selectedTextStyles,
  sidebarTextStyles,
} from "./impression-recipes.js";

export type ControlShape =
  | "default"
  | "large"
  | "extraLarge"
  | "pill"
  | "square";

const controlShapeClassNames: Record<ControlShape, string> = {
  default: "",
  large: "rounded-lg",
  extraLarge: "rounded-xl",
  pill: "rounded-full",
  square: "rounded-none",
};

export type AppButtonVariant =
  | "primary"
  | "secondary"
  | "quiet"
  | "ghost"
  | "destructive"
  | "navigation"
  | "accent"
  | "link";
export type AuthButtonVariant = "primary" | "secondary";

const appNavigationStyles = cn(
  "flex w-full items-center gap-2 rounded-lg p-0 text-left transition-colors duration-300",
  buttonStyles,
  sidebarTextStyles,
  hoverStyles,
);
const appFunkyEffectStyles = cn(
  funkyOutlineStyles,
  "bg-neutral-700 text-white shadow-none transition-[scale,colors] duration-300 hover:scale-[101%] dark:bg-black",
);
const appStableFunkyEffectStyles = cn(
  funkyOutlineStyles,
  "bg-neutral-700 text-white shadow-none transition-[background-color,border-color,color,box-shadow] duration-300 dark:bg-black",
);
const appFunkyAccentEffectStyles = cn(
  funkyOutlineButtonStyles,
  funkyBlueButtonColourAndText,
  "bg-white dark:bg-black",
);
const appFunkyDestructiveStyles = cn(
  outlineButtonStyles,
  "text-rose-600 hover:text-rose-700 dark:text-rose-300 dark:hover:text-rose-200",
);

export const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors duration-300 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      surface: {
        app: "",
        auth: authButtonClassName,
      },
      variant: {
        primary: cn(
          "bg-primary text-primary-foreground dark:bg-black",
          hoverStyles,
          "hover:bg-primary/90 hover:text-white",
        ),
        secondary: outlineButtonStyles,
        quiet: btnTertiaryStyles,
        destructive: cn(
          "bg-white hover:bg-neutral-20 dark:bg-black dark:hover:bg-mono-950",
          outlineButtonStyles,
          "text-primary focus:text-black dark:focus:text-white",
        ),
        ghost: hoverStyles,
        navigation: appNavigationStyles,
        accent: funkyBlueHoverButtonStyles,
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: buttonStyles,
        iconXs: "size-6",
        icon7: "size-7",
        xs: "h-8 px-3",
        sm: "h-9 rounded-md px-3",
        md: "h-10 px-4",
        lg: "h-11 rounded-md px-8",
        xl: "h-12 px-6",
        tiny: "h-7 px-2",
        compact: "h-8 px-2 text-xs",
        compactWide: "h-8 px-3 text-xs",
        short: "h-8 p-2",
        row: "h-8 p-2",
        chip: "h-9 px-2 py-1 text-xs",
        menu: "h-10 p-2",
        iconBrand: "m-0 w-[26px] gap-0 rounded-xl px-0",
        icon: "h-9 w-9",
        iconSm: "h-8 w-8",
        iconMd: "h-10 w-10 p-0",
        iconLg: "h-14 w-14 p-0",
        back: "h-8 w-8 rounded-md",
        minor: minorButtonStyles,
        auto: "h-auto",
        micro: "h-4 p-0",
      },
      state: {
        default: "",
        selected: "",
        accent: "bg-accent text-accent-foreground",
        navigationActive:
          "bg-neutral-100 text-mono-950 dark:bg-mono-900 dark:text-mono-50",
        navigationIdle:
          "text-mono-600 hover:bg-neutral-100 hover:text-mono-950 dark:text-mono-300 dark:hover:bg-mono-900 dark:hover:text-mono-50",
        visible: "pointer-events-auto opacity-100",
        groupReveal:
          "pointer-events-none opacity-0 group-hover/post-card:pointer-events-auto group-hover/post-card:opacity-100",
        sidebarSelected: selectedSidebarStyles,
        settingsSelected: cn(selectedBgStyles, selectedTextStyles),
      },
      effect: {
        standard: "",
        funky:
          "shadow-none transition-[scale,colors] duration-300 hover:scale-[101%]",
        funkyStable:
          "shadow-none transition-[background-color,border-color,color,box-shadow] duration-300",
      },
      width: {
        auto: "",
        full: "w-full",
        fit: "w-fit",
        iconBrand: "w-[26px]",
        responsive: "w-full sm:w-auto",
        billing: "w-full sm:w-[225px]",
        grow: "flex-1",
      },
      align: {
        center: "",
        start: "justify-start",
        between: "justify-between",
      },
      gap: {
        none: "",
        tight: "gap-1",
        compact: "gap-1.5",
        standard: "gap-2",
      },
      tone: {
        default: "",
        muted: "text-muted-foreground",
        sidebar: sidebarTextStyles,
        destructiveText: "text-destructive hover:text-destructive",
        danger: "text-red-600",
        foreground: "text-foreground",
        dismiss: "text-mono-500 hover:text-mono-900 dark:hover:text-mono-100",
        outreachIcon:
          "text-mono-600 hover:bg-neutral-100 dark:text-mono-300 dark:hover:bg-mono-800",
        outreachHelp:
          "text-mono-500 hover:bg-neutral-100 hover:text-mono-900 dark:text-mono-400 dark:hover:bg-mono-800 dark:hover:text-mono-50",
      },
      elevation: {
        default: "",
        none: "shadow-none",
        raised: "shadow-lg",
      },
      padding: {
        default: "",
        none: "p-0",
        tight: "p-1",
        compact: "px-2 py-1",
        wide: "px-4",
        wider: "px-6",
        vertical: "py-3",
        roomy: "p-4",
        medium: "px-3",
        broad: "px-5",
        narrow: "px-2.5",
        standard: "p-2",
      },
      emphasis: {
        default: "",
        subdued: "opacity-70",
        reveal: "opacity-50 hover:opacity-100",
      },
      typography: {
        default: "",
        mono: "font-mono",
        normal: "font-normal",
        base: "text-base",
        tiny: "text-xs font-medium",
      },
      minWidth: {
        default: "",
        "100": "min-w-[100px]",
        "120": "min-w-[120px]",
      },
      maxWidth: {
        default: "",
        "200": "max-w-[200px]",
        "220": "max-w-[220px]",
      },
      display: {
        default: "",
        flex: "flex",
      },
      height: {
        default: "",
        full: "h-full",
        "8": "h-8",
        "9": "h-9",
        "10": "h-10",
      },
      cursor: {
        default: "",
        pointer: "cursor-pointer",
      },
      preset: {
        default: "",
        accountTrigger:
          "h-auto w-full justify-start rounded-full border-transparent p-1.5 text-left",
        settingsTab: "shrink-0 sm:w-full",
        appSwitcher:
          "h-12 w-full justify-start gap-2.5 border-transparent px-2",
        mobileBackdrop:
          "fixed inset-0 z-30 h-auto w-auto rounded-none border-0 bg-black/70 p-0 md:hidden",
        tableSort:
          "h-8 justify-start px-0 text-left text-xs text-muted-foreground hover:bg-transparent hover:text-foreground",
        chatLauncher: "h-10 w-fit justify-start rounded-lg px-4 pr-8 text-base",
        accentIcon: "size-7 bg-accent text-accent-foreground",
        threadReveal:
          "h-6 w-6 p-1 text-muted-foreground opacity-0 transition-opacity group-hover/thread-item:opacity-100",
        analyticsRefresh:
          "h-10 rounded-xl border-border/70 bg-background/90 px-4 text-sm font-medium shadow-sm",
        mutedComment:
          "h-8 px-2 text-xs text-mono-500 hover:text-mono-900 dark:text-mono-400 dark:hover:text-mono-100",
        postReveal:
          "h-6 w-6 p-1 text-muted-foreground opacity-0 transition-opacity group-hover/post-card:opacity-100",
        postMenu:
          "absolute inset-0 z-10 h-6 w-6 p-1 text-muted-foreground transition-opacity",
        outreachNavigation:
          "h-auto w-full justify-start rounded-2xl px-3 py-2.5 text-left",
        outreachBack: cn("size-10 shadow-none", defaultButtonStyles),
        platformLink:
          "w-full scale-100 space-x-2 border-2 transition-transform hover:scale-[102%]",
        billingPlan: cn(
          "w-full border-mono-200 bg-white/80 text-mono-900 dark:border-mono-700 dark:bg-mono-900 dark:text-mono-100 dark:hover:bg-mono-850 sm:w-[225px]",
          defaultButtonStyles,
        ),
        cookieAction:
          "flex items-center justify-center rounded-lg px-4 py-2 font-medium leading-5",
        settingsItem: cn(
          "flex w-full items-center justify-start gap-2 p-0 text-left transition-colors duration-200",
          buttonStyles,
          hoverSideTabsStyles,
        ),
        settingsDangerItem: cn(
          "flex w-full items-center justify-start gap-2 p-0 text-left transition-colors duration-200 hover:bg-neutral-300 hover:text-black dark:hover:bg-mono-900 dark:hover:text-white",
          buttonStyles,
        ),
        defaultAction: defaultButtonStyles,
        mainIcon: mainButtonStyles,
        minorIcon: minorButtonStyles,
        dropdownAction: dropdownButtonStyles,
        postExpansion: postExpansionButtonStyles,
        billingPage: billingPageButtonStyles,
        billingAction: cn(defaultButtonStyles, billingPageButtonStyles),
        campaignSecondary: cn(defaultInputStyles, funkyOutlineStyles),
        sidebarNudge:
          "h-auto min-h-10 w-full justify-start gap-2 whitespace-normal px-3 py-2 text-left text-sm text-mono-700 dark:text-mono-300 [&_svg]:shrink-0",
        onboardingSecondary:
          "h-12 rounded-none border-neutral-800/80 bg-white px-6 text-mono-900 hover:bg-neutral-100 dark:border-neutral-800/80 dark:bg-white dark:text-mono-900 dark:hover:bg-neutral-100",
        onboardingBack:
          "h-auto rounded-none border-neutral-800/80 bg-white px-4 py-2 text-sm text-mono-700 hover:bg-neutral-100 dark:border-neutral-800/80 dark:bg-white dark:text-mono-700 dark:hover:bg-neutral-100",
      },
    },
    compoundVariants: [
      {
        surface: "auth",
        variant: ["primary", "secondary"],
        className: authButtonClassName,
      },
      {
        surface: "app",
        effect: "funky",
        className: appFunkyEffectStyles,
      },
      {
        surface: "app",
        effect: "funkyStable",
        className: appStableFunkyEffectStyles,
      },
      {
        surface: "app",
        variant: "accent",
        effect: ["funky", "funkyStable"],
        className: appFunkyAccentEffectStyles,
      },
      {
        surface: "app",
        variant: "secondary",
        effect: ["funky", "funkyStable"],
        className: funkyOutlineButtonStyles,
      },
      {
        surface: "app",
        variant: "destructive",
        effect: ["funky", "funkyStable"],
        className: appFunkyDestructiveStyles,
      },
      {
        surface: "app",
        state: "selected",
        className: selectedButtonStyles,
      },
    ],
    defaultVariants: {
      surface: "app",
      effect: "standard",
      variant: "primary",
      size: "default",
      state: "default",
      width: "auto",
      align: "center",
      gap: "none",
      tone: "default",
      elevation: "default",
      padding: "default",
      emphasis: "default",
      typography: "default",
      minWidth: "default",
      maxWidth: "default",
      display: "default",
      height: "default",
      cursor: "default",
      preset: "default",
    },
  },
);

type ButtonVariantProps = VariantProps<typeof buttonVariants>;
type ButtonSharedProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "color"
> &
  Omit<ButtonVariantProps, "surface" | "variant"> & {
    asChild?: boolean;
    href?: string;
    target?: string;
    rel?: string;
    shape?: ControlShape;
    loading?: boolean;
    loadingLabel?: string;
  };

export type ButtonProps = ButtonSharedProps & {
  surface?: "app" | "auth";
  variant?: AppButtonVariant | AuthButtonVariant;
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      surface = "app",
      variant = "primary",
      effect,
      size,
      state,
      asChild = false,
      href,
      target,
      rel,
      shape = "default",
      width,
      align,
      gap,
      tone,
      elevation,
      padding,
      emphasis,
      typography,
      minWidth,
      maxWidth,
      display,
      height,
      cursor,
      preset,
      loading = false,
      loadingLabel = "Working…",
      disabled,
      children,
      ...props
    },
    ref,
  ) => {
    const Component: React.ElementType = asChild ? Slot : href ? "a" : "button";
    return (
      <Component
        ref={ref}
        href={href}
        target={target}
        rel={rel}
        aria-busy={loading || undefined}
        data-loading={loading || undefined}
        disabled={asChild ? disabled : loading || disabled}
        className={cn(
          buttonVariants({
            surface,
            variant,
            effect,
            size,
            state,
            width,
            align,
            gap,
            tone,
            elevation,
            padding,
            emphasis,
            typography,
            minWidth,
            maxWidth,
            display,
            height,
            cursor,
            preset,
          }),
          controlShapeClassNames[shape],
          className,
        )}
        {...props}
      >
        {asChild ? children : loading ? loadingLabel : children}
      </Component>
    );
  },
);
Button.displayName = "Button";

export function ButtonGroup({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>): React.JSX.Element {
  return (
    <div
      role="group"
      className={cn(
        "inline-flex items-center [&>*:not(:first-child)]:-ml-px [&>*:not(:first-child)]:rounded-l-none [&>*:not(:last-child)]:rounded-r-none",
        className,
      )}
      {...props}
    />
  );
}
