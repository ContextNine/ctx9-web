"use client";

import * as React from "react";

import { cn } from "./cn.js";

const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement> & {
    preset?: "default" | "settings";
    overflow?: "default" | "visible";
    minWidth?: "default" | "full";
    height?: "default" | "full";
  }
>(
  (
    {
      className,
      preset = "default",
      overflow = "default",
      minWidth = "default",
      height = "default",
      ...props
    },
    ref,
  ) => (
    <div className="relative w-full overflow-hidden overflow-x-auto">
      <table
        ref={ref}
        className={cn(
          "w-full caption-bottom table-auto",
          preset === "settings" && "cursor-default select-none text-sm",
          minWidth === "full" && "min-w-full",
          height === "full" && "h-full",
          overflow === "visible" && "overflow-visible",
          className,
        )}
        {...props}
      />
    </div>
  ),
);
Table.displayName = "Table";

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement> & {
    preset?: "default" | "plain" | "muted" | "analytics" | "mainPanel";
    sticky?: boolean;
  }
>(({ className, preset = "default", sticky = false, ...props }, ref) => (
  <thead
    ref={ref}
    className={cn(
      "[&_tr]:border-b",
      (preset === "plain" || preset === "mainPanel") && "[&_tr]:border-none",
      preset === "muted" && "bg-muted",
      preset === "analytics" &&
        "bg-black/[0.03] backdrop-blur dark:bg-white/[0.04]",
      preset === "mainPanel" && "bg-neutral-20 dark:bg-mono-950",
      sticky && "sticky top-0 z-10",
      className,
    )}
    {...props}
  />
));
TableHeader.displayName = "TableHeader";

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement> & {
    preset?: "default" | "expanded" | "drag";
  }
>(({ className, preset = "default", ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn(
      "[&_tr:last-child]:border-0",
      preset === "expanded" && "min-w-full overflow-visible",
      preset === "drag" && "[&_td:first-child]:w-8",
      className,
    )}
    {...props}
  />
));
TableBody.displayName = "TableBody";

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(
      "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
      className,
    )}
    {...props}
  />
));
TableFooter.displayName = "TableFooter";

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement> & {
    preset?:
      | "default"
      | "rounded"
      | "analytics"
      | "analyticsHeader"
      | "group"
      | "selectable"
      | "draggable";
    selected?: boolean;
  }
>(({ className, preset = "default", selected = false, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      "transition-colors data-[state=selected]:bg-muted ",
      preset === "rounded" && "rounded-sm",
      preset === "analyticsHeader" && "border-b border-border/60",
      preset === "analytics" &&
        "border-b border-border/60 last:border-0 even:bg-black/[0.03] hover:bg-black/[0.05] dark:even:bg-white/[0.03] dark:hover:bg-white/[0.05]",
      preset === "group" && "h-8 border-none hover:bg-transparent",
      preset === "selectable" &&
        "m-0 cursor-pointer p-0 transition-all duration-200",
      preset === "draggable" &&
        "relative z-0 data-[dragging=true]:z-10 data-[dragging=true]:opacity-80",
      selected && "bg-blue-50 ring-1 ring-blue-500 dark:bg-blue-950/20",
      className,
    )}
    {...props}
  />
));
TableRow.displayName = "TableRow";

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  Omit<React.ThHTMLAttributes<HTMLTableCellElement>, "align" | "width"> & {
    preset?: "default" | "analytics" | "actions";
    align?: "left" | "right";
    width?: "default" | "selection";
  }
>(
  (
    {
      className,
      preset = "default",
      align = "left",
      width = "default",
      ...props
    },
    ref,
  ) => (
    <th
      ref={ref}
      className={cn(
        "h-10 px-1 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
        preset === "analytics" &&
          "h-11 px-4 text-sm font-medium text-black/50 dark:text-white/60",
        preset === "actions" && "inline-flex items-center space-x-3",
        align === "right" && "text-right",
        width === "selection" && "w-12",
        className,
      )}
      {...props}
    />
  ),
);
TableHead.displayName = "TableHead";

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement> & {
    preset?:
      | "default"
      | "empty"
      | "emptyMuted"
      | "analyticsDate"
      | "analyticsText"
      | "analyticsNumber"
      | "analyticsEmpty"
      | "actions";
    spacing?: "default" | "none" | "roomy";
  }
>(({ className, preset = "default", spacing = "default", ...props }, ref) => (
  <td
    ref={ref}
    className={cn(
      "p-1 align-middle [&:has([role=checkbox])]:pr-0",
      preset === "empty" && "h-24 text-center",
      preset === "emptyMuted" && "py-8 text-center text-muted-foreground",
      preset === "analyticsDate" &&
        "px-4 py-3 align-top text-sm text-black/50 dark:text-white/45",
      preset === "analyticsText" &&
        "px-4 py-3 text-sm leading-relaxed text-black/85 dark:text-white",
      preset === "analyticsNumber" &&
        "px-4 py-3 text-right text-sm tabular-nums text-black/85 dark:text-white",
      preset === "analyticsEmpty" &&
        "h-24 px-4 text-center text-sm text-black/50 dark:text-white/45",
      preset === "actions" && "flex h-12 items-center overflow-visible",
      spacing === "none" && "p-0",
      spacing === "roomy" && "py-4",
      className,
    )}
    {...props}
  />
));
TableCell.displayName = "TableCell";

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn("mt-4 text-muted-foreground", className)}
    {...props}
  />
));
TableCaption.displayName = "TableCaption";

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
};
