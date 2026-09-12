import * as React from "react";

import { Button } from "./button.js";
import { Dialog, DialogContent, DialogTitle } from "./dialog.js";

export type TenantAccountSettingsTabId =
  "tenant" | "access" | "provisioning" | "account-security";

export interface TenantAccountSettingsTab {
  id: TenantAccountSettingsTabId;
  label: string;
  content: React.ReactNode;
}

export interface TenantAccountSettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  activeTab: TenantAccountSettingsTabId;
  onActiveTabChange: (tab: TenantAccountSettingsTabId) => void;
  tabs: readonly [TenantAccountSettingsTab, ...TenantAccountSettingsTab[]];
}

/**
 * Shared frame for tenant and account administration. Products provide only
 * authorized tab content and keep their own same-origin data boundary.
 */
export function TenantAccountSettingsDialog({
  open,
  onOpenChange,
  activeTab,
  onActiveTabChange,
  tabs,
}: TenantAccountSettingsDialogProps): React.JSX.Element {
  const selected = tabs.find((tab) => tab.id === activeTab) ?? tabs[0];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="ctx9-settings-dialog-content h-[calc(100dvh-1rem)] max-h-[calc(100dvh-1rem)] max-w-[calc(100vw-1rem)] gap-0 overflow-hidden rounded-lg bg-panel p-0 sm:h-[92dvh] sm:max-h-[92dvh] sm:w-[90vw] sm:max-w-[1600px]"
        overlayClassName="ctx9-settings-dialog-overlay"
      >
        <div className="grid h-full min-h-0 sm:grid-cols-[minmax(14rem,28%)_minmax(0,1fr)]">
          <aside className="border-b border-border bg-sidebar px-3 py-5 sm:border-r sm:border-b-0 sm:px-5 sm:py-20">
            <DialogTitle className="px-2 text-xl">Settings</DialogTitle>
            <nav
              aria-label="Tenant and account settings"
              className="mt-4 flex gap-1 overflow-x-auto sm:grid sm:overflow-visible"
            >
              {tabs.map((tab) => (
                <Button
                  key={tab.id}
                  type="button"
                  variant="quiet"
                  selected={tab.id === selected.id}
                  aria-current={tab.id === selected.id ? "page" : undefined}
                  className="shrink-0 justify-start sm:w-full"
                  onClick={() => {
                    onActiveTabChange(tab.id);
                  }}
                >
                  {tab.label}
                </Button>
              ))}
            </nav>
          </aside>
          <section className="min-h-0 overflow-y-auto px-5 py-8 sm:px-10 sm:py-20 lg:px-14">
            {selected.content}
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
}
