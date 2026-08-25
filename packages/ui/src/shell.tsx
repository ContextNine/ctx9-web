import {
  Check,
  ChevronLeft,
  ChevronRight,
  ChevronsUpDown,
  LogOut,
  Menu,
  Plus,
  Settings,
  Shield,
  X,
} from "lucide-react";
import * as React from "react";

import { Button } from "./button.js";
import { cn } from "./cn.js";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./overlays.js";

export interface AppNavigationItem {
  id: string;
  label: string;
  href: string;
  icon?: React.ReactNode;
  current?: boolean;
}

export interface AccountTenant {
  id: string;
  name: string;
  detail?: string;
  current?: boolean;
  onSelect?: () => void;
}

export interface AccountMenuAction {
  id: string;
  label: string;
  href?: string;
  onSelect?: () => void;
  icon?: React.ReactNode;
}

export interface AccountMenuProps {
  tenant: string;
  userName: string;
  userDetail?: string;
  tenants?: readonly AccountTenant[];
  actions?: readonly AccountMenuAction[];
  canManageTenant?: boolean;
  canCreateTenant?: boolean;
  onSignOut: () => void;
  collapsed?: boolean;
}

function Initials({ value }: { value: string }): React.JSX.Element {
  const initials = value
    .split(/\s+/u)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
  return (
    <span className="grid size-10 shrink-0 place-items-center rounded-full border border-border-strong bg-input text-xs font-semibold text-foreground">
      {initials || "C9"}
    </span>
  );
}

function AccountAction({ action }: { action: AccountMenuAction }) {
  const content = (
    <>
      <span className="grid size-4 place-items-center text-muted-foreground">
        {action.icon}
      </span>
      <span>{action.label}</span>
    </>
  );
  return (
    <DropdownMenuItem
      className="grid min-h-9 cursor-pointer grid-cols-[1rem_minmax(0,1fr)] gap-2 rounded-md px-2 text-sm"
      asChild={Boolean(action.href)}
      {...(action.onSelect ? { onSelect: action.onSelect } : {})}
    >
      {action.href ? <a href={action.href}>{content}</a> : <div>{content}</div>}
    </DropdownMenuItem>
  );
}

