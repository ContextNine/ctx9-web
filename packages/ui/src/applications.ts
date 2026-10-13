import type { AppNavigationItem } from "./shell.js";

export type Ctx9ApplicationId = "notenv" | "publisher" | "testimonials";

export interface Ctx9ApplicationOrigins {
  notenv: string;
  publisher: string;
  testimonials: string;
}

const applications = [
  { id: "notenv", label: "Notenv" },
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
