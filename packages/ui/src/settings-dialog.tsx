import * as React from "react";

import { Button, FunkyLoaderButton } from "./button.js";
import {
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./controls.js";
import { Dialog, DialogContent, DialogTitle } from "./dialog.js";
import { FormSection } from "./form.js";

export type TenantAccountSettingsTabId =
  "tenant" | "access" | "provisioning" | "account-security";

export type TenantRole = "tenant_admin" | "member";
export type TenantMembershipState = "active" | "suspended" | "revoked";

export interface TenantAccountSettingsSnapshot {
  user: { name: string; email: string };
  tenants: { id: string; slug: string; displayName: string }[];
  selectedTenantId: string | null;
  access: {
    clusterAdministrator: boolean;
    memberships: {
      tenantId: string;
      tenantSlug: string;
      tenantName: string;
      role: TenantRole;
      state: TenantMembershipState;
    }[];
  };
  passkeys: {
    id: string;
    name: string | null;
    createdAt: string | null;
    lastUsedAt: string | null;
    backedUp: boolean;
  }[];
  recoveryHref: string;
  accountSecurityHref: string;
}

export interface TenantAdministration {
  tenant: { id: string; slug: string; displayName: string };
  members: {
    userId: string;
    name: string;
    email: string;
    role: TenantRole;
    state: TenantMembershipState;
  }[];
  invitations: {
    id: string;
    email: string;
    role: TenantRole;
    state: string;
    expiresAt: string;
  }[];
  provisioning: {
    state: "pending" | "running" | "ready" | "failed";
    steps: {
      componentId: string;
      state: "pending" | "running" | "ready" | "disabled" | "failed";
      attemptCount: number;
      lastSafeError: string | null;
    }[];
  };
  resendAvailable: boolean;
}

export interface TenantAccountSettingsActions {
  selectTenant: (tenantId: string) => Promise<void>;
  createTenant: (input: {
    slug: string;
    displayName: string;
    idempotencyKey: string;
  }) => Promise<void>;
  createInvitation: (input: {
    tenantId: string;
    email: string;
    role: TenantRole;
    deliveryMode: "manual" | "resend";
  }) => Promise<{ acceptUrl?: string }>;
  updateMember: (input: {
    tenantId: string;
    userId: string;
    role: TenantRole;
    state: TenantMembershipState;
  }) => Promise<void>;
  retryProvisioning: (input: {
    tenantId: string;
    componentId: string;
  }) => Promise<void>;
}

export interface TenantAccountSettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  activeTab: TenantAccountSettingsTabId;
  onActiveTabChange: (tab: TenantAccountSettingsTabId) => void;
  snapshot: TenantAccountSettingsSnapshot | null;
  administration: TenantAdministration | null;
  actions: TenantAccountSettingsActions;
  busy?: boolean;
  error?: string | null;
}

function SectionHeading({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <header className="grid gap-2">
      <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
      <p className="max-w-2xl text-sm text-muted-foreground">{description}</p>
    </header>
  );
}

function TenantTab({
  snapshot,
  actions,
  busy,
}: Pick<TenantAccountSettingsDialogProps, "snapshot" | "actions" | "busy">) {
  const [displayName, setDisplayName] = React.useState("");
  const [slug, setSlug] = React.useState("");
  return (
    <div className="grid gap-8">
      <SectionHeading
        title="Tenant"
        description="Choose your active tenant or create a new one."
      />
      <FormSection title="Active tenant">
        <div className="grid gap-2">
          {snapshot?.tenants.map((tenant) => (
            <div
              key={tenant.id}
              className="flex items-center justify-between gap-4 border-b border-border py-3 last:border-b-0"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">
                  {tenant.displayName}
                </p>
                <p className="truncate text-sm text-muted-foreground">
                  {tenant.slug}
                </p>
              </div>
              <Button
                type="button"
                variant="secondary"
                disabled={
                  busy === true || tenant.id === snapshot.selectedTenantId
                }
                onClick={() => void actions.selectTenant(tenant.id)}
              >
                {tenant.id === snapshot.selectedTenantId ? "Current" : "Switch"}
              </Button>
            </div>
          ))}
        </div>
      </FormSection>
      {snapshot?.access.clusterAdministrator ? (
        <FormSection
          title="Create tenant"
          description="The new tenant becomes active after creation."
        >
          <form
            className="grid max-w-xl gap-4"
            onSubmit={(event) => {
              event.preventDefault();
              void actions.createTenant({
                displayName,
                slug,
                idempotencyKey: crypto.randomUUID(),
              });
            }}
          >
            <div className="grid gap-1.5">
              <Label htmlFor="ctx9-tenant-name">Name</Label>
              <Input
                id="ctx9-tenant-name"
                required
                minLength={2}
                maxLength={120}
                value={displayName}
                onChange={(event) => {
                  setDisplayName(event.target.value);
                }}
              />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="ctx9-tenant-slug">Slug</Label>
              <Input
                id="ctx9-tenant-slug"
                required
                minLength={2}
                maxLength={63}
                pattern="[a-z0-9]+(?:-[a-z0-9]+)*"
                value={slug}
                onChange={(event) => {
                  setSlug(event.target.value);
                }}
              />
            </div>
            <FunkyLoaderButton
              className="justify-self-start"
              type="submit"
              isLoading={busy === true}
              loadingLabel="Creating…"
            >
              Create tenant
            </FunkyLoaderButton>
          </form>
        </FormSection>
      ) : null}
    </div>
  );
}

