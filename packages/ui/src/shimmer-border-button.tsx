"use client";

import type { ButtonHTMLAttributes, PropsWithChildren } from "react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "./cn.js";

const directions = ["TOP", "LEFT", "BOTTOM", "RIGHT"] as const;
type Direction = (typeof directions)[number];
const movingMap: Record<Direction, string> = {
  TOP: "radial-gradient(20.7% 50% at 50% 0%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)",
  LEFT: "radial-gradient(16.6% 43.1% at 0% 50%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)",
  BOTTOM:
    "radial-gradient(20.7% 50% at 50% 100%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)",
  RIGHT:
    "radial-gradient(16.2% 41.199999999999996% at 100% 50%, hsl(0, 0%, 100%) 0%, rgba(252, 255, 255, 0) 100%)",
};
const highlight =
  "radial-gradient(75% 181.15942028985506% at 50% 50%, #3275F8 0%, rgba(255, 255, 255, 0) 100%)";
const contentStyles = cn(
  "animate-shimmer bg-[linear-gradient(110deg,var(--colors-brandPrimary),45%,#618eff,55%,var(--colors-brandPrimary))] bg-[length:200%_100%] hover:bg-[linear-gradient(110deg,var(--colors-brandPrimaryLight),45%,#FFFFFF,55%,var(--colors-brandPrimaryLight))] transition-colors",
  "focus:outline-none text-white z-10 bg-white shadow-[inset_0px_-4px_0px_0px_rgba(25,28,33,0.1)] px-4 py-2 rounded-xl tracking-widest font-bold dark:text-neutral-200",
  "flex w-full items-center justify-center space-x-2 text-white dark:bg-black dark:text-white",
  "font-mono",
);
const presetClassNames = {
  default: "",
  pricing: "lemonsqueezy-button",
  upgrade: "rounded-lg",
  upgradeToast: "whitespace-nowrap text-nowrap rounded-lg",
  upgradeToastFull: "w-full whitespace-nowrap text-nowrap rounded-lg",
  topUp: "rounded-lg shadow-sm",
};

export type ShimmerBorderButtonProps = PropsWithChildren<
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "style"> & {
    preset?: keyof typeof presetClassNames;
    duration?: number;
    clockwise?: boolean;
    className?: never;
    style?: never;
  }
>;

export function ShimmerBorderButton({
  children,
  preset = "default",
  duration = 1,
  clockwise = true,
  ...props
}: ShimmerBorderButtonProps) {
  const [hovered, setHovered] = useState(false);
  const [direction, setDirection] = useState<Direction>("TOP");

  useEffect(() => {
    if (!hovered) {
      const interval = setInterval(() => {
        setDirection((current) => {
          const index = directions.indexOf(current);
          return (
            directions[
              (index + (clockwise ? -1 : 1) + directions.length) %
                directions.length
            ] ?? current
          );
        });
      }, duration * 1000);
      return () => {
        clearInterval(interval);
      };
    }
  }, [hovered, duration, clockwise]);

  return (
    <button
      onMouseEnter={() => {
        setHovered(true);
      }}
      onMouseLeave={() => {
        setHovered(false);
      }}
      className="relative flex w-full justify-center rounded-full scale-[100%] hover:scale-[102%] transition-transform duration-300"
      {...props}
    >
      <div className={cn(contentStyles, presetClassNames[preset])}>
        {children}
      </div>
      <motion.div
        className="flex-none inset-0 overflow-hidden relative z-0 rounded-[inherit]"
        style={{
          filter: "blur(2px)",
          position: "absolute",
          width: "100%",
          height: "100%",
        }}
        initial={{ background: movingMap[direction] }}
        animate={{
          background: hovered
            ? [movingMap[direction], highlight]
            : movingMap[direction],
        }}
        transition={{ ease: "linear", duration }}
      />
    </button>
  );
}
