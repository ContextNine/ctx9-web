import { cva } from "class-variance-authority";

import { titleInputStyles } from "./impression-recipes.js";

export type ControlSurface = "app" | "auth";
export type AppControlVariant =
  | "default"
  | "title"
  | "bare"
  | "search"
  | "tableCell"
  | "time"
  | "number";
export type AuthControlVariant = "default" | "bare";
export type ControlEffect = "standard" | "glow";

export const controlVariants = cva(
  "w-full disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      surface: {
        app: "",
        auth: "",
      },
      variant: {
        default:
          "rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        title: titleInputStyles,
        bare: "border-0 bg-transparent p-0 shadow-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0",
        search:
          "h-auto border-0 bg-transparent px-0 py-0 text-base shadow-none focus-visible:ring-0",
        tableCell:
          "border-transparent bg-transparent text-right shadow-none hover:bg-input/30 focus-visible:border focus-visible:bg-background",
        time: "w-[48px] text-center font-mono text-base tabular-nums caret-transparent focus:bg-accent focus:text-accent-foreground [&::-webkit-inner-spin-button]:appearance-none",
        number:
          "w-8 p-0 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
      },
      size: {
        sm: "h-8",
        compact: "h-9",
        default: "h-10",
        md: "h-10",
        lg: "h-12",
        auto: "h-auto",
      },
    },
    compoundVariants: [
      { surface: "app", variant: "title", size: "default", className: "h-8" },
      {
        surface: "auth",
        variant: "default",
        size: "default",
        className:
          "dark:placeholder-text-mono-600 h-9 rounded-md border-none bg-white px-3 py-2 text-sm text-black shadow-input transition duration-300 placeholder:text-mono-400 group-hover/input:shadow-none focus-visible:outline-none focus-visible:ring-[1px] focus-visible:ring-neutral-200 dark:bg-black dark:text-white dark:shadow-[0px_0px_1px_1px_var(--neutral-700)] dark:focus-visible:ring-neutral-600",
      },
      {
        surface: "auth",
        variant: "default",
        size: "auto",
        className:
          "dark:placeholder-text-mono-600 rounded-md border-none bg-white px-3 py-2 text-sm text-black shadow-input transition duration-300 placeholder:text-mono-400 group-hover/input:shadow-none focus-visible:outline-none focus-visible:ring-[1px] focus-visible:ring-neutral-200 dark:bg-black dark:text-white dark:shadow-[0px_0px_1px_1px_var(--neutral-700)] dark:focus-visible:ring-neutral-600",
      },
    ],
    defaultVariants: {
      surface: "app",
      variant: "default",
      size: "default",
    },
  },
);
