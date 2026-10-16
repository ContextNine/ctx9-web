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

/** Builds the app menu from the applications enabled in this installation. */
export function createCtx9Applications<Current extends Ctx9ApplicationId>({
  current,
  origins,
}: {
  current: Current;
  origins: Partial<Ctx9ApplicationOrigins> & Record<Current, string>;
}): readonly AppNavigationItem[] {
  if (!origins[current])
    throw new Error("Current application origin is required.");
  return applications.flatMap((application) => {
    const href = origins[application.id];
    return href
      ? [{ ...application, href, current: application.id === current }]
      : [];
  });
}
