import type { AppNavigationItem } from "./shell.js";

export type Ctx9ApplicationId = "agents" | "secrets" | "publisher";

export interface Ctx9ApplicationOrigins {
  agents: string;
  secrets: string;
  publisher: string;
}

const applications = [
  { id: "agents", label: "Agents" },
  { id: "secrets", label: "Secrets" },
  { id: "publisher", label: "Publisher" },
] as const satisfies readonly {
  id: Ctx9ApplicationId;
  label: string;
}[];

/** Builds the one canonical All apps menu used by every CTX9 product. */
export function createCtx9Applications({
  current,
  origins,
}: {
  current: Ctx9ApplicationId;
  origins: Ctx9ApplicationOrigins;
}): readonly AppNavigationItem[] {
  return applications.map((application) => ({
    ...application,
    href: origins[application.id],
    current: application.id === current,
  }));
}
