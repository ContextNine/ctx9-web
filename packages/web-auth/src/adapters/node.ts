import type { IncomingMessage, ServerResponse } from "node:http";

import {
  assertSameOriginMutation,
  parseAuthorizationCallback,
  type AuthorizationCallback,
} from "../index.js";

type NodeRequest = Pick<IncomingMessage, "headers" | "url">;
type NodeResponse = Pick<ServerResponse, "end" | "setHeader" | "statusCode">;

function nodeHeaders(request: NodeRequest): Headers {
  const headers = new Headers();
  for (const [name, value] of Object.entries(request.headers)) {
    if (Array.isArray(value)) {
      for (const item of value) headers.append(name, item);
    } else if (value !== undefined) {
      headers.set(name, value);
    }
  }
  return headers;
}

export function parseNodeAuthorizationCallback(
  request: NodeRequest,
  applicationOrigin: string,
): AuthorizationCallback {
  if (!request.url) throw new Error("request-url-missing");
  return parseAuthorizationCallback(new URL(request.url, applicationOrigin));
}

export function assertNodeSameOriginMutation(
  request: NodeRequest,
  expectedOrigin: string,
): void {
  assertSameOriginMutation(nodeHeaders(request), expectedOrigin);
}

export function writeNodeRedirect(
  response: NodeResponse,
  options: {
    location: string;
    cookies?: readonly string[];
    status?: 302 | 303;
  },
): void {
  response.statusCode = options.status ?? 303;
  response.setHeader("location", options.location);
  if (options.cookies?.length)
    response.setHeader("set-cookie", options.cookies);
  response.end();
}
