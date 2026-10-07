import { cn } from "./cn.js";

const palettes = {
  neutral: {
    filled: "bg-mono-200 border-mono-300 dark:bg-black",
    hover:
      "hover:bg-mono-100 dark:hover:bg-mono-900 transition-colors duration-300",
    empty: "bg-mono-200/30 border-mono-300 dark:bg-black border-dashed",
  },
  red: {
    filled: "bg-red-100 border-red-300 dark:bg-red-800",
    hover:
      "hover:bg-red-200 hover:dark:bg-red-700 transition-colors duration-300",
    empty: "bg-red-100/20 border-red-300 dark:bg-red-800/20 border-dashed",
  },
  indigo: {
    filled: "bg-indigo-100 border-indigo-300 dark:bg-indigo-900",
    hover:
      "hover:bg-indigo-200 dark:hover:bg-indigo-800 transition-colors duration-300",
    empty:
      "bg-indigo-100/20 border-indigo-300 dark:bg-indigo-900/20 border-dashed",
  },
  pink: {
    filled: "bg-pink-100 border-pink-300 dark:bg-pink-900",
    hover:
      "hover:bg-pink-200 hover:dark:bg-pink-800 transition-colors duration-300",
    empty: "bg-pink-100/20 border-pink-300 dark:bg-pink-900/20 border-dashed",
  },
  sky: {
    filled: "bg-sky-100 border-sky-300 dark:bg-sky-900",
    hover:
      "hover:bg-sky-200 hover:dark:bg-sky-800 transition-colors duration-300",
    empty: "bg-sky-100/10 border-sky-300 dark:bg-sky-900/20 border-dashed",
  },
};

const tones = {
  inherit: { background: "bg-inherit", border: "border-inherit" },
  orange: {
    background: "bg-ns-orange-bg dark:bg-ns-orange-bg-dark/10",
    border: "border-ns-orange-bg-dark/50 dark:border-ns-orange-bg-dark",
  },
  purple: {
    background: "bg-ns-purple-bg dark:bg-ns-purple-bg-dark/10",
    border: "border-ns-purple-bg-dark/50 dark:border-ns-purple-bg-dark",
  },
  red: {
    background: "bg-ns-red-bg dark:bg-ns-red-bg-dark/10",
    border: "border-ns-red-bg-dark/50 dark:border-ns-red-bg-dark",
  },
  green: {
    background: "bg-ns-green-bg dark:bg-ns-green-bg-dark/10",
    border: "border-ns-green-bg-dark/50 dark:border-ns-green-bg-dark",
  },
  blue: {
    background: "bg-ns-blue-bg dark:bg-ns-blue-bg-dark/10",
    border: "border-ns-blue-bg-dark/50 dark:border-ns-blue-bg-dark",
  },
  gray: {
    background: "bg-ns-gray-bg dark:bg-ns-gray-bg-dark/15",
    border: "border-ns-gray-bg-dark/50 dark:border-ns-gray-bg-dark",
  },
  yellow: {
    background: "bg-ns-yellow-bg dark:bg-ns-yellow-bg-dark/10",
    border: "border-ns-yellow-bg-dark/50 dark:border-ns-yellow-bg-dark",
  },
  brown: {
    background: "bg-ns-brown-bg dark:bg-ns-brown-bg-dark/10",
    border: "border-ns-brown-bg-dark/50 dark:border-ns-brown-bg-dark",
  },
  pink: {
    background: "bg-ns-pink-bg dark:bg-ns-pink-bg-dark/10",
    border: "border-ns-pink-bg-dark/50 dark:border-ns-pink-bg-dark",
  },
};

export interface CardTileProps {
  palette?: keyof typeof palettes | undefined;
  tone?: keyof typeof tones | undefined;
  selected?: boolean | undefined;
  dashed?: boolean | undefined;
  updated?: boolean | undefined;
  faded?: boolean | undefined;
}

// Keep the original precedence when selection overrides tone and update borders.
export function cardTileClasses(
  variant: "paletteTile" | "toneTile" | "emptyTile" | undefined | null,
  {
    palette = "sky",
    tone = "inherit",
    selected,
    dashed,
    updated,
  }: CardTileProps,
) {
  if (variant === "emptyTile")
    return cn("mb-2 w-full", palettes[palette].empty);
  if (variant !== "paletteTile" && variant !== "toneTile") return "";
  const colored = variant === "toneTile";
  return cn(
    "mb-2 w-full transition-all duration-400 hover:cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400",
    colored &&
      cn(
        tone !== "inherit" &&
          "border border-white dark:border-mono-900 hover:border-neutral-400 dark:hover:border-mono-200",
        tones[tone].border,
      ),
    colored
      ? cn(
          "bg-white dark:bg-mono-900 hover:bg-neutral-10 hover:dark:bg-mono-800 hover:text-black hover:dark:text-white",
          tones[tone].background,
        )
      : cn(
          palettes[palette].filled,
          palettes[palette].hover,
          "transition-colors duration-300",
        ),
    dashed && "border-dashed",
    updated && "animate-pulse-blue-border border-blue-500",
    selected && !colored && palettes[palette].filled,
    selected && "z-20 scale-[102%] shadow-2xl",
    selected &&
      cn(
        "dark:bg-mono-950 bg-white border border-neutral-400 dark:border-mono-200 shadow-xl",
        "border-neutral-600",
      ),
    "border-2",
  );
}
