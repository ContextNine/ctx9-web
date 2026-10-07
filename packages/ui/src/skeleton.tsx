import { cn } from "./cn.js";
import { cva, type VariantProps } from "class-variance-authority";

const skeletonVariants = cva("animate-pulse rounded-md bg-muted", {
  variants: {
    shape: {
      default: "",
      round: "rounded-full",
      large: "rounded-lg",
      extraLarge: "rounded-xl",
    },
    tone: {
      default: "",
      subdued: "bg-neutral-200/90 dark:bg-mono-800/90",
      inverse: "bg-white/60 dark:bg-white/15",
    },
    height: {
      "2": "h-2",
      "2.5": "h-2.5",
      "3": "h-3",
      "4": "h-4",
      "6": "h-6",
      "8": "h-8",
      "9": "h-9",
      "10": "h-10",
      "11": "h-11",
      "24": "h-24",
      "32": "h-32",
      "40": "h-40",
      "52": "h-52",
      compactBlock: "h-[42px]",
    },
  },
});

function Skeleton({
  className,
  shape,
  tone,
  height,
  maxWidth,
  style,
  ...props
}: React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof skeletonVariants> & { maxWidth?: `${number}%` }) {
  return (
    <div
      className={cn(skeletonVariants({ shape, tone, height }), className)}
      style={
        maxWidth
          ? ({ ...style, "--skeleton-width": maxWidth } as React.CSSProperties)
          : style
      }
      {...props}
    />
  );
}

export { Skeleton };