function AccessTab({
  administration,
  actions,
  busy,
}: Pick<
  TenantAccountSettingsDialogProps,
  "administration" | "actions" | "busy"
>) {
  const [email, setEmail] = React.useState("");
  const [role, setRole] = React.useState<TenantRole>("member");
  const [acceptUrl, setAcceptUrl] = React.useState<string | null>(null);
  if (!administration)
    return (
      <SectionHeading
        title="Access"
        description="Tenant administrators can manage members and invitations."
      />
    );
  return (
    <div className="grid gap-8">
      <SectionHeading
        title="Access"
        description={`Manage access to ${administration.tenant.displayName}.`}
      />
      <FormSection title="Invite member">
        <form
          className="grid max-w-xl gap-4 sm:grid-cols-[1fr_11rem_auto] sm:items-end"
          onSubmit={(event) => {
            event.preventDefault();
            void actions
              .createInvitation({
                tenantId: administration.tenant.id,
                email,
                role,
                deliveryMode: administration.resendAvailable
                  ? "resend"
                  : "manual",
              })
              .then((result) => {
                setAcceptUrl(result.acceptUrl ?? null);
              });
          }}
        >
          <div className="grid gap-1.5">
            <Label htmlFor="ctx9-invite-email">Email</Label>
            <Input
              id="ctx9-invite-email"
              type="email"
              required
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="ctx9-invite-role">Role</Label>
            <Select
              value={role}
              onValueChange={(value) => {
                setRole(value as TenantRole);
              }}
            >
              <SelectTrigger id="ctx9-invite-role">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="member">Member</SelectItem>
                <SelectItem value="tenant_admin">Tenant admin</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <FunkyLoaderButton
            type="submit"
            isLoading={busy === true}
            loadingLabel="Inviting…"
          >
            Invite
          </FunkyLoaderButton>
        </form>
        {acceptUrl ? (
          <p className="break-all text-sm text-muted-foreground">
            Invitation link:{" "}
            <a className="text-link underline" href={acceptUrl}>
              {acceptUrl}
            </a>
          </p>
        ) : null}
      </FormSection>
      <FormSection title="Members">
        <div className="grid gap-1">
          {administration.members.map((member) => (
            <div
              key={member.userId}
              className="grid gap-3 border-b border-border py-3 last:border-b-0 sm:grid-cols-[minmax(0,1fr)_11rem_11rem] sm:items-center"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">{member.name}</p>
                <p className="truncate text-sm text-muted-foreground">
                  {member.email}
                </p>
              </div>
              <Select
                value={member.role}
                disabled={busy === true}
                onValueChange={(value) =>
                  void actions.updateMember({
                    tenantId: administration.tenant.id,
                    userId: member.userId,
                    role: value as TenantRole,
                    state: member.state,
                  })
                }
              >
                <SelectTrigger aria-label={`${member.name} role`}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="member">Member</SelectItem>
                  <SelectItem value="tenant_admin">Tenant admin</SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={member.state}
                disabled={busy === true}
                onValueChange={(value) =>
                  void actions.updateMember({
                    tenantId: administration.tenant.id,
                    userId: member.userId,
                    role: member.role,
                    state: value as TenantMembershipState,
                  })
                }
              >
                <SelectTrigger aria-label={`${member.name} state`}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                  <SelectItem value="revoked">Revoked</SelectItem>
                </SelectContent>
              </Select>
            </div>
          ))}
        </div>
      </FormSection>
    </div>
  );
}

