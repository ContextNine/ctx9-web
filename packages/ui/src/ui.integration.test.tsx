// @vitest-environment jsdom

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import { axe } from "vitest-axe";
import { describe, expect, it, vi } from "vitest";

import { Button, buttonVariants } from "./button.js";
import { createCtx9Applications } from "./applications.js";
import { Checkbox, Input, Label } from "./controls.js";
import { DataTable, createDataTableColumnHelper } from "./data-table.js";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "./dialog.js";
import { NavigationProvider } from "./navigation.js";
import { ApplicationLayout } from "./shell.js";
import {
  TenantAccountSettingsDialog,
  type TenantAccountSettingsTabId,
} from "./settings-dialog.js";

describe("shared product primitives", () => {
  it("keeps standard actions neutral and high contrast", () => {
    const primary = buttonVariants({ variant: "default" });
    expect(primary).toContain("bg-black");
    expect(primary).toContain("text-white");
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
              agents: "/agents",
              secrets: "/secrets",
              publisher: "/publisher",
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
    expect(screen.getByLabelText("Search services")).toBeTruthy();
    expect(
      screen.getByRole("link", { name: "Settings" }).dataset.routerLink,
    ).toBe("true");
    await userEvent
      .setup()
      .click(screen.getByRole("button", { name: "Collapse sidebar" }));
    expect(screen.getByRole("button", { name: "Expand sidebar" })).toBeTruthy();
    await userEvent.setup().click(
      screen.getByRole("button", {
        name: "Open All apps. Current app: Secrets",
      }),
    );
    expect(
      screen.getAllByRole("menuitem").map((item) => item.textContent.trim()),
    ).toEqual(["Agents", "Secrets", "Publisher"]);
    const results = await axe(container, {
      rules: { "color-contrast": { enabled: false } },
    });
    expect(results.violations).toHaveLength(0);
  });

  it("sorts typed table rows and supports keyboard row navigation", async () => {
    interface ServiceRow {
      id: string;
      name: string;
      state: string;
    }
    const helper = createDataTableColumnHelper<ServiceRow>();
    const columns = helper.columns([
      helper.accessor("name", { header: "Name" }),
      helper.accessor("state", { header: "State", enableSorting: false }),
    ]);
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
