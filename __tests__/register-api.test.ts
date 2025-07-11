/* eslint-disable import/order */
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

jest.mock("@/lib/models/event", () => ({
  __esModule: true,
  default: { create: jest.fn() },
}));

import Event from "@/lib/models/event";

const saveMock = jest.fn();
const findOneMock = jest.fn();
const userConstructor = jest.fn(() => ({ save: saveMock, id: "1" }));

userConstructor.findOne = findOneMock;

jest.mock("@/lib/dbConnect", () => ({ __esModule: true, default: jest.fn() }));
jest.mock("@/lib/models/user", () => ({
  __esModule: true,
  default: userConstructor,
}));

import { POST } from "@/app/api/auth/register/route";

beforeEach(() => {
  jest.clearAllMocks();
});

test("returns 400 when missing data", async () => {
  const req = {
    method: "POST",
    json: async () => ({ email: "a@test.com" }),
  } as unknown as NextRequest;
  const res = await POST(req);

  expect(res.status).toBe(400);
});

test("returns 409 when user exists", async () => {
  findOneMock.mockResolvedValue({});
  const req = {
    method: "POST",
    json: async () => ({
      email: "a@test.com",
      password: "123456",
      name: "test",
    }),
  } as unknown as NextRequest;
  const res = await POST(req);

  expect(findOneMock).toHaveBeenCalledWith({ email: "a@test.com" });
  expect(res.status).toBe(409);
});

test("creates user when data valid", async () => {
  findOneMock.mockResolvedValue(null);
  const req = {
    method: "POST",
    json: async () => ({
      email: "a@test.com",
      password: "123456",
      name: "test",
    }),
  } as unknown as NextRequest;
  const res = await POST(req);

  expect(saveMock).toHaveBeenCalled();
  expect(Event.create).toHaveBeenCalledWith({
    userId: "1",
    event: "signup_free",
  });
  expect(res.status).toBe(200);
});

test("returns 429 when rate limit exceeded", async () => {
  (checkLimit as jest.Mock).mockResolvedValue(false);
  findOneMock.mockResolvedValue(null);
  const req = {
    method: "POST",
    json: async () => ({
      email: "b@test.com",
      password: "123456",
      name: "test",
    }),
  } as unknown as NextRequest;
  const res = await POST(req);

  expect(res.status).toBe(429);
});
