"use client";

import {
  columnFilteringFeature,
  columnVisibilityFeature,
  createColumnHelper,
  createFilteredRowModel,
  createPaginatedRowModel,
  createSortedRowModel,
  filterFn_includesString,
  rowPaginationFeature,
  rowSortingFeature,
  tableFeatures,
  useTable,
  type ColumnDef,
  type ColumnVisibilityState,
  type OnChangeFn,
  type PaginationState,
  type RowData,
  type SortingState,
} from "@tanstack/react-table";
import { ArrowDown, ArrowUp, ArrowUpDown, Columns3 } from "lucide-react";
import * as React from "react";

import { Button } from "./button.js";
import { cn } from "./cn.js";
import { Input } from "./controls.js";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./overlays.js";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./data.js";

export const dataTableFeatures = tableFeatures({
  columnFilteringFeature,
  columnVisibilityFeature,
  rowPaginationFeature,
  rowSortingFeature,
  filteredRowModel: createFilteredRowModel(),
  paginatedRowModel: createPaginatedRowModel(),
  sortedRowModel: createSortedRowModel(),
  filterFns: { includesString: filterFn_includesString },
});

type Features = typeof dataTableFeatures;
export type DataTableColumn<TData extends RowData> = ColumnDef<Features, TData>;

export function createDataTableColumnHelper<TData extends RowData>() {
  return createColumnHelper<Features, TData>();
}

export interface DataTableProps<TData extends RowData> {
  data: readonly TData[];
  columns: readonly DataTableColumn<TData>[];
  getRowId: (row: TData) => string;
  emptyMessage: string;
  caption?: string;
  sorting?: SortingState;
  onSortingChange?: OnChangeFn<SortingState>;
  pagination?: PaginationState;
  onPaginationChange?: OnChangeFn<PaginationState>;
  pageCount?: number;
  rowCount?: number;
  manualPagination?: boolean;
  columnVisibility?: ColumnVisibilityState;
  onColumnVisibilityChange?: OnChangeFn<ColumnVisibilityState>;
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
    React.useState<ColumnVisibilityState>({});

  const table = useTable({
    features: dataTableFeatures,
    data,
    columns,
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
    ...(manualPagination === undefined ? {} : { manualPagination }),
    ...(pageCount === undefined ? {} : { pageCount }),
    ...(rowCount === undefined ? {} : { rowCount }),
  });

  const hideableColumns = table
    .getAllColumns()
    .filter((column) => column.getCanHide());
  const hasToolbar = filter !== undefined ? true : hideableColumns.length > 0;

  return (
    <section
      aria-busy={isFetching || undefined}
      className={cn("grid min-w-0 gap-3", className)}
    >
      {hasToolbar && (
        <div className="flex flex-wrap items-center gap-2">
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
        <Table>
          {caption && <caption className="sr-only">{caption}</caption>}
          <TableHeader className="bg-panel">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const sorted = header.column.getIsSorted();
                  return (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder ? null : header.column.getCanSort() ? (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-8 justify-start px-0 text-left text-xs text-muted-foreground hover:bg-transparent hover:text-foreground"
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          <table.FlexRender header={header} />
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
                        <table.FlexRender header={header} />
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
                    onRowNavigate &&
                      "cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-focus",
                  )}
                  onPointerEnter={() => {
                    onRowIntent?.(row.original);
                  }}
                  onFocus={() => {
                    onRowIntent?.(row.original);
                  }}
                  onClick={() => {
                    onRowNavigate?.(row.original);
                  }}
                  onKeyDown={(event) => {
                    if (event.key !== "Enter" && event.key !== " ") return;
                    event.preventDefault();
                    onRowNavigate?.(row.original);
                  }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      <table.FlexRender cell={cell} />
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
            Page {table.state.pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </span>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            disabled={!table.getCanPreviousPage()}
            onClick={() => {
              table.previousPage();
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
              table.nextPage();
            }}
          >
            Next
          </Button>
        </nav>
      )}
    </section>
  );
}
