import type { NextRequest } from "next/server";

jest.mock("next/server", () => ({
  NextRequest: class {},
  NextResponse: {
    json: jest.fn((data, init) => ({ status: init?.status || 200, data })),
    redirect: jest.fn((url: string | URL) => ({
      status: 307,
      headers: { location: url.toString() },
    })),
  },
}));

jest.mock("next-auth/next", () => ({
  getServerSession: jest.fn().mockResolvedValue(null),
}));

jest.mock("@/lib/auth", () => ({ __esModule: true, authOptions: {} }));
jest.mock("@/lib/dbConnect", () => ({ __esModule: true, default: jest.fn() }));
const paymentFind = jest.fn();

jest.mock("@/lib/models/payment", () => ({
  __esModule: true,
  default: {
    find: (..._args: unknown[]) => ({ sort: () => ({ lean: paymentFind }) }),
  },
}));
jest.mock("@/lib/logger", () => ({ logger: { error: jest.fn() } }));

import { getServerSession } from "next-auth/next";

import { GET } from "@/app/api/stripe/history/route";

beforeEach(() => {
  jest.clearAllMocks();
});

test("redirects when unauthenticated", async () => {
  const res = await GET({ url: "http://test" } as NextRequest);

  expect(res.status).toBe(307);
});

test("returns 403 for free plan", async () => {
  (getServerSession as jest.Mock).mockResolvedValue({ user: { plan: "free" } });
  const res = await GET({ url: "http://test" } as NextRequest);

  expect(res.status).toBe(403);
});

test("returns payments for PRO", async () => {
  (getServerSession as jest.Mock).mockResolvedValue({
    user: { id: "u1", plan: "pro" },
  });
  paymentFind.mockResolvedValue([
    {
      stripeId: "1",
      amount: 1000,
      currency: "eur",
      status: "succeeded",
      createdAt: new Date(1000),
    },
  ]);
  const res = await GET({ url: "http://test" } as NextRequest);

  expect(res.status).toBe(200);
  expect(res.data).toEqual({
    payments: [
      {
        id: "1",
        amount: 1000,
        currency: "eur",
        status: "succeeded",
        created: 1,
      },
    ],
  });
});

test("handles stripe error", async () => {
  (getServerSession as jest.Mock).mockResolvedValue({
    user: { id: "u1", plan: "pro" },
  });
  paymentFind.mockRejectedValue(new Error("fail"));
  const res = await GET({ url: "http://test" } as NextRequest);

  expect(res.status).toBe(500);
});
