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
jest.mock("next-auth/next", () => ({
  getServerSession: jest.fn().mockResolvedValue(null),
}));

jest.mock("@/lib/auth", () => ({ __esModule: true, authOptions: {} }));

import { getServerSession } from "next-auth";

import { POST } from "@/app/api/export/route";

beforeEach(() => {
  jest.clearAllMocks();
});

test("returns 401 when unauthenticated", async () => {
  const req = {
    method: "POST",
    json: async () => ({}),
  } as unknown as NextRequest;
  const res = await POST(req);

  expect(res.status).toBe(401);
});

test("returns ok with siteId", async () => {
  (getServerSession as jest.Mock).mockResolvedValue({ user: { id: "1" } });
  const req = {
    method: "POST",
    json: async () => ({ siteId: "s1" }),
  } as unknown as NextRequest;

  const res = await POST(req);

  expect(res.status).toBe(200);
  expect(res.data).toEqual({ ok: true });
});