export function AccountMenu({
  tenant,
  userName,
  userDetail,
  tenants = [],
  actions = [],
  canManageTenant = false,
  canCreateTenant = false,
  onSignOut,
  collapsed = false,
}: AccountMenuProps): React.JSX.Element {
  const menuActions: AccountMenuAction[] = [
    {
      id: "security",
      label: "Account security",
      href: "https://auth.ctx9.com/account/security",
      icon: <Shield aria-hidden="true" className="size-4" />,
    },
    ...actions,
    ...(canManageTenant
      ? [
          {
            id: "tenant-settings",
            label: "Tenant settings",
            href: "https://platform.ctx9.com/settings",
            icon: <Settings aria-hidden="true" className="size-4" />,
          },
        ]
      : []),
    ...(canCreateTenant
      ? [
          {
            id: "create-tenant",
            label: "Create tenant",
            href: "https://platform.ctx9.com/tenants/new",
            icon: <Plus aria-hidden="true" className="size-4" />,
          },
        ]
      : []),
  ];
  const availableTenants =
    tenants.length > 0
      ? tenants
      : [{ id: "current", name: tenant, current: true }];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant="quiet"
          className={cn(
            "h-auto w-full justify-start rounded-full border-transparent p-1.5 text-left",
            collapsed && "justify-center px-0",
          )}
          aria-label={collapsed ? `${tenant}, ${userName}` : undefined}
        >
          <Initials value={userName} />
          {!collapsed && (
            <>
              <span className="grid min-w-0 flex-1 gap-0.5">
                <span className="truncate text-sm font-semibold text-foreground">
                  {tenant}
                </span>
                <span className="truncate text-xs font-normal text-muted-foreground">
                  {userName}
                </span>
              </span>
              <ChevronsUpDown
                aria-hidden="true"
                className="size-4 text-muted-foreground"
              />
            </>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side="top"
        align="start"
        sideOffset={8}
        className="w-[270px] rounded-lg p-1.5"
      >
        <div className="grid gap-0.5 px-2 py-1.5">
          <strong className="truncate text-sm font-semibold">{userName}</strong>
          {userDetail && (
            <span className="truncate text-xs text-muted-foreground">
              {userDetail}
            </span>
          )}
        </div>
        <DropdownMenuLabel>Your tenant</DropdownMenuLabel>
        {availableTenants.map((item) => (
          <DropdownMenuItem
            key={item.id}
            className="min-h-12 cursor-pointer gap-2 rounded-md p-1"
            {...(item.onSelect ? { onSelect: item.onSelect } : {})}
          >
            <Initials value={item.name} />
            <span className="grid min-w-0 flex-1 gap-0.5">
              <strong className="truncate text-sm font-semibold">
                {item.name}
              </strong>
              {item.detail && (
                <span className="truncate text-xs text-muted-foreground">
                  {item.detail}
                </span>
              )}
            </span>
            {item.current && (
              <Check aria-label="Current tenant" className="mr-1 size-4" />
            )}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        {menuActions.map((action) => (
          <AccountAction key={action.id} action={action} />
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="grid min-h-9 cursor-pointer grid-cols-[1rem_minmax(0,1fr)] gap-2 rounded-md px-2 text-sm"
          onSelect={onSignOut}
        >
          <LogOut aria-hidden="true" className="size-4 text-muted-foreground" />
          <span>Sign out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function AppSidebarHeader({
  collapsed,
  onToggle,
}: {
  collapsed: boolean;
  onToggle: () => void;
}): React.JSX.Element {
  return (
    <div
      className={cn(
        "flex min-h-16 items-center justify-between gap-2 px-3",
        collapsed && "justify-center px-2",
      )}
    >
      {!collapsed && (
        <a
          href="https://platform.ctx9.com"
          className="flex min-w-0 items-center gap-2.5 text-foreground no-underline"
        >
          <span className="grid size-8 place-items-center rounded-md border border-border-strong font-mono text-xs font-semibold">
            C9
          </span>
          <span className="text-sm font-semibold">CTX9</span>
        </a>
      )}
      <Button
        type="button"
        variant="quiet"
        size="icon"
        className="size-8 shrink-0"
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        onClick={onToggle}
      >
        {collapsed ? (
          <ChevronRight aria-hidden="true" className="size-4" />
        ) : (
          <ChevronLeft aria-hidden="true" className="size-4" />
        )}
      </Button>
    </div>
  );
}

export function AppSidebarGroup({
  label,
  children,
  collapsed = false,
}: {
  label?: string;
  children: React.ReactNode;
  collapsed?: boolean;
}): React.JSX.Element {
  return (
    <section className="grid gap-1 px-2">
      {label && !collapsed && (
        <h2 className="px-2 pt-1 text-xs font-medium text-muted-foreground">
          {label}
        </h2>
      )}
      <nav aria-label={label}>{children}</nav>
    </section>
  );
}

export function AppSidebarLink({
  item,
  collapsed = false,
}: {
  item: AppNavigationItem;
  collapsed?: boolean;
}): React.JSX.Element {
  return (
    <a
      href={item.href}
      aria-current={item.current ? "page" : undefined}
      title={collapsed ? item.label : undefined}
      className={cn(
        "flex min-h-9 items-center gap-2.5 rounded-md px-2.5 text-sm font-medium text-nav-foreground no-underline transition-colors hover:bg-sidebar-hover hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus",
        item.current && "bg-selected text-foreground",
        collapsed && "justify-center px-0",
      )}
    >
      <span className="grid size-4 shrink-0 place-items-center text-muted-foreground [svg]:size-4">
        {item.icon}
      </span>
      {!collapsed && <span className="truncate">{item.label}</span>}
    </a>
  );
}

export function AppSidebarFooter({
  account,
  collapsed,
}: {
  account: AccountMenuProps;
  collapsed: boolean;
}): React.JSX.Element {
  return (
    <div className="mt-auto border-t border-border p-2">
      <AccountMenu {...account} collapsed={collapsed} />
    </div>
  );
}

export function AppSidebar({
  product,
  products,
  navigation,
  account,
  collapsed,
  mobileOpen,
  onToggle,
  onCloseMobile,
}: {
  product: string;
  products: readonly AppNavigationItem[];
  navigation: readonly AppNavigationItem[];
  account: AccountMenuProps;
  collapsed: boolean;
  mobileOpen: boolean;
  onToggle: () => void;
  onCloseMobile: () => void;
}): React.JSX.Element {
  return (
    <aside
      aria-label={`${product} sidebar`}
      data-mobile-open={mobileOpen}
      className={cn(
        "fixed inset-y-0 left-0 z-40 flex w-[246px] -translate-x-full flex-col border-r border-border bg-sidebar transition-[transform,width] duration-150 data-[mobile-open=true]:translate-x-0 md:sticky md:top-0 md:h-dvh md:translate-x-0",
        collapsed && "md:w-[62px]",
      )}
    >
      <div className="flex items-center md:hidden">
        <a
          href="https://platform.ctx9.com"
          className="ml-3 flex min-w-0 flex-1 items-center gap-2.5 text-foreground no-underline"
        >
          <span className="grid size-8 place-items-center rounded-md border border-border-strong font-mono text-xs font-semibold">
            C9
          </span>
          <span className="text-sm font-semibold">CTX9</span>
        </a>
        <Button
          type="button"
          variant="quiet"
          size="icon"
          className="m-3 size-8"
          onClick={onCloseMobile}
          aria-label="Close menu"
        >
          <X aria-hidden="true" className="size-4" />
        </Button>
      </div>
      <div className="hidden md:block">
        <AppSidebarHeader collapsed={collapsed} onToggle={onToggle} />
      </div>
      <div className="grid gap-3 overflow-y-auto pb-3">
        <AppSidebarGroup collapsed={collapsed} label="Services">
          {products.map((item) => (
            <AppSidebarLink key={item.id} item={item} collapsed={collapsed} />
          ))}
        </AppSidebarGroup>
        <div className="mx-4 h-px bg-border" />
        <AppSidebarGroup collapsed={collapsed} label={product}>
          {navigation.map((item) => (
            <AppSidebarLink key={item.id} item={item} collapsed={collapsed} />
          ))}
        </AppSidebarGroup>
      </div>
      <AppSidebarFooter account={account} collapsed={collapsed} />
    </aside>
  );
}

export function SidebarInset({
  children,
  mainId = "main-content",
}: {
  children: React.ReactNode;
  mainId?: string;
}): React.JSX.Element {
  return (
    <main id={mainId} tabIndex={-1} className="min-w-0 overflow-y-auto">
      {children}
    </main>
  );
}

export function AppShell({
  product,
  products,
  navigation,
  account,
  children,
  className,
  skipLinkLabel = "Skip to content",
  mainId = "main-content",
}: {
  product: string;
  products: readonly AppNavigationItem[];
  navigation: readonly AppNavigationItem[];
  account: AccountMenuProps;
  children: React.ReactNode;
  className?: string;
  skipLinkLabel?: string;
  mainId?: string;
}): React.JSX.Element {
  const [collapsed, setCollapsed] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  React.useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "b") {
        event.preventDefault();
        setCollapsed((current) => !current);
      }
    };
    window.addEventListener("keydown", close);
    return () => {
      window.removeEventListener("keydown", close);
    };
  }, []);
  return (
    <div
      className={cn(
        "min-h-dvh bg-black text-foreground md:grid",
        collapsed
          ? "md:grid-cols-[62px_minmax(0,1fr)]"
          : "md:grid-cols-[246px_minmax(0,1fr)]",
        className,
      )}
    >
      <a className="skip-link" href={`#${mainId}`}>
        {skipLinkLabel}
      </a>
      <AppSidebar
        product={product}
        products={products}
        navigation={navigation}
        account={account}
        collapsed={collapsed}
        mobileOpen={mobileOpen}
        onToggle={() => {
          setCollapsed((current) => !current);
        }}
        onCloseMobile={() => {
          setMobileOpen(false);
        }}
      />
      {mobileOpen && (
        <Button
          type="button"
          variant="quiet"
          className="fixed inset-0 z-30 h-auto w-auto rounded-none border-0 bg-black/70 p-0 md:hidden"
          onClick={() => {
            setMobileOpen(false);
          }}
          aria-label="Close menu"
        />
      )}
      <SidebarInset mainId={mainId}>
        <header className="sticky top-0 z-20 flex min-h-13 items-center gap-3 border-b border-border bg-black/95 px-4 md:hidden">
          <Button
            type="button"
            variant="quiet"
            size="icon"
            className="size-8"
            onClick={() => {
              setMobileOpen(true);
            }}
            aria-label="Open menu"
          >
            <Menu aria-hidden="true" className="size-4" />
          </Button>
          <span className="text-sm font-semibold">{product}</span>
        </header>
        {children}
      </SidebarInset>
    </div>
  );
}

export function AuthShell({
  title,
  description,
  children,
  footer,
  brandTitle = "Complex infrastructure, made quiet.",
  brandDescription = "One account for your services, publications, and encrypted configuration.",
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  brandTitle?: string;
  brandDescription?: string;
}): React.JSX.Element {
  return (
    <main className="grid min-h-dvh bg-black text-foreground lg:grid-cols-2">
      <section className="flex min-w-0 items-center justify-center bg-sidebar px-5 py-10 sm:px-8">
        <div className="w-full max-w-md">
          <a
            href="https://platform.ctx9.com"
            className="text-sm font-semibold text-foreground no-underline"
          >
            CTX9
          </a>
          <header className="mt-16 mb-7 grid gap-2">
            <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
            {description && (
              <p className="text-sm text-secondary-foreground">{description}</p>
            )}
          </header>
          <div className="grid gap-4">{children}</div>
          {footer && (
            <footer className="mt-10 text-sm text-muted-foreground">
              {footer}
            </footer>
          )}
        </div>
      </section>
      <aside className="hidden min-w-0 items-center justify-center border-l border-border bg-black p-14 lg:flex">
        <div className="w-full max-w-lg border border-border p-11">
          <h2 className="text-4xl font-semibold leading-tight tracking-[-0.035em] xl:text-5xl">
            {brandTitle}
          </h2>
          <p className="mt-7 max-w-md font-mono text-sm leading-7 text-secondary-foreground">
            {brandDescription}
          </p>
        </div>
      </aside>
    </main>
  );
}

export function FocusedShell({
  title,
  description,
  children,
  footer,
  className,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}): React.JSX.Element {
  return (
    <main className="min-h-dvh bg-black px-4 py-12 text-foreground sm:px-6">
      <div className={cn("mx-auto grid w-full max-w-md gap-6", className)}>
        <a
          href="https://platform.ctx9.com"
          className="font-medium text-foreground no-underline"
        >
          CTX9
        </a>
        <header className="grid gap-2">
          <h1 className="text-2xl font-medium tracking-tight">{title}</h1>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </header>
        {children}
        {footer && (
          <footer className="text-sm text-muted-foreground">{footer}</footer>
        )}
      </div>
    </main>
  );
}

export function PageHeading({
  title,
  description,
  actions,
  className,
}: {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  className?: string;
}): React.JSX.Element {
  return (
    <header
      className={cn(
        "mb-8 flex flex-wrap items-start justify-between gap-4",
        className,
      )}
    >
      <div className="grid gap-1.5">
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
    </header>
  );
}

export function OperationalList({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>): React.JSX.Element {
  return (
    <div
      className={cn("divide-y divide-border border-y border-border", className)}
      {...props}
    />
  );
}

export function OperationalRow({
  title,
  description,
  status,
  action,
  className,
}: {
  title: React.ReactNode;
  description?: React.ReactNode;
  status?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}): React.JSX.Element {
  return (
    <div
      className={cn(
        "grid min-h-16 grid-cols-[minmax(9rem,1fr)_minmax(12rem,2fr)_auto] items-center gap-4 px-1 py-2 hover:bg-sidebar-hover max-sm:grid-cols-[1fr_auto]",
        className,
      )}
    >
      <div className="text-sm font-medium">{title}</div>
      {description && (
        <div className="text-sm text-muted-foreground max-sm:col-span-2 max-sm:row-start-2">
          {description}
        </div>
      )}
      <div className="flex items-center justify-end gap-3">
        {status}
        {action}
      </div>
    </div>
  );
}
