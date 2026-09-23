import {
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronsUpDown,
  LogOut,
  Menu,
  PanelLeft,
  Settings,
  X,
} from "lucide-react";
import * as React from "react";

import { Button } from "./button.js";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./breadcrumb.js";
import { cn } from "./cn.js";
import { NavigationLink } from "./navigation.js";
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
  current?: boolean;
}

export interface AppBreadcrumbItem {
  id: string;
  label: string;
  href?: string;
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
  productSettings?: Omit<AccountMenuAction, "id" | "icon">;
  onOpenTenantAccountSettings: () => void;
  onSignOut: () => void;
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
      <span className="whitespace-nowrap">{action.label}</span>
    </>
  );
  return (
    <DropdownMenuItem
      className="grid min-h-9 cursor-pointer grid-cols-[1rem_minmax(0,1fr)] gap-2 rounded-md px-2 text-sm"
      asChild={Boolean(action.href)}
      {...(action.onSelect ? { onSelect: action.onSelect } : {})}
    >
      {action.href ? (
        <NavigationLink href={action.href}>{content}</NavigationLink>
      ) : (
        <div>{content}</div>
      )}
    </DropdownMenuItem>
  );
}

export function AccountMenu({
  tenant,
  userName,
  userDetail,
  tenants = [],
  productSettings,
  onOpenTenantAccountSettings,
  onSignOut,
}: AccountMenuProps): React.JSX.Element {
  const menuActions: AccountMenuAction[] = [
    ...(productSettings
      ? [
          {
            id: "product-settings",
            label: productSettings.label,
            ...(productSettings.href ? { href: productSettings.href } : {}),
            ...(productSettings.onSelect
              ? { onSelect: productSettings.onSelect }
              : {}),
            icon: <Settings aria-hidden="true" className="size-4" />,
          },
        ]
      : []),
    {
      id: "tenant-account-settings",
      label: "Tenant and account settings",
      onSelect: onOpenTenantAccountSettings,
      icon: <Settings aria-hidden="true" className="size-4" />,
    },
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
          variant="ghost"
          className="h-auto w-full justify-start rounded-full border-transparent p-1.5 text-left"
        >
          <Initials value={userName} />
          <span className="grid min-w-0 flex-1 gap-0.5 md:group-data-[collapsed=true]/sidebar:hidden">
            <span className="truncate text-sm font-semibold text-foreground">
              {tenant}
            </span>
            <span className="truncate text-xs font-normal text-muted-foreground">
              {userName}
            </span>
          </span>
          <ChevronsUpDown
            aria-hidden="true"
            className="size-4 text-muted-foreground md:group-data-[collapsed=true]/sidebar:hidden"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side="top"
        align="start"
        sideOffset={8}
        className="w-max min-w-[320px] max-w-[calc(100vw-1rem)] rounded-lg p-1.5"
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

function Ctx9Mark(): React.JSX.Element {
  return (
    <svg aria-hidden="true" className="size-8 shrink-0" viewBox="0 0 64 64">
      <g fill="#f3ecec" shapeRendering="crispEdges">
        <rect x="10" y="10" width="12" height="12" />
        <rect x="26" y="10" width="12" height="12" />
        <rect x="42" y="26" width="12" height="12" />
        <rect x="10" y="42" width="12" height="12" />
        <rect x="42" y="42" width="12" height="12" />
      </g>
      <rect
        x="10"
        y="26"
        width="12"
        height="12"
        fill="#e9f59f"
        shapeRendering="crispEdges"
      />
    </svg>
  );
}

export function AppSidebarHeader({
  product,
  products,
}: {
  product: string;
  products: readonly AppNavigationItem[];
}): React.JSX.Element {
  return (
    <div className="flex min-h-16 items-center px-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            type="button"
            variant="ghost"
            className="h-12 w-full justify-start gap-2.5 border-transparent px-2"
            aria-label={`Open All apps. Current app: ${product}`}
          >
            <Ctx9Mark />
            <span className="min-w-0 flex-1 text-left text-sm font-semibold md:group-data-[collapsed=true]/sidebar:hidden">
              CTX9
            </span>
            <ChevronDown
              aria-hidden="true"
              className="size-4 text-muted-foreground md:group-data-[collapsed=true]/sidebar:hidden"
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          side="bottom"
          align="start"
          sideOffset={4}
          className="w-[230px] rounded-lg p-1.5"
        >
          <DropdownMenuLabel>All apps</DropdownMenuLabel>
          {products.map((item) => (
            <DropdownMenuItem
              key={item.id}
              asChild
              className="min-h-9 cursor-pointer gap-2 rounded-md px-2 text-sm"
            >
              <NavigationLink href={item.href} className="no-underline">
                <span className="min-w-0 flex-1 truncate">{item.label}</span>
                {item.current && (
                  <Check aria-label="Current service" className="size-4" />
                )}
              </NavigationLink>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export function AppSidebarGroup({
  label,
  children,
}: {
  label?: string;
  children: React.ReactNode;
}): React.JSX.Element {
  return (
    <section className="grid gap-1 px-2">
      {label && (
        <h2 className="px-2 pt-1 text-xs font-medium text-muted-foreground md:group-data-[collapsed=true]/sidebar:hidden">
          {label}
        </h2>
      )}
      <nav aria-label={label}>{children}</nav>
    </section>
  );
}

export function AppSidebarLink({
  item,
}: {
  item: AppNavigationItem;
}): React.JSX.Element {
  return (
    <NavigationLink
      href={item.href}
      aria-current={item.current ? "page" : undefined}
      className={cn(
        "flex min-h-9 items-center rounded-md px-2.5 text-sm font-medium text-nav-foreground no-underline transition-colors hover:bg-sidebar-hover hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus",
        item.current && "bg-selected text-foreground",
      )}
    >
      <span className="truncate md:group-data-[collapsed=true]/sidebar:hidden">
        {item.label}
      </span>
      <span
        aria-hidden="true"
        className="hidden w-full text-center md:group-data-[collapsed=true]/sidebar:block"
      >
        {item.label.slice(0, 1)}
      </span>
    </NavigationLink>
  );
}

export function AppSidebarFooter({
  account,
}: {
  account: AccountMenuProps;
}): React.JSX.Element {
  return (
    <div className="mt-auto border-t border-border p-2">
      <AccountMenu {...account} />
    </div>
  );
}

export function AppSidebar({
  product,
  products,
  navigation,
  account,
  mobileOpen,
  onCloseMobile,
  collapsed,
}: {
  product: string;
  products: readonly AppNavigationItem[];
  navigation: readonly AppNavigationItem[];
  account: AccountMenuProps;
  mobileOpen: boolean;
  onCloseMobile: () => void;
  collapsed: boolean;
}): React.JSX.Element {
  return (
    <aside
      aria-label={`${product} sidebar`}
      data-mobile-open={mobileOpen}
      data-collapsed={collapsed}
      className={cn(
        "group/sidebar fixed inset-y-0 left-0 z-40 flex w-[246px] -translate-x-full flex-col border-r border-border bg-sidebar transition-[width,transform] duration-150 data-[mobile-open=true]:translate-x-0 md:sticky md:top-0 md:h-dvh md:translate-x-0 md:data-[collapsed=true]:w-14",
      )}
    >
      <div className="flex items-center">
        <div className="min-w-0 flex-1">
          <AppSidebarHeader product={product} products={products} />
        </div>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="m-3 size-8 md:hidden"
          onClick={onCloseMobile}
          aria-label="Close menu"
        >
          <X aria-hidden="true" className="size-4" />
        </Button>
      </div>
      <div className="grid gap-3 overflow-y-auto pb-3 pt-1">
        <AppSidebarGroup label={product}>
          {navigation.map((item) => (
            <AppSidebarLink key={item.id} item={item} />
          ))}
        </AppSidebarGroup>
      </div>
      <AppSidebarFooter account={account} />
    </aside>
  );
}

function ApplicationMain({
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

export function ApplicationLayout({
  product,
  products,
  navigation,
  account,
  children,
  className,
  skipLinkLabel = "Skip to content",
  mainId = "main-content",
  breadcrumbs,
}: {
  product: string;
  products: readonly AppNavigationItem[];
  navigation: readonly AppNavigationItem[];
  account: AccountMenuProps;
  children: React.ReactNode;
  className?: string;
  skipLinkLabel?: string;
  mainId?: string;
  breadcrumbs: readonly AppBreadcrumbItem[];
}): React.JSX.Element {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [collapsed, setCollapsed] = React.useState(false);
  React.useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
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
        "md:grid-cols-[246px_minmax(0,1fr)]",
        "data-[collapsed=true]:md:grid-cols-[56px_minmax(0,1fr)]",
        className,
      )}
      data-collapsed={collapsed}
    >
      <a className="skip-link" href={`#${mainId}`}>
        {skipLinkLabel}
      </a>
      <AppSidebar
        product={product}
        products={products}
        navigation={navigation}
        account={account}
        mobileOpen={mobileOpen}
        collapsed={collapsed}
        onCloseMobile={() => {
          setMobileOpen(false);
        }}
      />
      {mobileOpen && (
        <Button
          type="button"
          variant="ghost"
          className="fixed inset-0 z-30 h-auto w-auto rounded-none border-0 bg-black/70 p-0 md:hidden"
          onClick={() => {
            setMobileOpen(false);
          }}
          aria-label="Close menu"
        />
      )}
      <ApplicationMain mainId={mainId}>
        <header className="sticky top-0 z-20 flex min-h-13 items-center gap-3 border-b border-border bg-black/95 px-4">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="size-8 md:hidden"
            onClick={() => {
              setMobileOpen(true);
            }}
            aria-label="Open menu"
          >
            <Menu aria-hidden="true" className="size-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="hidden size-8 md:inline-flex"
            onClick={() => {
              setCollapsed((value) => !value);
            }}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <PanelLeft aria-hidden="true" className="size-4" />
          </Button>
          <div className="min-w-0 flex-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <Breadcrumb>
              <BreadcrumbList className="w-max flex-nowrap font-semibold">
                {breadcrumbs.map((item, index) => (
                  <React.Fragment key={item.id}>
                    {index > 0 && <BreadcrumbSeparator />}
                    <BreadcrumbItem>
                      {item.href ? (
                        <BreadcrumbLink href={item.href}>
                          {item.label}
                        </BreadcrumbLink>
                      ) : (
                        <BreadcrumbPage>{item.label}</BreadcrumbPage>
                      )}
                    </BreadcrumbItem>
                  </React.Fragment>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        {children}
      </ApplicationMain>
    </div>
  );
}

export function AuthShell({
  title,
  description,
  children,
  footer,
  brandHref = "https://platform.ctx9.com",
  brandTitle = "Complex infrastructure, made quiet.",
  brandDescription = "One account for your services, publications, and encrypted configuration.",
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  brandHref?: string;
  brandTitle?: string;
  brandDescription?: string;
}): React.JSX.Element {
  return (
    <main className="grid min-h-dvh bg-black text-foreground lg:grid-cols-2">
      <section className="flex min-w-0 items-center justify-center bg-sidebar px-5 py-10 sm:px-8">
        <div className="w-full max-w-md">
          <NavigationLink
            href={brandHref}
            className="text-sm font-semibold text-foreground no-underline"
          >
            CTX9
          </NavigationLink>
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
        <NavigationLink
          href="https://platform.ctx9.com"
          className="font-medium text-foreground no-underline"
        >
          CTX9
        </NavigationLink>
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
  parent,
  className,
}: {
  title: React.ReactNode;
  description?: string;
  actions?: React.ReactNode;
  parent?: { href: string; label: string };
  className?: string;
}): React.JSX.Element {
  return (
    <header
      className={cn(
        "mb-8 flex flex-wrap items-start justify-between gap-4",
        className,
      )}
    >
      <div className="flex min-w-0 items-start gap-2">
        {parent && (
          <Button
            asChild
            type="button"
            variant="ghost"
            size="icon"
            className="mt-0.5 size-8 shrink-0"
          >
            <NavigationLink href={parent.href} aria-label={parent.label}>
              <ChevronLeft aria-hidden="true" className="size-4" />
            </NavigationLink>
          </Button>
        )}
        <div className="grid min-w-0 gap-1.5">
          <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
      </div>
      {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
    </header>
  );
}
