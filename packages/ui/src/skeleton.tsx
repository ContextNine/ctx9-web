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
  },
});

function Skeleton({
  className,
  shape,
  tone,
  ...props
}: React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof skeletonVariants>) {
  return (
    <div
      className={cn(skeletonVariants({ shape, tone }), className)}
      {...props}
    />
  );
}

export { Skeleton };
