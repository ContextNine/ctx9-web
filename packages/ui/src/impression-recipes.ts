import { cn } from "./cn.js";

export const scrollbarStyles =
  "scrollbar scrollbar-track-transparent scrollbar-track-rounded scrollbar-thumb-neutral-300 dark:scrollbar-thumb-mono-700 hover:scrollbar-thumb-neutral-400 dark:hover:scrollbar-thumb-mono-600";

export const buttonStyles = "h-9 p-2";
export const mainButtonStyles = "size-[36px] rounded-xl";
export const minorButtonStyles = "size-[24px] rounded-md p-[2px]";
export const defaultButtonStyles = "h-[36px] p-2";
export const dropdownButtonStyles = "w-full justify-start rounded-sm px-3";
export const postExpansionButtonStyles =
  "rounded-xl bg-muted/30 px-4 py-2 text-sm text-muted-foreground transition-all duration-300 hover:text-foreground";
export const billingPageButtonStyles =
  "w-[220px] bg-white text-black transition-all duration-300 hover:scale-[103%] focus:bg-white focus:text-black dark:bg-mono-200 dark:text-black dark:hover:bg-white dark:hover:text-black dark:focus:bg-white dark:focus:text-black";
export const btnTertiaryStyles =
  "bg-neutral-200 hover:bg-neutral-300 dark:bg-mono-700 dark:hover:bg-mono-800";
export const funkyOutlineStyles = "border border-input";
export const funkyBlueButtonColourAndText =
  "hover:bg-brandPrimary hover:text-white dark:hover:bg-brandPrimary dark:hover:text-white";
export const funkyBlueHoverButtonStyles = cn(
  "h-[36px] origin-center transition-all duration-300",
  "m-0 flex w-fit items-center justify-center rounded-xl px-2 py-1",
  "text-mono-700 dark:text-mono-300",
  "border border-input bg-inherit p-0",
  funkyBlueButtonColourAndText,
);
export const sidebarTextStyles = "text-mono-700 dark:text-mono-300";
export const selectedSidebarStyles = "bg-neutral-150 dark:bg-mono-850";
export const selectedBgStyles = "bg-neutral-100 dark:bg-mono-850";
export const selectedTextStyles = "text-black dark:text-white";
export const hoverStyles =
  "hover:bg-neutral-50 hover:text-black dark:hover:bg-mono-950 dark:hover:text-white";
export const hoverSideTabsStyles =
  "hover:bg-neutral-200 hover:text-black dark:hover:bg-mono-900 dark:hover:text-white";
export const focusStyles =
  "focus:bg-neutral-100 focus:text-black dark:focus:bg-mono-850 dark:focus:text-white";
export const outlineButtonStyles = cn(
  "border border-input bg-white dark:bg-mono-970",
  hoverStyles,
  focusStyles,
);
export const selectedButtonStyles = cn(
  selectedBgStyles,
  selectedTextStyles,
  "border border-neutral-300 dark:border-neutral-700",
);
export const funkyOutlineButtonStyles = cn(
  funkyOutlineStyles,
  outlineButtonStyles,
  sidebarTextStyles,
);

export const defaultInputStyles = "h-[36px]";
export const defaultInputBackgroundStyles = "dark:bg-mono-900";
export const titleInputStyles =
  "rounded-md border-none bg-neutral-100 px-3 py-2 text-md font-medium text-mono-800 transition-colors duration-300 placeholder:text-mono-500 hover:bg-neutral-150 focus:outline-none dark:bg-mono-900 dark:text-white dark:hover:bg-mono-800 dark:placeholder:text-mono-600";

export const panelBgStyles = "bg-neutral-10 dark:bg-mono-950";
export const editorBg = "bg-white dark:bg-black";
export const darkBorderTopStyle = "dark:border-t dark:border-t-mono-700";
export const cardPanelStyles =
  "rounded-lg bg-white p-4 shadow-input dark:bg-black";
export const outerCardStyles =
  "rounded-xl border-border bg-neutral-10 p-2 shadow-none dark:bg-mono-960";

export const panelTabTextStyles =
  "rounded-none text-base font-semibold text-mono-600 data-[state=active]:text-mono-700 dark:text-mono-400 dark:data-[state=active]:text-mono-300";
export const panelTabStyles =
  "h-7 w-fit data-[state=active]:border-b-2 data-[state=active]:border-mono-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none dark:data-[state=active]:border-mono-400";
export const tabsBgStyles = "bg-neutral-10 dark:bg-mono-950";
export const panelTitleStyles = "font-medium text-mono-700 dark:text-mono-300";
export const switchSelectedBackgroundStyles =
  "data-[state=checked]:bg-neutral-700 dark:data-[state=checked]:bg-mono-200";
export const overBlueTextStyles = "text-white dark:text-mono-200";

const checkboxBaseStyles = cn(
  "peer h-5 w-5 shrink-0 rounded-smd border",
  "scale-100 text-center transition-all duration-300 hover:scale-[110%]",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
  "disabled:cursor-not-allowed disabled:opacity-50",
);
export const checkboxBrandStyles = cn(
  checkboxBaseStyles,
  "border-brandPrimary bg-transparent",
  "data-[state=checked]:border-brandPrimary data-[state=checked]:bg-brandPrimary data-[state=checked]:text-white",
  "data-[state=indeterminate]:border-brandPrimary data-[state=indeterminate]:bg-brandPrimary data-[state=indeterminate]:text-white",
  "data-[state=unchecked]:border-brandPrimary data-[state=unchecked]:hover:bg-brandPrimary/10",
  "ring-offset-white dark:ring-offset-black",
);
export const checkboxBlackWhiteStyles = cn(
  checkboxBaseStyles,
  "border-neutral-300 bg-transparent dark:border-mono-600",
  "data-[state=checked]:border-neutral-300 data-[state=checked]:bg-white data-[state=checked]:text-neutral-600",
  "data-[state=checked]:dark:border-mono-600 data-[state=checked]:dark:bg-black data-[state=checked]:dark:text-mono-300",
  "data-[state=unchecked]:hover:bg-neutral-100 data-[state=unchecked]:hover:dark:bg-mono-800",
  "ring-offset-white dark:ring-offset-black",
);

export const standardCommandItemStyle = cn(
  hoverStyles,
  dropdownButtonStyles,
  focusStyles,
  "my-[2px] py-[4px]",
);
export const tooltipContentStandardStyles =
  "w-full max-w-[400px] rounded-md border bg-popover p-2 text-center text-popover-foreground shadow-md";
export const tooltipContentCompactStyles =
  "w-fit max-w-[300px] rounded-md border bg-popover p-1 text-popover-foreground shadow-md";
export const tooltipContentBareStyles =
  "w-fit border-0 bg-transparent p-0 text-popover-foreground shadow-none";
export const tiempos7xlHeadingStyles =
  "font-tiempos text-5xl leading-[0.94] tracking-[-0.02em] md:text-7xl";

export const authButtonClassName =
  "border border-neutral-200 bg-white text-black hover:bg-neutral-100 hover:text-black dark:border-neutral-700 dark:bg-white dark:text-black dark:hover:bg-neutral-100 dark:hover:text-black";
