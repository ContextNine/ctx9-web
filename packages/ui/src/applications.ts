import type { AppNavigationItem } from "./shell.js";

export type Ctx9ApplicationId = "secrets" | "publisher" | "testimonials";

export interface Ctx9ApplicationOrigins {
  secrets: string;
  publisher: string;
  testimonials: string;
}

const applications = [
  { id: "secrets", label: "Secrets" },
  { id: "publisher", label: "Publisher" },
  { id: "testimonials", label: "Testimonials" },
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
