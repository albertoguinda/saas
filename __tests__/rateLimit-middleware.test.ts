import type { NextApiRequest, NextApiResponse } from "next";
import type { NextRequest } from "next/server";

const incr = jest.fn();
const expire = jest.fn();

jest.mock("@upstash/redis", () => ({
  Redis: jest.fn().mockImplementation(() => ({ incr, expire })),
}));

jest.mock("next/server", () => {
  return {
    NextRequest: class {},
    NextResponse: {
      json: jest.fn((data, init) => ({ status: init?.status || 200, data })),
    },
  };
});

import { withRateLimit, withRateLimitRoute } from "@/lib/middlewares/rateLimit";

describe("rateLimit middleware", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("withRateLimit returns 429 when limit exceeded", async () => {
    incr.mockResolvedValue(11);
    const handler = jest.fn();
    const json = jest.fn();
    const status = jest.fn(() => ({ json }));
    const middleware = withRateLimit(handler, { limit: 10 });
    const req = { headers: {}, socket: { remoteAddress: "1" } } as unknown as NextApiRequest;
    const res = { status } as unknown as NextApiResponse;
    await middleware(req, res);
    expect(status).toHaveBeenCalledWith(429);
    expect(json).toHaveBeenCalledWith({ error: "Demasiadas peticiones" });
    expect(handler).not.toHaveBeenCalled();
  });

  test("withRateLimitRoute returns 429 when limit exceeded", async () => {
    incr.mockResolvedValue(11);
    const handler = jest.fn();
    const middleware = withRateLimitRoute(handler, { limit: 10 });
    const req = { headers: { get: () => "1" } } as unknown as NextRequest;
    const res = await middleware(req);
    expect(res.status).toBe(429);
    expect(handler).not.toHaveBeenCalled();
  });
});
