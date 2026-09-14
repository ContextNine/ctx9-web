"use client";

import { CircleCheck, Info, OctagonX, TriangleAlert } from "lucide-react";
import { Toaster as Sonner, type ToasterProps } from "sonner";

export function Toaster(props: ToasterProps) {
  return (
    <Sonner
      theme="dark"
      className="toaster group"
      icons={{
        success: <CircleCheck className="size-4" />,
        info: <Info className="size-4" />,
        warning: <TriangleAlert className="size-4" />,
        error: <OctagonX className="size-4" />,
        loading: <span aria-hidden="true" className="size-2 bg-foreground" />,
      }}
      toastOptions={{
        classNames: {
          toast: "border border-border bg-popover text-foreground",
        },
      }}
      {...props}
    />
  );
}
