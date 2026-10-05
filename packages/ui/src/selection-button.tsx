"use client";

import type { ButtonHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";

const selectionButtonVariants = cva("", {
  variants: {
    variant: {
      remove:
        "ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2",
      clear: "absolute right-0 h-6 w-6 p-0",
    },
    hidden: { true: "hidden", false: "" },
  },
});

type SelectionButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "className" | "style" | "children" | "hidden"
> &
  VariantProps<typeof selectionButtonVariants> & { showIcon?: boolean };

/** Compound-control actions own their appearance rather than accepting recipes. */
export function SelectionButton({
  variant,
  hidden,
  showIcon = true,
  ...props
}: SelectionButtonProps) {
  return (
    <button className={selectionButtonVariants({ variant, hidden })} {...props}>
      {showIcon && (
        <X
          className={
            variant === "remove"
              ? "h-4 w-4 text-accent scale-100 hover:scale-[110%] duration-200 transition-transform"
              : "h-4 w-4 text-muted-foreground hover:text-foreground"
          }
        />
      )}
    </button>
  );
}