function ProvisioningTab({
  administration,
  actions,
  busy,
}: Pick<
  TenantAccountSettingsDialogProps,
  "administration" | "actions" | "busy"
>) {
  return (
    <div className="grid gap-8">
      <SectionHeading
        title="Provisioning"
        description="Review tenant services and retry failed steps."
      />
      <FormSection
        title={
          administration
            ? `State: ${administration.provisioning.state}`
            : "Tenant services"
        }
      >
        {administration?.provisioning.steps.map((step) => (
          <div
            key={step.componentId}
            className="flex items-center justify-between gap-4 border-b border-border py-3 last:border-b-0"
          >
            <div>
              <p className="text-sm font-medium">{step.componentId}</p>
              <p className="text-sm text-muted-foreground">
                {step.lastSafeError ?? step.state}
              </p>
            </div>
            {step.state === "failed" ? (
              <Button
                type="button"
                variant="secondary"
                disabled={busy}
                onClick={() =>
                  void actions.retryProvisioning({
                    tenantId: administration.tenant.id,
                    componentId: step.componentId,
                  })
                }
              >
                Retry
              </Button>
            ) : null}
          </div>
        ))}
      </FormSection>
    </div>
  );
}

function AccountSecurityTab({
  snapshot,
}: Pick<TenantAccountSettingsDialogProps, "snapshot">) {
  return (
    <div className="grid gap-8">
      <SectionHeading
        title="Account security"
        description="Manage passkeys and account recovery for your CTX9 account."
      />
      <FormSection title="Passkeys">
        {snapshot?.passkeys.map((passkey) => (
          <div
            key={passkey.id}
            className="border-b border-border py-3 last:border-b-0"
          >
            <p className="text-sm font-medium">{passkey.name ?? "Passkey"}</p>
            <p className="text-sm text-muted-foreground">
              {passkey.backedUp ? "Synced passkey" : "Device passkey"}
            </p>
          </div>
        ))}
        {snapshot?.accountSecurityHref ? (
          <Button asChild variant="secondary">
            <a href={snapshot.accountSecurityHref}>Manage passkeys</a>
          </Button>
        ) : null}
      </FormSection>
      <FormSection title="Recovery">
        <p className="text-sm text-muted-foreground">
          Use the recovery flow if you lose access to every passkey.
        </p>
        {snapshot?.recoveryHref ? (
          <Button asChild variant="secondary" className="justify-self-start">
            <a href={snapshot.recoveryHref}>Account recovery</a>
          </Button>
        ) : null}
      </FormSection>
    </div>
  );
}

/** Shared tenant administration surface. Products only provide a same-origin data adapter. */
export function TenantAccountSettingsDialog(
  props: TenantAccountSettingsDialogProps,
): React.JSX.Element {
  const membership = props.snapshot?.access.memberships.find(
    (item) => item.tenantId === props.snapshot?.selectedTenantId,
  );
  const tabs = [
    { id: "tenant" as const, label: "Tenant" },
    ...(membership?.role === "tenant_admin"
      ? [
          { id: "access" as const, label: "Access" },
          { id: "provisioning" as const, label: "Provisioning" },
        ]
      : []),
    { id: "account-security" as const, label: "Account security" },
  ];
  const selected = tabs.some((tab) => tab.id === props.activeTab)
    ? props.activeTab
    : "tenant";
  return (
    <Dialog open={props.open} onOpenChange={props.onOpenChange}>
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
                  selected={tab.id === selected}
                  aria-current={tab.id === selected ? "page" : undefined}
                  className="shrink-0 justify-start sm:w-full"
                  onClick={() => {
                    props.onActiveTabChange(tab.id);
                  }}
                >
                  {tab.label}
                </Button>
              ))}
            </nav>
          </aside>
          <section
            aria-busy={props.busy === true ? true : undefined}
            className="min-h-0 overflow-y-auto px-5 py-8 sm:px-10 sm:py-20 lg:px-14"
          >
            {props.error ? (
              <p role="alert" className="mb-6 text-sm text-danger">
                {props.error}
              </p>
            ) : null}
            {selected === "tenant" ? (
              <TenantTab {...props} />
            ) : selected === "access" ? (
              <AccessTab {...props} />
            ) : selected === "provisioning" ? (
              <ProvisioningTab {...props} />
            ) : (
              <AccountSecurityTab {...props} />
            )}
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
}
