"use client";

import { Slot } from "@radix-ui/react-slot";
import { PanelLeft } from "lucide-react";
import * as React from "react";

import { Button } from "./button.js";
import { cn } from "./cn.js";
import { Input } from "./input.js";
import { Separator } from "./separator.js";
import { Sheet, SheetContent, SheetDescription, SheetTitle } from "./sheet.js";
import { Skeleton } from "./skeleton.js";
import { NavigationLink, type NavigationLinkProps } from "./navigation.js";

interface SidebarContextValue {
  state: "expanded" | "collapsed";
  open: boolean;
  setOpen: (open: boolean) => void;
  openMobile: boolean;
  setOpenMobile: (open: boolean) => void;
  isMobile: boolean;
  toggleSidebar: () => void;
}

const SidebarContext = React.createContext<SidebarContextValue | null>(null);

export function useSidebar() {
  const context = React.useContext(SidebarContext);
  if (!context) throw new Error("useSidebar requires SidebarProvider");
  return context;
}

function useMobileBreakpoint() {
  const [mobile, setMobile] = React.useState(false);
  React.useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const update = () => {
      setMobile(media.matches);
    };
    update();
    media.addEventListener("change", update);
    return () => {
      media.removeEventListener("change", update);
    };
  }, []);
  return mobile;
}

export function SidebarProvider({
  defaultOpen = true,
  open: controlledOpen,
  onOpenChange,
  className,
  style,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}) {
  const [localOpen, setLocalOpen] = React.useState(defaultOpen);
  const [openMobile, setOpenMobile] = React.useState(false);
  const isMobile = useMobileBreakpoint();
  const open = controlledOpen ?? localOpen;
  const setOpen = React.useCallback(
    (next: boolean) => {
      onOpenChange?.(next);
      if (controlledOpen === undefined) setLocalOpen(next);
    },
    [controlledOpen, onOpenChange],
  );
  const toggleSidebar = React.useCallback(() => {
    if (isMobile) setOpenMobile((value) => !value);
    else setOpen(!open);
  }, [isMobile, open, setOpen]);

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() !== "b" || (!event.metaKey && !event.ctrlKey))
        return;
      event.preventDefault();
      toggleSidebar();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [toggleSidebar]);

  const value = React.useMemo<SidebarContextValue>(
    () => ({
      state: open ? "expanded" : "collapsed",
      open,
      setOpen,
      openMobile,
      setOpenMobile,
      isMobile,
      toggleSidebar,
    }),
    [isMobile, open, openMobile, setOpen, toggleSidebar],
  );
  return (
    <SidebarContext.Provider value={value}>
      <div
        data-slot="sidebar-wrapper"
        style={
          {
            "--sidebar-width": "15.375rem",
            "--sidebar-width-icon": "3.5rem",
            ...style,
          } as React.CSSProperties
        }
        className={cn("group/sidebar-wrapper flex min-h-dvh w-full", className)}
        {...props}
      >
        {children}
      </div>
    </SidebarContext.Provider>
  );
}

export function Sidebar({
  className,
  children,
  collapsible = "offcanvas",
  ...props
}: React.ComponentProps<"aside"> & {
  collapsible?: "offcanvas" | "icon" | "none";
}) {
  const sidebar = useSidebar();
  if (sidebar.isMobile && collapsible !== "none") {
    return (
      <Sheet open={sidebar.openMobile} onOpenChange={sidebar.setOpenMobile}>
        <SheetContent side="left" className={cn("w-72 gap-0 p-0", className)}>
          <SheetTitle className="sr-only">Navigation</SheetTitle>
          <SheetDescription className="sr-only">
            Product navigation
          </SheetDescription>
          <aside className="flex h-full flex-col" {...props}>
            {children}
          </aside>
        </SheetContent>
      </Sheet>
    );
  }
  const collapsed = collapsible !== "none" && !sidebar.open;
  return (
    <aside
      data-slot="sidebar"
      data-state={sidebar.state}
      data-collapsible={collapsed ? collapsible : ""}
      className={cn(
        "group/sidebar sticky top-0 hidden h-dvh w-(--sidebar-width) shrink-0 flex-col border-r border-border bg-sidebar text-foreground transition-[width] duration-150 md:flex",
        collapsed &&
          (collapsible === "icon"
            ? "w-(--sidebar-width-icon)"
            : "w-0 overflow-hidden border-0"),
        className,
      )}
      {...props}
    >
      {children}
    </aside>
  );
}

export function SidebarTrigger({
  className,
  ...props
}: React.ComponentProps<typeof Button>) {
  const { toggleSidebar, state, isMobile } = useSidebar();
  return (
    <Button
      type="button"
      variant="ghost"
      size="iconSm"
      aria-label={
        isMobile
          ? "Open navigation"
          : `${state === "expanded" ? "Collapse" : "Expand"} sidebar`
      }
      className={className}
      onClick={(event) => {
        props.onClick?.(event);
        if (!event.defaultPrevented) toggleSidebar();
      }}
      {...props}
    >
      <PanelLeft aria-hidden="true" className="size-4" />
    </Button>
  );
}

