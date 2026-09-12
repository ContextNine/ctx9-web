// @vitest-environment jsdom

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import { axe } from "vitest-axe";
import { describe, expect, it } from "vitest";

import { Button, FunkyLoaderButton, buttonVariants } from "./button.js";
import { createCtx9Applications } from "./applications.js";
import { Checkbox, Input, Label } from "./controls.js";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "./dialog.js";
import { AppShell, OperationalList, OperationalRow } from "./shell.js";
import {
  TenantAccountSettingsDialog,
  type TenantAccountSettingsTabId,
} from "./settings-dialog.js";

describe("shared product primitives", () => {
  it("keeps standard actions neutral and high contrast", () => {
    const primary = buttonVariants({ variant: "primary" });
    expect(primary).toContain("bg-black");
    expect(primary).toContain("text-white");
    expect(primary).not.toContain("bg-selected");

    render(<FunkyLoaderButton isLoading>Save</FunkyLoaderButton>);
    const action = screen.getByRole("button");
    expect(action.className).toContain("bg-black");
    expect(action.className).toContain("text-white");
    expect(action.getAttribute("aria-busy")).toBe("true");
  });

  it("composes an accessible sidebar application surface", async () => {
    const { container } = render(
      <AppShell
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
        <OperationalList>
          <OperationalRow
            title="Secrets"
            description="Protected values"
            status="Available"
            href="/secrets"
          />
        </OperationalList>
      </AppShell>,
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
      screen
        .getByRole("link", { name: /Secrets Protected values Available/u })
        .getAttribute("href"),
    ).toBe("/secrets");
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
          tabs={[
            { id: "tenant", label: "Tenant", content: <p>Tenant content</p> },
            { id: "access", label: "Access", content: <p>Access content</p> },
          ]}
        />
      );
    }

    const { container } = render(<SettingsExample />);
    expect(screen.getByText("Tenant content")).toBeTruthy();
    await user.click(screen.getByRole("button", { name: "Access" }));
    expect(screen.getByText("Access content")).toBeTruthy();
    expect(screen.queryByText("Tenant content")).toBeNull();
    const results = await axe(container, {
      rules: { "color-contrast": { enabled: false } },
    });
    expect(results.violations).toHaveLength(0);
  });
});
