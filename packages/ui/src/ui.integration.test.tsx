// @vitest-environment jsdom

import { cleanup, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import { axe } from "vitest-axe";
import { afterEach, describe, expect, it, vi } from "vitest";

import { Button, buttonVariants } from "./button.js";
import { createCtx9Applications } from "./applications.js";
import { Input } from "./input.js";
import { Label } from "./label.js";
import { Checkbox } from "./checkbox.js";
import { DataTable, createDataTableColumnHelper } from "./data-table.js";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "./dialog.js";
import { NavigationProvider } from "./navigation.js";
import { Skeleton } from "./skeleton.js";
import { ApplicationLayout, PageHeading } from "./shell.js";
import {
  TenantAccountSettingsDialog,
  type TenantAccountSettingsTabId,
} from "./settings-dialog.js";

afterEach(cleanup);

describe("shared product primitives", () => {
  it("keeps standard actions neutral and high contrast", () => {
    const primary = buttonVariants({ variant: "primary" });
    expect(primary).toContain("bg-primary");
    expect(primary).toContain("text-primary-foreground");
    expect(primary).not.toContain("bg-selected");

    render(<Button loading>Save</Button>);
    const action = screen.getByRole("button");
    expect(action.className).toContain("bg-black");
    expect(action.className).toContain("text-white");
    expect(action.getAttribute("aria-busy")).toBe("true");
  });

  it("composes an accessible sidebar application surface", async () => {
    const { container } = render(
      <NavigationProvider
        link={React.forwardRef<HTMLAnchorElement, React.ComponentProps<"a">>(
          ({ children, ...props }, ref) => (
            <a ref={ref} data-router-link="true" {...props}>
              {children}
            </a>
          ),
        )}
      >
        <ApplicationLayout
          product="Secrets"
          products={createCtx9Applications({
            current: "secrets",
            origins: {
              secrets: "/secrets",
              publisher: "/publisher",
              testimonials: "/testimonials",
            },
          })}
          account={{
            tenant: "Northstar",
            userName: "Alex Morgan",
            userDetail: "alex@example.test",
            onOpenTenantAccountSettings: () => undefined,
            onSignOut: () => undefined,
          }}
          navigation={[
            { id: "overview", label: "Overview", href: "/", current: true },
            { id: "settings", label: "Settings", href: "/settings" },
          ]}
          breadcrumbs={[
            { id: "home", label: "Home", href: "/" },
            { id: "secrets", label: "Secrets" },
          ]}
        >
          <div className="grid gap-2">
            <Label htmlFor="search">Search services</Label>
            <Input id="search" />
            <label className="flex gap-2">
              <Checkbox aria-label="Show unavailable" />
              Show unavailable
            </label>
          </div>
        </ApplicationLayout>
      </NavigationProvider>,
    );
    expect(screen.getByRole("navigation", { name: "Secrets" })).toBeTruthy();
    expect(
      screen
        .getByRole("link", { name: "Skip to content" })
        .getAttribute("href"),
    ).toBe("#main-content");
    expect(screen.getByRole("main").getAttribute("tabindex")).toBe("-1");
    expect(screen.getByRole("navigation", { name: "breadcrumb" })).toBeTruthy();
    expect(screen.getByRole("link", { name: "Home" })).toBeTruthy();
    expect(screen.getByLabelText("Search services")).toBeTruthy();
    expect(
      screen.getByRole("link", { name: "Settings" }).dataset.routerLink,
    ).toBe("true");
    await userEvent
      .setup()
      .click(screen.getByRole("button", { name: "Collapse sidebar" }));
    expect(screen.getByRole("button", { name: "Expand sidebar" })).toBeTruthy();
    const user = userEvent.setup();
    const applicationMenu = screen.getByRole("button", {
      name: "Open All apps. Current app: Secrets",
    });
    await user.click(applicationMenu);
    expect(
      screen.getAllByRole("menuitem").map((item) => item.textContent.trim()),
    ).toEqual(["Secrets", "Publisher", "Testimonials"]);
    await user.keyboard("{Escape}");
    expect(document.activeElement).toBe(applicationMenu);

    await user.click(screen.getByRole("button", { name: "Open menu" }));
    expect(
      screen
        .getByRole("complementary", { name: "Secrets sidebar" })
        .getAttribute("data-mobile-open"),
    ).toBe("true");
    await user.click(
      within(
        screen.getByRole("complementary", { name: "Secrets sidebar" }),
      ).getByRole("button", { name: "Close menu" }),
    );
    expect(
      screen
        .getByRole("complementary", { name: "Secrets sidebar" })
        .getAttribute("data-mobile-open"),
    ).toBe("false");
    const results = await axe(container, {
      rules: { "color-contrast": { enabled: false } },
    });
    expect(results.violations).toHaveLength(0);
  });

  it("renders an icon-only parent action beside a page title", () => {
    render(
      <NavigationProvider
        link={React.forwardRef<HTMLAnchorElement, React.ComponentProps<"a">>(
          ({ children, ...props }, ref) => (
            <a ref={ref} {...props}>
              {children}
            </a>
          ),
        )}
      >
        <PageHeading
          title="Publication title"
          parent={{ href: "/", label: "Back to publications" }}
        />
      </NavigationProvider>,
    );
    const parent = screen.getByRole("link", { name: "Back to publications" });
    expect(parent.textContent).toBe("");
    expect(
      screen.getByRole("heading", { name: "Publication title" }),
    ).toBeTruthy();
  });

  it("sorts typed table rows and supports keyboard row navigation", async () => {
    interface ServiceRow {
      id: string;
      name: string;
      state: string;
    }
    const helper = createDataTableColumnHelper<ServiceRow>();
    const columns = [
      helper.accessor("name", { header: "Name" }),
      helper.accessor("state", { header: "State", enableSorting: false }),
    ];
    const onNavigate = vi.fn();
    function TableExample() {
      const [filter, setFilter] = React.useState("");
      return (
        <DataTable
          data={[
            { id: "2", name: "Publisher", state: "Ready" },
            { id: "1", name: "Agents", state: "Ready" },
          ]}
          columns={columns}
          getRowId={(row) => row.id}
          emptyMessage="No services"
          filter={{
            columnId: "name",
            value: filter,
            onChange: setFilter,
            label: "Find service",
          }}
          onRowNavigate={onNavigate}
          rowLabel={(row) => `Open ${row.name}`}
        />
      );
    }
    render(<TableExample />);
    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: /Name/u }));
    expect(
      screen
        .getAllByRole("row")
        .slice(1)
        .map((row) => row.textContent),
    ).toEqual(["AgentsReady", "PublisherReady"]);
    screen.getByRole("row", { name: "Open Agents" }).focus();
    await user.keyboard("{Enter}");
    expect(onNavigate).toHaveBeenCalledWith({
      id: "1",
      name: "Agents",
      state: "Ready",
    });
    await user.type(
      screen.getByRole("searchbox", { name: "Find service" }),
      "Pub",
    );
    expect(screen.queryByRole("row", { name: "Open Agents" })).toBeNull();
    expect(screen.getByRole("row", { name: "Open Publisher" })).toBeTruthy();
  });

  it("paginates, hides columns, preserves rows while fetching, and signals row intent", async () => {
    interface ServiceRow {
      id: string;
      name: string;
      state: string;
    }
    const helper = createDataTableColumnHelper<ServiceRow>();
    const columns = [
      helper.accessor("name", {
        header: "Name",
        enableHiding: false,
      }),
      helper.accessor("state", { header: "State" }),
    ];
    const onIntent = vi.fn();
    const { container } = render(
      <DataTable
        data={Array.from({ length: 26 }, (_, index) => ({
          id: String(index + 1),
          name: `Service ${String(index + 1).padStart(2, "0")}`,
          state: "Ready",
        }))}
        columns={columns}
        getRowId={(row) => row.id}
        emptyMessage="No services"
        isFetching
        onRowNavigate={() => undefined}
        onRowIntent={onIntent}
        rowLabel={(row) => `Open ${row.name}`}
      />,
    );
    const user = userEvent.setup();
    const region = container.querySelector("section");
    expect(region?.getAttribute("aria-busy")).toBe("true");
    expect(screen.getByRole("row", { name: "Open Service 01" })).toBeTruthy();

    await user.hover(screen.getByRole("row", { name: "Open Service 01" }));
    expect(onIntent).toHaveBeenCalledWith({
      id: "1",
      name: "Service 01",
      state: "Ready",
    });

    await user.click(screen.getByRole("button", { name: "Next" }));
    expect(screen.getByText("Page 2 of 2")).toBeTruthy();
    expect(screen.getByRole("row", { name: "Open Service 26" })).toBeTruthy();

    await user.click(screen.getByRole("button", { name: "Columns" }));
    await user.click(screen.getByRole("menuitemcheckbox", { name: "state" }));
    expect(screen.queryByRole("columnheader", { name: "State" })).toBeNull();
    expect(container.querySelector(".overflow-x-auto")).toBeTruthy();
  });

  it("renders Impression's loading geometry and pulse", () => {
    const { container } = render(<Skeleton className="h-8 w-40" />);
    const skeleton = container.firstElementChild;
    expect(skeleton?.className).toBe(
      "animate-pulse rounded-md bg-muted h-8 w-40",
    );
  });

  it("traps dialog focus and restores it to the trigger", async () => {
    const user = userEvent.setup();
    render(
      <Dialog>
        <DialogTrigger asChild>
          <Button type="button">Invite member</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Invite member</DialogTitle>
          <DialogDescription>
            Add someone to the current tenant.
          </DialogDescription>
          <Button type="button">Send invite</Button>
        </DialogContent>
      </Dialog>,
    );
    const trigger = screen.getByRole("button", { name: "Invite member" });
    await user.click(trigger);
    expect(screen.getByRole("dialog")).toBeTruthy();
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).toBeNull();
    expect(document.activeElement).toBe(trigger);
  });

  it("switches tenant settings tabs inside the shared dialog", async () => {
    const user = userEvent.setup();
    function SettingsExample() {
      const [activeTab, setActiveTab] =
        React.useState<TenantAccountSettingsTabId>("tenant");
      return (
        <TenantAccountSettingsDialog
          open
          onOpenChange={() => undefined}
          activeTab={activeTab}
          onActiveTabChange={setActiveTab}
          snapshot={{
            user: { name: "Alex Morgan", email: "alex@example.test" },
            tenants: [
              { id: "tenant-1", slug: "northstar", displayName: "Northstar" },
            ],
            selectedTenantId: "tenant-1",
            access: {
              clusterAdministrator: true,
              memberships: [
                {
                  tenantId: "tenant-1",
                  tenantSlug: "northstar",
                  tenantName: "Northstar",
                  role: "tenant_admin",
                  state: "active",
                },
              ],
            },
            passkeys: [],
            recoveryHref: "/recovery",
            accountSecurityHref: "/account/security",
          }}
          administration={{
            tenant: {
              id: "tenant-1",
              slug: "northstar",
              displayName: "Northstar",
            },
            members: [],
            invitations: [],
            provisioning: { state: "ready", steps: [] },
            resendAvailable: false,
          }}
          actions={{
            selectTenant: () => Promise.resolve(),
            createTenant: () => Promise.resolve(),
            createInvitation: () => Promise.resolve({}),
            updateMember: () => Promise.resolve(),
            retryProvisioning: () => Promise.resolve(),
          }}
        />
      );
    }

    const { container } = render(<SettingsExample />);
    expect(
      screen.getByRole("heading", { name: "Tenant", level: 2 }),
    ).toBeTruthy();
    await user.click(screen.getByRole("button", { name: "Access" }));
    expect(
      screen.getByRole("heading", { name: "Access", level: 2 }),
    ).toBeTruthy();
    const results = await axe(container, {
      rules: { "color-contrast": { enabled: false } },
    });
    expect(results.violations).toHaveLength(0);
  });
});
