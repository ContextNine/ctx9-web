import type { ComponentType, ReactNode } from "react";

export function PortalBoundary({
  children,
  insideModal,
  portal: Portal,
}: {
  children: ReactNode;
  insideModal: boolean;
  portal: ComponentType<{ children?: ReactNode }>;
}) {
  return insideModal ? children : <Portal>{children}</Portal>;
}
