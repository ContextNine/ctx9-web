import { ChevronLeft, ChevronRight } from "lucide-react";
import type { JSX } from "react";
import { Button } from "./button.js";
import { cn } from "./cn.js";

export function Pagination({
  page,
  pageCount,
  onPageChange,
  className,
}: {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
  className?: string;
}): JSX.Element {
  const boundedCount = Math.max(1, pageCount);
  const boundedPage = Math.min(Math.max(1, page), boundedCount);
  return (
    <nav
      aria-label="Pagination"
      className={cn("flex items-center justify-end gap-2", className)}
    >
      <Button
        type="button"
        variant="ghost"
        size="icon"
        disabled={boundedPage <= 1}
        aria-label="Previous page"
        onClick={() => {
          onPageChange(boundedPage - 1);
        }}
      >
        <ChevronLeft aria-hidden="true" className="size-4" />
      </Button>
      <span className="min-w-20 text-center text-sm text-muted-foreground">
        {boundedPage} of {boundedCount}
      </span>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        disabled={boundedPage >= boundedCount}
        aria-label="Next page"
        onClick={() => {
          onPageChange(boundedPage + 1);
        }}
      >
        <ChevronRight aria-hidden="true" className="size-4" />
      </Button>
    </nav>
  );
}
