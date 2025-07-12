import type { NextRequest } from "next/server";

jest.mock("next/server", () => {
  return {
    NextRequest: class {},
    NextResponse: {
      json: jest.fn((data, init) => ({ status: init?.status || 200, data })),
    },
  };
});

jest.mock("next-auth/next", () => ({
  getServerSession: jest.fn().mockResolvedValue({
    user: { id: "u1", email: "user@test.com" },
  }),
}));
jest.mock("@/lib/auth", () => ({ __esModule: true, authOptions: {} }));

const createMock = jest.fn();

jest.mock("@/lib/stripe", () => ({
  __esModule: true,
  stripe: { checkout: { sessions: { create: createMock } } },
}));

import { POST } from "@/app/api/stripe/checkout/route";

beforeEach(() => {
  jest.clearAllMocks();
});

test("creates checkout session", async () => {
  createMock.mockResolvedValue({ id: "sess_1" });
  const req = {
    method: "POST",
    json: async () => ({
      priceId: "price_1",
      successUrl: "https://ok",
      cancelUrl: "https://ko",
    }),
  } as unknown as NextRequest;

  const res = await POST(req);

  expect(createMock).toHaveBeenCalledWith({
    mode: "subscription",
    line_items: [{ price: "price_1", quantity: 1 }],
    success_url: "https://ok",
    cancel_url: "https://ko",
    customer_email: "user@test.com",
    metadata: { userId: "u1" },
  });
  expect(res.status).toBe(200);
  expect(res.data).toEqual({ id: "sess_1" });
});

test("returns 400 when data missing", async () => {
  const req = {
    method: "POST",
    json: async () => ({}),
  } as unknown as NextRequest;
  const res = await POST(req);

  expect(res.status).toBe(400);
});

test("returns 500 on stripe error", async () => {
  createMock.mockRejectedValue(new Error("fail"));
  const req = {
    method: "POST",
    json: async () => ({
      priceId: "p",
      successUrl: "s",
      cancelUrl: "c",
    }),
  } as unknown as NextRequest;
  const res = await POST(req);

  expect(res.status).toBe(500);
  expect(createMock).toHaveBeenCalledWith({
    mode: "subscription",
    line_items: [{ price: "p", quantity: 1 }],
    success_url: "s",
    cancel_url: "c",
    customer_email: "user@test.com",
    metadata: { userId: "u1" },
  });
});
