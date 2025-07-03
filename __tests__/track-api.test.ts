import type { NextRequest } from "next/server";

jest.mock("next/server", () => {
  return {
    NextRequest: class {},
    NextResponse: {
      json: jest.fn((data, init) => ({ status: init?.status || 200, data })),
    },
  };
});

jest.mock("@/lib/middlewares/rateLimit", () => ({
  __esModule: true,
  checkLimit: jest.fn().mockResolvedValue(true),
  withRateLimitRoute: (handler: any) => async (req: any) => {
    const { checkLimit } = require("@/lib/middlewares/rateLimit");
    const allowed = await checkLimit("id", 10, 60);
    if (!allowed) {
      return { status: 429, data: { error: "Demasiadas peticiones" } };
    }
    return handler(req);
  },
  withRateLimit: (handler: any) => async (req: any, res: any) => {
    const { checkLimit } = require("@/lib/middlewares/rateLimit");
    const allowed = await checkLimit("id", 10, 60);
    if (!allowed) {
      return res.status(429).json({ error: "Demasiadas peticiones" });
    }
    return handler(req, res);
  },
}));

import { checkLimit } from "@/lib/middlewares/rateLimit";

jest.mock("next-auth", () => ({
  getServerSession: jest.fn().mockResolvedValue(null),
}));

jest.mock("@/lib/auth", () => ({ __esModule: true, authOptions: {} }));
jest.mock("@/lib/dbConnect", () => ({ __esModule: true, default: jest.fn() }));
jest.mock("@/lib/models/event", () => ({
  __esModule: true,
  default: { create: jest.fn() },
}));

import { POST } from "@/app/api/track/route";
import Event from "@/lib/models/event";
import { getServerSession } from "next-auth";

beforeEach(() => {
  jest.clearAllMocks();
});

test("returns 401 when unauthenticated", async () => {
  const req = {
    method: "POST",
    json: async () => ({ event: "test" }),
  } as unknown as NextRequest;
  const res = await POST(req);
  expect(res.status).toBe(401);
});

test("saves event with extra data", async () => {
  (getServerSession as jest.Mock).mockResolvedValue({ user: { id: "1" } });
  const req = {
    method: "POST",
    json: async () => ({
      event: "click",
      page: "/d",
      x: 1,
      y: 2,
      timestamp: 10,
    }),
  } as unknown as NextRequest;
  const res = await POST(req);
  expect(Event.create).toHaveBeenCalledWith({
    userId: "1",
    event: "click",
    page: "/d",
    x: 1,
    y: 2,
    timestamp: 10,
    duration: undefined,
  });
  expect(res.status).toBe(200);
});

test("returns 400 when missing event", async () => {
  (getServerSession as jest.Mock).mockResolvedValue({ user: { id: "1" } });
  const req = {
    method: "POST",
    json: async () => ({ page: "/d" }),
  } as unknown as NextRequest;
  const res = await POST(req);
  expect(res.status).toBe(400);
  expect(Event.create).not.toHaveBeenCalled();
});

test("returns 400 when validation fails", async () => {
  (getServerSession as jest.Mock).mockResolvedValue({ user: { id: "1" } });
  const req = {
    method: "POST",
    json: async () => ({ event: 1 }),
  } as unknown as NextRequest;
  const res = await POST(req);
  expect(res.status).toBe(400);
  expect(Event.create).not.toHaveBeenCalled();
});

test("returns 400 on malformed JSON", async () => {
  (getServerSession as jest.Mock).mockResolvedValue({ user: { id: "1" } });
  const req = {
    method: "POST",
    json: async () => {
      throw new Error("bad");
    },
  } as unknown as NextRequest;
  const res = await POST(req);
  expect(res.status).toBe(400);
  expect(Event.create).not.toHaveBeenCalled();
});

test("returns 429 when rate limit exceeded", async () => {
  (checkLimit as jest.Mock).mockResolvedValue(false);
  (getServerSession as jest.Mock).mockResolvedValue({ user: { id: "1" } });
  const req = {
    method: "POST",
    json: async () => ({ event: "x" }),
  } as unknown as NextRequest;
  const res = await POST(req);
  expect(res.status).toBe(429);
});
