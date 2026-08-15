import { describe, expect, it, vi } from "vitest";

import {
  assertExpressSameOriginMutation,
  parseExpressAuthorizationCallback,
  writeExpressRedirect,
  type ExpressResponseLike,
} from "./express.js";
import {
  assertNodeSameOriginMutation,
  parseNodeAuthorizationCallback,
  writeNodeRedirect,
} from "./node.js";
import {
  assertTanStackSameOriginMutation,
  parseTanStackAuthorizationCallback,
  tanStackRedirectResponse,
} from "./tanstack-start.js";

const origin = "https://sentinel.ctx9.com";
const callbackPath = "/auth/callback?code=synthetic-code&state=synthetic-state";

describe("server framework adapters", () => {
  it("parses the same callback and origin boundary for TanStack, Node, and Express", () => {
    const headers = {
      origin,
      "sec-fetch-site": "same-origin",
    };
    const tanStackRequest = new Request(`${origin}${callbackPath}`, {
      headers,
    });
    const nodeRequest = { url: callbackPath, headers };
    const expressRequest = {
      originalUrl: callbackPath,
      get(name: string) {
        return headers[name as keyof typeof headers];
      },
    };

    expect(parseTanStackAuthorizationCallback(tanStackRequest)).toEqual({
      kind: "success",
      code: "synthetic-code",
      state: "synthetic-state",
    });
    expect(parseNodeAuthorizationCallback(nodeRequest, origin)).toEqual(
      parseExpressAuthorizationCallback(expressRequest, origin),
    );
    expect(() => {
      assertTanStackSameOriginMutation(tanStackRequest, origin);
    }).not.toThrow();
    expect(() => {
      assertNodeSameOriginMutation(nodeRequest, origin);
    }).not.toThrow();
    expect(() => {
      assertExpressSameOriginMutation(expressRequest, origin);
    }).not.toThrow();
  });

  it("writes equivalent host responses without handling application sessions", async () => {
    const cookie = "__Host-ctx9-sentinel=opaque; Path=/; Secure; HttpOnly";
    const tanStackResponse = tanStackRedirectResponse({
      location: "/",
      cookies: [cookie],
    });
    expect(tanStackResponse.status).toBe(303);
    expect(tanStackResponse.headers.get("location")).toBe("/");
    expect(tanStackResponse.headers.get("set-cookie")).toBe(cookie);

    const nodeResponse = {
      statusCode: 200,
      setHeader: vi.fn(),
      end: vi.fn(),
    };
    writeNodeRedirect(nodeResponse, { location: "/", cookies: [cookie] });
    expect(nodeResponse.statusCode).toBe(303);
    expect(nodeResponse.setHeader).toHaveBeenCalledWith("set-cookie", [cookie]);

    const status = vi.fn();
    const location = vi.fn();
    const append = vi.fn();
    const end = vi.fn();
    const expressResponse: ExpressResponseLike = {
      status,
      location,
      append,
      end,
    };
    writeExpressRedirect(expressResponse, { location: "/", cookies: [cookie] });
    expect(status).toHaveBeenCalledWith(303);
    expect(append).toHaveBeenCalledWith("set-cookie", cookie);

    await expect(tanStackResponse.text()).resolves.toBe("");
  });
});
