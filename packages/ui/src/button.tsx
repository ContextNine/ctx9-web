"use client";

import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "./cn.js";
import { controlShapeClassNames, type ControlShape } from "./control-shape.js";
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
  panelTitleStyles,
  postExpansionButtonStyles,
  selectedBgStyles,
  selectedButtonStyles,
  selectedSidebarStyles,
  selectedTextStyles,
  sidebarTextStyles,
} from "./impression-recipes.js";

export type { ControlShape } from "./control-shape.js";

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

const dateTimeTriggerStyles = "w-full justify-start text-left font-normal";
const dateTimeJoinedStyles = cn(
  "h-[36px] rounded-xl",
  "m-0 w-full rounded-br-none rounded-tr-none px-2",
  sidebarTextStyles,
  "border border-input bg-inherit",
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
          "text-primary focus:text-black focus:dark:text-white",
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
        sidebarDragging: "",
        settingsSelected: cn(selectedBgStyles, selectedTextStyles),
        interactive: "pointer-events-auto",
        brandSelected: "",
        pinkSelected: "",
        highlighted: "",
        brandActive: "",
        shimmerLoading: "",
        calendarCurrent: "",
        readabilityActive: "",
        panelActive: "bg-brand-500",
        panelIdle: "bg-brand-100",
        commandSelected: "bg-neutral-150 dark:bg-mono-900",
        dateTimeEmpty: "",
        dateTimeIntended: "",
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
        draftNavigation:
          "text-mono-600 hover:bg-mono-50 dark:text-mono-400 dark:hover:bg-mono-800",
      },
      palette: {
        default: "",
        neutral: "",
        sky: "",
        red: "",
        indigo: "",
        pink: "",
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
        hidden: "opacity-0",
        disabled: "opacity-50",
      },
      typography: {
        default: "",
        mono: "font-mono",
        normal: "font-normal",
        base: "text-base",
        tiny: "text-[11px] font-medium",
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
        notAllowed: "cursor-not-allowed",
        hoverPointer: "hover:cursor-pointer",
        hoverHelp: "hover:cursor-help",
      },
      sidebar: {
        default: "",
        expanded: "",
        collapsed: "",
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
        tableDrag: "size-7 text-muted-foreground hover:bg-transparent",
        tableMenu:
          "flex size-8 text-muted-foreground data-[state=open]:bg-muted",
        tableFirstPage: "hidden h-8 w-8 p-0 lg:flex",
        tableLastPage: "hidden size-8 lg:flex",
        tableCell: "w-fit px-0 text-left text-foreground",
        calendarNavigation:
          "h-7 w-7 bg-transparent p-0 opacity-80 hover:opacity-100",
        calendarCaption: "h-7 w-full truncate text-sm font-medium",
        calendarYear: "h-7 w-full text-sm font-normal text-foreground",
        timezoneTrigger: cn(defaultButtonStyles, "w-[300px] justify-between"),
        dateTimeTrigger: cn(dateTimeTriggerStyles, hoverStyles),
        dateTimeSchedule: cn(
          dateTimeTriggerStyles,
          panelTitleStyles,
          "bg-inherit dark:bg-inherit",
          hoverStyles,
        ),
        dateTimeScheduleJoined: cn(
          dateTimeTriggerStyles,
          dateTimeJoinedStyles,
          funkyBlueButtonColourAndText,
          panelTitleStyles,
          "bg-inherit dark:bg-inherit",
          hoverStyles,
        ),
        dateTimeMenu: cn(
          dateTimeTriggerStyles,
          dropdownButtonStyles,
          panelTitleStyles,
          "bg-inherit dark:bg-inherit border-none",
          hoverStyles,
        ),
        dateTimeMenuCompact: cn(
          dateTimeTriggerStyles,
          "h-8",
          dropdownButtonStyles,
          panelTitleStyles,
          "bg-inherit dark:bg-inherit border-none",
          hoverStyles,
        ),
        dateTimeRangeStart: cn(
          dateTimeTriggerStyles,
          dateTimeJoinedStyles,
          hoverStyles,
        ),
        dateTimeRangeEnd: cn(
          dateTimeTriggerStyles,
          "h-[36px] rounded-xl",
          "m-0 w-full rounded-bl-none rounded-tl-none px-2",
          sidebarTextStyles,
          "border border-input bg-inherit",
          funkyBlueButtonColourAndText,
          hoverStyles,
        ),
        sidebarTrigger: "h-7 w-7",
        editorNarrowIcon: "m-0 min-w-[26px] max-w-[26px] gap-0 rounded-xl px-0",
        panelTrigger: cn(minorButtonStyles, sidebarTextStyles),
        carouselIndicator:
          "h-1 w-6 data-[active='false']:bg-primary/50 data-[active='true']:bg-primary",
        carouselNavigation: "h-6 w-6",
        commandOption:
          "h-auto w-full cursor-pointer justify-between p-2 text-mono-700 transition-colors dark:text-mono-300 hover:bg-neutral-150 hover:dark:bg-mono-900",
        sideTab: cn(
          "mb-1 w-full cursor-pointer truncate rounded-md text-sm font-medium",
          hoverSideTabsStyles,
          sidebarTextStyles,
        ),
        chatLauncher: "h-10 w-fit justify-start rounded-lg px-4 pr-8 text-base",
        accentIcon: "size-7 bg-accent text-accent-foreground",
        threadReveal:
          "h-6 w-6 p-1 text-muted-foreground opacity-0 transition-opacity group-hover/thread-item:opacity-100",
        threadNew:
          "h-9 justify-start gap-2 rounded-lg px-3 text-sm hover:bg-muted data-active:bg-muted",
        threadMenu:
          "size-7 p-0 opacity-0 transition-opacity group-hover:opacity-100 data-[state=open]:bg-accent data-[state=open]:opacity-100 group-data-active:opacity-100",
        threadSuggestion:
          "h-auto w-full @md:flex-col flex-wrap items-start justify-start gap-1 rounded-2xl border px-4 py-3 text-left text-sm transition-colors hover:bg-muted",
        composerDraft:
          "size-8 p-1 hover:bg-muted-foreground/15 dark:hover:bg-muted-foreground/30",
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
          "border-mono-200 bg-white/80 text-mono-900 dark:border-mono-700 dark:bg-mono-900 dark:text-mono-100 hover:dark:bg-mono-850 w-full sm:w-[225px]",
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
          "flex w-full items-center justify-start gap-2 p-0 text-left transition-colors duration-200 hover:bg-neutral-300 hover:text-black hover:dark:bg-mono-900 hover:dark:text-white",
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
        workspaceOption:
          "flex h-full w-full cursor-pointer items-center justify-start gap-2 rounded-md p-1",
        assistantIcon: "size-6 p-1",
        primaryTooltipIcon:
          "h-8 w-8 rounded-xl p-2 hover:cursor-pointer hover:bg-brandPrimary transition-colors duration-300",
        contentIcon: "h-8 w-8 rounded-xl transition-colors duration-200",
        contentLink:
          "h-7 w-7 gap-0 rounded-xl p-0 transition-colors duration-200",
        contentLinkCompact:
          "h-6 w-6 rounded-xl p-1 transition-colors duration-200",
        compactIcon: "h-7 w-7 rounded-lg p-1.5",
        minorAction: cn(minorButtonStyles, "h-6 w-6 p-1"),
        mediaIcon: "w-8 hover:bg-neutral-500 dark:hover:bg-mono-400",
        filterToggle: cn(minorButtonStyles, sidebarTextStyles, "h-9 w-fit p-2"),
        compactToggle: cn(minorButtonStyles, "h-8 w-fit border p-1 px-3"),
        microAction:
          "h-4 w-4 bg-transparent p-0 hover:bg-blue-200 dark:hover:bg-blue-800",
        overlayDismiss:
          "h-fit w-fit rounded p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
        floatingScroll: "rounded-full p-4 disabled:invisible",
        dropdownCompact: cn(dropdownButtonStyles, "w-fit min-w-[100px] px-2"),
        filterCompact: cn(
          defaultButtonStyles,
          "h-9 w-fit min-w-[70px] max-w-[120px]",
        ),
        filterTrigger: cn(
          defaultButtonStyles,
          "h-9 w-fit min-w-[180px] justify-between rounded-md px-3",
        ),
        filterIcon: cn(
          defaultButtonStyles,
          "h-9 w-9 justify-center rounded-md p-0",
        ),
        selectorTrigger: cn(
          defaultButtonStyles,
          "h-9 w-full min-w-[120px] max-w-full justify-between md:max-w-[230px]",
        ),
        selectorIcon: cn(defaultButtonStyles, "h-9 w-14 p-0"),
        selectorFlags: cn(defaultButtonStyles, "h-9 min-w-14 px-2"),
        inlineAction: "m-0 flex items-center p-0",
        inlineRoomy: "m-0 flex items-center p-4",
        navigationOption: "flex items-center justify-start space-x-2",
        inlineGenerate:
          "inline-flex h-5 min-h-5 w-5 min-w-5 items-center justify-center rounded-md border border-neutral-400 text-primary transition-all hover:scale-[120%] disabled:cursor-not-allowed disabled:opacity-40 dark:border-mono-600",
        railIcon: "m-0 h-7 w-7 min-w-7 gap-0 rounded-xl px-0",
        railFunkyIcon:
          "m-0 h-7 w-7 min-w-7 gap-0 rounded-xl px-0 group/btn relative overflow-hidden border border-input shadow-none",
        shimmerAction: "",
        previewIcon:
          "size-9 rounded-xl border border-black/8 bg-white/95 text-mono-500 shadow-sm transition-colors hover:bg-neutral-100 hover:text-mono-900 dark:border-white/10 dark:bg-black/80 dark:text-mono-300 dark:hover:bg-mono-950 dark:hover:text-white",
        previewAction: cn(funkyBlueHoverButtonStyles, "px-2"),
        assistantScroll:
          "size-6 rounded-full p-4 disabled:invisible dark:bg-background dark:hover:bg-accent",
        assistantSend: "size-8 rounded-full p-1",
        assistantCancel: "size-8",
        assistantMenu: "size-6 p-1 data-[state=open]:bg-accent",
        assistantEdit: "size-6 p-4",
        assistantModal:
          "size-full p-1 rounded-full shadow transition-transform hover:scale-110 active:scale-90",
        attachmentRemove:
          "size-3.5 p-1 rounded-full bg-white text-muted-foreground opacity-100 shadow-sm hover:bg-white! [&_svg]:text-black hover:[&_svg]:text-destructive",
        attachmentAdd:
          "size-8.5 p-1 rounded-full font-semibold text-xs hover:bg-muted-foreground/15 dark:border-muted-foreground/15 dark:hover:bg-muted-foreground/30",
        composerMic: "size-8 rounded-full p-1 hover:bg-muted-foreground/15",
        composerMicRecording:
          "size-8 rounded-full p-1 bg-red-500 text-white hover:bg-red-600 hover:text-white",
        sidebarMenu: cn(
          "mb-1 h-8 w-full cursor-pointer items-center truncate",
          hoverSideTabsStyles,
          sidebarTextStyles,
          "inline-flex whitespace-nowrap rounded-md text-sm font-medium",
        ),
        sidebarSettings: cn(buttonStyles, hoverSideTabsStyles),
        sidebarUpload: cn(
          "h-8 w-full cursor-pointer duration-400 items-center truncate border-2 border-dashed transition-colors",
          hoverSideTabsStyles,
          sidebarTextStyles,
          "border-neutral-150 hover:border-mono-500 dark:border-mono-850 hover:dark:border-mono-800",
          "inline-flex whitespace-nowrap rounded-md text-sm font-medium",
        ),
        onboardingSecondary:
          "h-12 rounded-none border-neutral-800/80 bg-white px-6 text-mono-900 hover:bg-neutral-100 dark:!border-neutral-800/80 dark:!bg-white dark:!text-mono-900 dark:hover:!bg-neutral-100",
        onboardingBack:
          "h-auto rounded-none border-neutral-800/80 bg-white px-4 py-2 text-sm text-mono-700 hover:bg-neutral-100 dark:!border-neutral-800/80 dark:!bg-white dark:!text-mono-700 dark:hover:!bg-neutral-100",
      },
      density: {
        standard: "",
        rail: "!h-7 !w-7 !min-w-7 !rounded-xl !p-0",
      },
    },
    compoundVariants: [
      {
        preset: "dateTimeTrigger",
        state: "dateTimeEmpty",
        className: "text-muted-foreground",
      },
      {
        preset: [
          "dateTimeSchedule",
          "dateTimeScheduleJoined",
          "dateTimeMenu",
          "dateTimeMenuCompact",
        ],
        state: "dateTimeIntended",
        className: "text-muted-foreground",
      },
      {
        preset: ["dateTimeSchedule", "dateTimeScheduleJoined"],
        state: "dateTimeIntended",
        className: "border-dashed",
      },
      {
        preset: "platformLink",
        palette: "neutral",
        className:
          "bg-mono-200 border-mono-300 dark:bg-black hover:bg-mono-100 dark:hover:bg-mono-900 transition-colors duration-300",
      },
      {
        preset: "platformLink",
        palette: "sky",
        className:
          "bg-sky-100 border-sky-300 dark:bg-sky-900 hover:bg-sky-200 hover:dark:bg-sky-800 transition-colors duration-300",
      },
      {
        preset: "platformLink",
        palette: "red",
        className:
          "bg-red-100 border-red-300 dark:bg-red-800 hover:bg-red-200 hover:dark:bg-red-700 transition-colors duration-300",
      },
      {
        preset: "platformLink",
        palette: "indigo",
        className:
          "bg-indigo-100 border-indigo-300 dark:bg-indigo-900 hover:bg-indigo-200 dark:hover:bg-indigo-800 transition-colors duration-300",
      },
      {
        preset: "platformLink",
        palette: "pink",
        className:
          "bg-pink-100 border-pink-300 dark:bg-pink-900 hover:bg-pink-200 hover:dark:bg-pink-800 transition-colors duration-300",
      },
      {
        sidebar: "expanded",
        className: "justify-start pl-4",
      },
      {
        sidebar: "collapsed",
        className: "justify-center w-10",
      },
      {
        state: "sidebarDragging",
        className: "border-primary bg-primary/10",
      },
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
      {
        state: "brandSelected",
        className:
          "bg-brandPrimary text-white hover:bg-brandPrimary/90 hover:text-white dark:bg-brandPrimary dark:hover:bg-brandPrimary/90",
      },
      {
        state: "pinkSelected",
        className:
          "border border-pink-400/40 bg-pink-500/15 text-pink-600 dark:border-pink-400/30 dark:bg-pink-500/20 dark:text-pink-300",
      },
      {
        state: "highlighted",
        className: "text-brandPrimary dark:text-brandPrimaryLight",
      },
      {
        state: "brandActive",
        className:
          "border-input bg-brandPrimary text-white hover:bg-brandPrimary hover:text-white dark:bg-brandPrimary dark:text-white dark:hover:bg-brandPrimary",
      },
      {
        preset: ["filterTrigger", "filterIcon"],
        width: "full",
        className: "w-full",
      },
      {
        preset: "shimmerAction",
        className:
          "group/btn relative z-10 px-4 font-medium shadow-none dark:text-mono-100 rounded-xl bg-brandPrimary dark:bg-brandPrimary text-white hover:bg-brandPrimary hover:dark:bg-brandPrimary",
      },
      {
        state: "shimmerLoading",
        className: "hover:scale-100 hover:cursor-auto",
      },
      {
        state: "calendarCurrent",
        className: "bg-accent font-medium text-accent-foreground",
      },
      {
        state: "readabilityActive",
        className:
          "bg-primary text-primary-foreground hover:bg-primary/90 dark:text-primary-foreground",
      },
      {
        preset: "sideTab",
        sidebar: "collapsed",
        className:
          "flex h-auto w-full flex-col items-center justify-center px-2",
      },
      {
        preset: "sideTab",
        sidebar: "expanded",
        className: "h-8 items-center justify-start pl-4",
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
      palette: "default",
      elevation: "default",
      padding: "default",
      emphasis: "default",
      typography: "default",
      minWidth: "default",
      maxWidth: "default",
      display: "default",
      height: "default",
      cursor: "default",
      sidebar: "default",
      preset: "default",
      density: "standard",
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

export type AppButtonProps = ButtonSharedProps & {
  surface?: "app";
  variant?: AppButtonVariant;
};

export type AuthButtonProps = ButtonSharedProps & {
  surface: "auth";
  variant?: AuthButtonVariant;
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
      palette,
      elevation,
      padding,
      emphasis,
      typography,
      minWidth,
      maxWidth,
      display,
      height,
      cursor,
      sidebar,
      preset,
      density,
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
            palette,
            elevation,
            padding,
            emphasis,
            typography,
            minWidth,
            maxWidth,
            display,
            height,
            cursor,
            sidebar,
            preset,
            density,
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
