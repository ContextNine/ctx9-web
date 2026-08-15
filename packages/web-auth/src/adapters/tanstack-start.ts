import {
  assertSameOriginMutation,
  parseAuthorizationCallback,
  type AuthorizationCallback,
} from "../index.js";

/** TanStack Start server functions expose standard Request and Response objects. */
export function parseTanStackAuthorizationCallback(
  request: Request,
): AuthorizationCallback {
  return parseAuthorizationCallback(new URL(request.url));
}

export function assertTanStackSameOriginMutation(
  request: Request,
  expectedOrigin: string,
): void {
  assertSameOriginMutation(request.headers, expectedOrigin);
}

export function tanStackRedirectResponse(options: {
  location: string;
  cookies?: readonly string[];
  status?: 302 | 303;
}): Response {
  const headers = new Headers({ location: options.location });
  for (const cookie of options.cookies ?? [])
    headers.append("set-cookie", cookie);
  return new Response(null, { status: options.status ?? 303, headers });
}
