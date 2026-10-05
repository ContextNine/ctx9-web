// @vitest-environment jsdom

import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import { afterEach, expect, it, vi } from "vitest";

import { MultipleSelector } from "./multiple-selector.js";

afterEach(cleanup);

it("selects by keyboard, removes a selection, and keeps fixed options when clearing", async () => {
  vi.stubGlobal(
    "ResizeObserver",
    class {
      observe() {
        return undefined;
      }
      unobserve() {
        return undefined;
      }
      disconnect() {
        return undefined;
      }
    },
  );
  const previousScroll = Object.getOwnPropertyDescriptor(
    Element.prototype,
    "scrollIntoView",
  );
  Object.defineProperty(Element.prototype, "scrollIntoView", {
    configurable: true,
    value: vi.fn(),
  });
  try {
    const fixed = { value: "fixed", label: "Required", fixed: true };
    const alpha = { value: "alpha", label: "Alpha" };
    const beta = { value: "beta", label: "Beta" };
    const onChange = vi.fn();
    render(
      <MultipleSelector
        defaultOptions={[fixed, alpha, beta]}
        value={[fixed]}
        selectionTone="muted"
        size="singleRow"
        commandProps={{ label: "Choose options" }}
        onChange={onChange}
      />,
    );
    const user = userEvent.setup();
    const input = screen.getByRole("combobox", { name: "Choose options" });
    await user.click(input);
    await user.type(input, "Alpha");
    await waitFor(() => {
      expect(
        screen
          .getByRole("option", { name: "Alpha" })
          .getAttribute("aria-selected"),
      ).toBe("true");
    });
    await user.keyboard("{Enter}");
    expect(onChange).toHaveBeenLastCalledWith([fixed, alpha]);
    await user.click(screen.getByRole("button", { name: "Remove Alpha" }));
    expect(onChange).toHaveBeenLastCalledWith([fixed]);
    await user.click(input);
    await user.type(input, "Beta");
    await user.click(screen.getByRole("option", { name: "Beta" }));
    expect(onChange).toHaveBeenLastCalledWith([fixed, beta]);
    await user.click(
      screen.getByRole("button", { name: "Clear selected options" }),
    );
    expect(onChange).toHaveBeenLastCalledWith([fixed]);
  } finally {
    vi.unstubAllGlobals();
    if (previousScroll) {
      Object.defineProperty(
        Element.prototype,
        "scrollIntoView",
        previousScroll,
      );
    } else {
      Reflect.deleteProperty(Element.prototype, "scrollIntoView");
    }
  }
});