export function SidebarRail({
  className,
  ...props
}: React.ComponentProps<typeof Button>) {
  const { toggleSidebar } = useSidebar();
  return (
    <Button
      type="button"
      variant="ghost"
      tabIndex={-1}
      aria-label="Toggle sidebar"
      className={cn(
        "absolute inset-y-0 -right-1 hidden w-2 cursor-col-resize md:block",
        className,
      )}
      onClick={toggleSidebar}
      {...props}
    />
  );
}

export function SidebarInset({
  className,
  ...props
}: React.ComponentProps<"main">) {
  return <main className={cn("min-w-0 flex-1", className)} {...props} />;
}

export function SidebarHeader(props: React.ComponentProps<"header">) {
  return <header data-slot="sidebar-header" {...props} />;
}

export function SidebarFooter(props: React.ComponentProps<"footer">) {
  return <footer data-slot="sidebar-footer" {...props} />;
}

export function SidebarContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-content"
      className={cn("min-h-0 flex-1 overflow-y-auto", className)}
      {...props}
    />
  );
}

export function SidebarGroup({
  className,
  ...props
}: React.ComponentProps<"section">) {
  return (
    <section
      data-slot="sidebar-group"
      className={cn("grid gap-1 p-2", className)}
      {...props}
    />
  );
}

export function SidebarGroupLabel({
  className,
  ...props
}: React.ComponentProps<"h2">) {
  return (
    <h2
      data-slot="sidebar-group-label"
      className={cn(
        "px-2 py-1 text-xs font-medium text-muted-foreground group-data-[state=collapsed]/sidebar:hidden",
        className,
      )}
      {...props}
    />
  );
}

export function SidebarGroupAction({
  className,
  ...props
}: React.ComponentProps<typeof Button>) {
  return (
    <Button
      type="button"
      variant="ghost"
      data-slot="sidebar-group-action"
      size="iconSm"
      className={cn("ml-auto", className)}
      {...props}
    />
  );
}

export function SidebarGroupContent(props: React.ComponentProps<"div">) {
  return <div data-slot="sidebar-group-content" {...props} />;
}

export function SidebarMenu({
  className,
  ...props
}: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="sidebar-menu"
      className={cn("grid list-none gap-1 p-0", className)}
      {...props}
    />
  );
}

export function SidebarMenuItem({
  className,
  ...props
}: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="sidebar-menu-item"
      className={cn("relative", className)}
      {...props}
    />
  );
}

export function SidebarMenuButton({
  asChild = false,
  active = false,
  className,
  ...props
}: React.ComponentProps<"button"> & { asChild?: boolean; active?: boolean }) {
  const Component = asChild ? Slot : "button";
  return (
    <Component
      data-slot="sidebar-menu-button"
      data-active={active || undefined}
      className={cn(
        "flex min-h-9 w-full items-center gap-2 rounded-md px-2.5 text-left text-sm text-nav-foreground no-underline outline-none hover:bg-sidebar-hover hover:text-foreground focus-visible:ring-2 focus-visible:ring-focus data-[active=true]:bg-selected data-[active=true]:text-foreground group-data-[state=collapsed]/sidebar:justify-center group-data-[state=collapsed]/sidebar:px-2 group-data-[state=collapsed]/sidebar:[&>span]:hidden",
        className,
      )}
      {...props}
    />
  );
}

export function SidebarMenuAction({
  className,
  ...props
}: React.ComponentProps<typeof Button>) {
  return (
    <Button
      type="button"
      variant="ghost"
      data-slot="sidebar-menu-action"
      size="icon"
      className={cn("absolute top-0 right-0", className)}
      {...props}
    />
  );
}

export function SidebarMenuBadge({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="sidebar-menu-badge"
      className={cn(
        "ml-auto font-mono text-xs text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}

export function SidebarMenuSkeleton({
  className,
  showIcon = false,
}: {
  className?: string;
  showIcon?: boolean;
}) {
  return (
    <div className={cn("flex h-9 items-center gap-2 px-2", className)}>
      {showIcon && <Skeleton className="size-4 shrink-0" />}
      <Skeleton className="h-3 w-2/3" />
    </div>
  );
}

export function SidebarMenuSub(props: React.ComponentProps<"ul">) {
  return <ul data-slot="sidebar-menu-sub" {...props} />;
}

export function SidebarMenuSubItem(props: React.ComponentProps<"li">) {
  return <li data-slot="sidebar-menu-sub-item" {...props} />;
}

export function SidebarMenuSubButton({
  className,
  ...props
}: NavigationLinkProps) {
  return (
    <NavigationLink
      data-slot="sidebar-menu-sub-button"
      className={cn(
        "flex min-h-8 items-center rounded-md px-2 text-sm text-nav-foreground no-underline hover:bg-sidebar-hover hover:text-foreground",
        className,
      )}
      {...props}
    />
  );
}

export function SidebarInput({
  className,
  ...props
}: React.ComponentProps<typeof Input>) {
  return <Input className={cn("h-8", className)} {...props} />;
}

export function SidebarSeparator({
  className,
  ...props
}: React.ComponentProps<typeof Separator>) {
  return <Separator className={cn("mx-2 w-auto", className)} {...props} />;
}
