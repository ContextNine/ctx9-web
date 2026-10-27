"use client";

import {
  ArrowLeftRight,
  Building2,
  Check,
  KeyRound,
  LifeBuoy,
  Plus,
  RotateCw,
  Server,
  ShieldCheck,
  UserPlus,
  Users,
} from "lucide-react";
import * as React from "react";

import { Button } from "./button.js";
import { Input } from "./input.js";
import { Label } from "./label.js";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select.js";
import { Dialog, DialogContent, DialogTitle } from "./dialog.js";
import { FormSection } from "./form.js";
import { NavigationLink } from "./navigation.js";

export type TenantAccountSettingsTabId =
  | "tenant"
  | "access"
  | "provisioning"
  | "account-security";

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

function SectionHeading({ title }: { title: string }) {
  return <h2 className="text-xl font-medium">{title}</h2>;
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
      <SectionHeading title="Tenant" />
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
              {tenant.id === snapshot.selectedTenantId ? (
                <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Check aria-hidden="true" className="size-4" />
                  Current
                </span>
              ) : (
                <Button
                  type="button"
                  variant="secondary"
                  icon={ArrowLeftRight}
                  disabled={busy === true}
                  onClick={() => void actions.selectTenant(tenant.id)}
                >
                  Switch
                </Button>
              )}
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
            <Button
              className="justify-self-start"
              effect="funkyStable"
              type="submit"
              icon={Plus}
              loading={busy === true}
              loadingLabel="Creating…"
            >
              Create tenant
            </Button>
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
  if (!administration) return <SectionHeading title="Access" />;
  return (
    <div className="grid gap-8">
      <SectionHeading title="Access" />
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
          <Button
            effect="funkyStable"
            type="submit"
            icon={UserPlus}
            loading={busy === true}
            loadingLabel="Inviting…"
          >
            Invite
          </Button>
        </form>
        {acceptUrl ? (
          <p className="break-all text-sm text-muted-foreground">
            Invitation link:{" "}
            <NavigationLink className="text-link underline" href={acceptUrl}>
              {acceptUrl}
            </NavigationLink>
          </p>
        ) : null}
      </FormSection>
      <FormSection title="Members">
        {administration.members.length === 0 && (
          <p className="text-sm text-muted-foreground">No members yet.</p>
        )}
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
      <SectionHeading title="Provisioning" />
      <FormSection
        title="Services"
        {...(administration
          ? { description: `Provisioning ${administration.provisioning.state}` }
          : {})}
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
                icon={RotateCw}
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
      <SectionHeading title="Account security" />
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
          <Button
            asChild
            variant="secondary"
            icon={KeyRound}
            className="justify-self-start"
          >
            <NavigationLink href={snapshot.accountSecurityHref}>
              Manage passkeys
            </NavigationLink>
          </Button>
        ) : null}
      </FormSection>
      <FormSection title="Recovery">
        <p className="text-sm text-muted-foreground">
          Use the recovery flow if you lose access to every passkey.
        </p>
        {snapshot?.recoveryHref ? (
          <Button
            asChild
            variant="secondary"
            icon={LifeBuoy}
            className="justify-self-start"
          >
            <NavigationLink href={snapshot.recoveryHref}>
              Account recovery
            </NavigationLink>
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
  const returnFocus = React.useRef<HTMLElement | null>(null);
  const membership = props.snapshot?.access.memberships.find(
    (item) => item.tenantId === props.snapshot?.selectedTenantId,
  );
  const tabs = [
    { id: "tenant" as const, label: "Tenant", icon: Building2 },
    ...(membership?.role === "tenant_admin"
      ? [
          { id: "access" as const, label: "Access", icon: Users },
          { id: "provisioning" as const, label: "Provisioning", icon: Server },
        ]
      : []),
    {
      id: "account-security" as const,
      label: "Account security",
      icon: ShieldCheck,
    },
  ];
  const tabRail = React.useRef<HTMLElement>(null);
  const selected = tabs.some((tab) => tab.id === props.activeTab)
    ? props.activeTab
    : "tenant";
  return (
    <Dialog open={props.open} onOpenChange={props.onOpenChange}>
      <DialogContent
        variant="tenantSettings"
        aria-describedby={undefined}
        onOpenAutoFocus={(event) => {
          returnFocus.current =
            document.activeElement instanceof HTMLElement
              ? document.activeElement
              : null;
          // Start on the selected tab, not the first one, so only one tab looks active.
          event.preventDefault();
          tabRail.current
            ?.querySelector<HTMLElement>('[aria-current="page"]')
            ?.focus({ preventScroll: true });
        }}
        onCloseAutoFocus={(event) => {
          event.preventDefault();
          returnFocus.current?.focus();
        }}
      >
        <div className="grid h-full min-h-0 grid-cols-1 sm:grid-cols-[minmax(14rem,28%)_minmax(0,1fr)]">
          <aside className="border-b border-border bg-sidebar px-3 py-5 sm:border-r sm:border-b-0 sm:px-5 sm:py-20">
            <DialogTitle variant="tenantSettings">Settings</DialogTitle>
            <nav
              ref={tabRail}
              aria-label="Tenant and account settings"
              className="mt-4 flex flex-wrap gap-1 sm:grid"
            >
              {tabs.map((tab) => (
                <Button
                  key={tab.id}
                  type="button"
                  variant="ghost"
                  state={tab.id === selected ? "selected" : "default"}
                  aria-current={tab.id === selected ? "page" : undefined}
                  align="start"
                  preset="settingsTab"
                  icon={tab.icon}
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
            className="min-h-0 min-w-0 overflow-y-auto px-5 py-8 sm:px-10 sm:py-20 lg:px-14"
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
