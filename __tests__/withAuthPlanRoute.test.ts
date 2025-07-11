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

import { getServerSession } from "next-auth/next";

import { withAuthPlanRoute } from "@/lib/middlewares/withAuthPlan";

beforeEach(() => {
  jest.clearAllMocks();
});

test("redirects when unauthenticated", async () => {
  const handler = jest.fn();
  const wrapped = withAuthPlanRoute(handler, "PRO");
  const res = await wrapped({ url: "http://test" } as NextRequest);

  expect(res.status).toBe(307);
  expect(handler).not.toHaveBeenCalled();
});

test("returns 403 when plan insufficient", async () => {
  (getServerSession as jest.Mock).mockResolvedValue({ user: { plan: "free" } });
  const handler = jest.fn();
  const wrapped = withAuthPlanRoute(handler, "PRO");
  const res = await wrapped({ url: "http://test" } as NextRequest);

  expect(res.status).toBe(403);
  expect(handler).not.toHaveBeenCalled();
});

test("calls handler when plan sufficient", async () => {
  (getServerSession as jest.Mock).mockResolvedValue({ user: { plan: "pro" } });
  const handler = jest.fn(() => ({ status: 200 }));
  const wrapped = withAuthPlanRoute(handler, "FREE");
  const res = await wrapped({ url: "http://test" } as NextRequest);

  expect(handler).toHaveBeenCalled();
  expect(res.status).toBe(200);
});

test("allows trial users for PRO", async () => {
  (getServerSession as jest.Mock).mockResolvedValue({
    user: { plan: "free", trialEndsAt: new Date(Date.now() + 1000) },
  });
  const handler = jest.fn(() => ({ status: 200 }));
  const wrapped = withAuthPlanRoute(handler, "PRO");
  const res = await wrapped({ url: "http://test" } as NextRequest);

  expect(handler).toHaveBeenCalled();
  expect(res.status).toBe(200);
});
