import type { ComponentProps } from "react";

import { cn } from "./cn.js";

/**
 * Lucide's square pen. When its button is hovered, the pen turns full
 * contrast and circles once; reduced motion keeps only the colour.
 * Visible overflow keeps the circling pen whole beyond the icon's box.
 */
export function NewChatIcon({ className, ...props }: ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={cn("overflow-visible", className)}
      {...props}
    >
      <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path
        stroke="currentColor"
        className="transition-colors motion-safe:group-hover/btn:animate-[ctx9-pen-circle_500ms_linear] group-hover/btn:text-black dark:group-hover/btn:text-white"
        d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"
      />
    </svg>
  );
}
