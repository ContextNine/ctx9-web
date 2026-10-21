"use client";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type TableOptions,
  type VisibilityState,
  type OnChangeFn,
  type PaginationState,
  type RowData,
  type SortingState,
} from "@tanstack/react-table";
import { ArrowDown, ArrowUp, ArrowUpDown, Columns3 } from "lucide-react";
import * as React from "react";

import { Button } from "./button.js";
import { cn } from "./cn.js";
import { Input } from "./input.js";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./dropdown-menu.js";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table.js";

export type DataTableColumn<TData extends RowData> =
  TableOptions<TData>["columns"][number];

export function createDataTableColumnHelper<TData extends RowData>() {
  return createColumnHelper<TData>();
}

export interface DataTableProps<TData extends RowData> {
  data: readonly TData[];
  columns: readonly DataTableColumn<TData>[];
  getRowId: (row: TData) => string;
  emptyMessage: string;
  caption?: string;
  heading?: React.ReactNode;
  sorting?: SortingState;
  onSortingChange?: OnChangeFn<SortingState>;
  pagination?: PaginationState;
  onPaginationChange?: OnChangeFn<PaginationState>;
  pageCount?: number;
  rowCount?: number;
  manualPagination?: boolean;
  columnVisibility?: VisibilityState;
  onColumnVisibilityChange?: OnChangeFn<VisibilityState>;
  filter?: {
    columnId: string;
    value: string;
    onChange: (value: string) => void;
    label: string;
    placeholder?: string;
  };
  onRowNavigate?: (row: TData) => void;
  onRowIntent?: (row: TData) => void;
  rowLabel?: (row: TData) => string;
  isFetching?: boolean;
  className?: string;
}

export function DataTable<TData extends RowData>({
  data,
  columns,
  getRowId,
  emptyMessage,
  caption,
  heading,
  sorting: controlledSorting,
  onSortingChange,
  pagination: controlledPagination,
  onPaginationChange,
  pageCount,
  rowCount,
  manualPagination,
  columnVisibility: controlledVisibility,
  onColumnVisibilityChange,
  filter,
  onRowNavigate,
  onRowIntent,
  rowLabel,
  isFetching = false,
  className,
}: DataTableProps<TData>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 25,
  });
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});

  const table = useReactTable({
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    data: [...data],
    columns: [...columns],
    state: {
      sorting: controlledSorting ?? sorting,
      pagination: controlledPagination ?? pagination,
      columnVisibility: controlledVisibility ?? columnVisibility,
      columnFilters: filter?.value
        ? [{ id: filter.columnId, value: filter.value }]
        : [],
    },
    getRowId,
    onSortingChange: onSortingChange ?? setSorting,
    onPaginationChange: onPaginationChange ?? setPagination,
    onColumnVisibilityChange: onColumnVisibilityChange ?? setColumnVisibility,
    autoResetPageIndex: false,
    ...(manualPagination === undefined ? {} : { manualPagination }),
    ...(pageCount === undefined ? {} : { pageCount }),
    ...(rowCount === undefined ? {} : { rowCount }),
  });

  const hideableColumns = table
    .getAllColumns()
    .filter((column) => column.getCanHide());
  const hasToolbar =
    heading !== undefined || filter !== undefined || hideableColumns.length > 0;

  return (
    <section
      aria-busy={isFetching || undefined}
      className={cn("grid min-w-0 gap-3", className)}
    >
      {hasToolbar && (
        <div className="flex flex-wrap items-center gap-2">
          {heading}
          {filter && (
            <label className="grid gap-1 text-sm">
              <span className="sr-only">{filter.label}</span>
              <Input
                type="search"
                value={filter.value}
                placeholder={filter.placeholder}
                aria-label={filter.label}
                className="w-full sm:w-72"
                onChange={(event) => {
                  filter.onChange(event.target.value);
                }}
              />
            </label>
          )}
          {hideableColumns.length > 0 && (
            <div className="ml-auto">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button type="button" variant="ghost" size="sm">
                    <Columns3 aria-hidden="true" className="size-4" />
                    Columns
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="min-w-40">
                  {hideableColumns.map((column) => (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) => {
                        column.toggleVisibility(value);
                      }}
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </div>
      )}
      <div className="min-w-0 overflow-hidden rounded-md border border-border">
        <Table className="text-sm">
          {caption && <caption className="sr-only">{caption}</caption>}
          <TableHeader className="bg-panel">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const sorted = header.column.getIsSorted();
                  return (
                    <TableHead
                      key={header.id}
                      colSpan={header.colSpan}
                      className="px-4 text-xs"
                    >
                      {header.isPlaceholder ? null : header.column.getCanSort() ? (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          preset="tableSort"
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                          {sorted === "asc" ? (
                            <ArrowUp aria-hidden="true" className="size-3.5" />
                          ) : sorted === "desc" ? (
                            <ArrowDown
                              aria-hidden="true"
                              className="size-3.5"
                            />
                          ) : (
                            <ArrowUpDown
                              aria-hidden="true"
                              className="size-3.5"
                            />
                          )}
                        </Button>
                      ) : (
                        flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )
                      )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  tabIndex={onRowNavigate ? 0 : undefined}
                  aria-label={rowLabel?.(row.original)}
                  className={cn(
                    "border-b border-border",
                    onRowNavigate &&
                      "cursor-pointer hover:bg-muted/50 hover:[&>td:first-child]:underline focus-visible:bg-muted/50 focus-visible:[&>td:first-child]:underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-focus",
                  )}
                  onPointerEnter={() => {
                    onRowIntent?.(row.original);
                  }}
                  onFocus={() => {
                    onRowIntent?.(row.original);
                  }}
                  onClick={(event) => {
                    if (
                      event.target instanceof Element &&
                      event.target.closest(
                        "button, a, input, select, textarea, [role=button]",
                      )
                    )
                      return;
                    onRowNavigate?.(row.original);
                  }}
                  onKeyDown={(event) => {
                    if (event.target !== event.currentTarget) return;
                    if (event.key !== "Enter" && event.key !== " ") return;
                    event.preventDefault();
                    onRowNavigate?.(row.original);
                  }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="px-4 py-2.5">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={Math.max(1, table.getVisibleLeafColumns().length)}
                  className="h-24 text-center text-muted-foreground"
                >
                  {emptyMessage}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {table.getPageCount() > 1 && (
        <nav
          aria-label="Table pagination"
          className="flex items-center justify-end gap-2"
        >
          <span className="mr-2 text-sm text-muted-foreground">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </span>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            disabled={!table.getCanPreviousPage()}
            onClick={() => {
              (onPaginationChange ?? setPagination)({
                ...table.getState().pagination,
                pageIndex: table.getState().pagination.pageIndex - 1,
              });
            }}
          >
            Previous
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            disabled={!table.getCanNextPage()}
            onClick={() => {
              (onPaginationChange ?? setPagination)({
                ...table.getState().pagination,
                pageIndex: table.getState().pagination.pageIndex + 1,
              });
            }}
          >
            Next
          </Button>
        </nav>
      )}
    </section>
  );
}
