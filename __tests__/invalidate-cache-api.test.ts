import type { NextRequest } from "next/server";

jest.mock("next/server", () => ({
  NextRequest: class {},
  NextResponse: {
    json: jest.fn((data, init) => ({ status: init?.status || 200, data })),
  },
}));

jest.mock("next-auth", () => ({
  getServerSession: jest.fn().mockResolvedValue(null),
}));

jest.mock("@/lib/auth", () => ({ __esModule: true, authOptions: {} }));

type Del = (slug: string) => Promise<void>;
const invalidateSite = jest.fn<ReturnType<Del>, Parameters<Del>>();

jest.mock("@/lib/cache", () => ({
  __esModule: true,
  invalidateSite: (...args: unknown[]) => invalidateSite(...(args as [string])),
}));

import { getServerSession } from "next-auth";

import { POST } from "@/app/api/cache/invalidate/route";

beforeEach(() => {
  jest.clearAllMocks();
});

test("returns 401 when unauthenticated", async () => {
  const req = {
    method: "POST",
    json: async () => ({ slug: "s" }),
  } as unknown as NextRequest;
  const res = await POST(req);

  expect(res.status).toBe(401);
});

test("invalidates cache", async () => {
  (getServerSession as jest.Mock).mockResolvedValue({ user: { id: "1" } });
  const req = {
    method: "POST",
    json: async () => ({ slug: "s" }),
  } as unknown as NextRequest;

  const res = await POST(req);

  expect(res.status).toBe(200);
  expect(invalidateSite).toHaveBeenCalledWith("s");
  expect(res.data).toEqual({ ok: true });
});
