// @vitest-environment jsdom

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { describe, expect, it } from "vitest";

import { Button } from "./button.js";
import { Checkbox, Input, Label } from "./controls.js";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "./dialog.js";
import { ApplicationShell, OperationalList, OperationalRow } from "./shell.js";

describe("shared product primitives", () => {
  it("composes an accessible Workbench application surface", async () => {
    const { container } = render(
      <ApplicationShell
        product="Platform"
        tenantControl={<Button type="button">CTX9</Button>}
        navigation={[
          { id: "platform", label: "Platform", href: "/", current: true },
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
          />
        </OperationalList>
      </ApplicationShell>,
    );
    expect(
      screen.getByRole("navigation", { name: "Platform navigation" }),
    ).toBeTruthy();
    expect(
      screen
        .getByRole("link", { name: "Skip to content" })
        .getAttribute("href"),
    ).toBe("#main-content");
    expect(screen.getByRole("main").getAttribute("tabindex")).toBe("-1");
    expect(screen.getByLabelText("Search services")).toBeTruthy();
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
});
