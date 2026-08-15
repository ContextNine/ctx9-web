import {
  assertSameOriginMutation,
  parseAuthorizationCallback,
  type AuthorizationCallback,
} from "../index.js";

/** Structural contracts keep Express optional while matching its request/response API. */
export interface ExpressRequestLike {
  originalUrl: string;
  get(name: string): string | undefined;
}

export interface ExpressResponseLike {
  append(name: string, value: string): unknown;
  end(): unknown;
  location(value: string): unknown;
  status(code: number): unknown;
}

function expressHeaders(request: ExpressRequestLike): Headers {
  const headers = new Headers();
  for (const name of ["origin", "sec-fetch-site"] as const) {
    const value = request.get(name);
    if (value) headers.set(name, value);
  }
  return headers;
}

export function parseExpressAuthorizationCallback(
  request: ExpressRequestLike,
  applicationOrigin: string,
): AuthorizationCallback {
  return parseAuthorizationCallback(
    new URL(request.originalUrl, applicationOrigin),
  );
}

export function assertExpressSameOriginMutation(
  request: ExpressRequestLike,
  expectedOrigin: string,
): void {
  assertSameOriginMutation(expressHeaders(request), expectedOrigin);
}

export function writeExpressRedirect(
  response: ExpressResponseLike,
  options: {
    location: string;
    cookies?: readonly string[];
    status?: 302 | 303;
  },
): void {
  response.status(options.status ?? 303);
  response.location(options.location);
  for (const cookie of options.cookies ?? [])
    response.append("set-cookie", cookie);
  response.end();
}
