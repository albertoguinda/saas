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
jest.mock("@/lib/dbConnect", () => ({ __esModule: true, default: jest.fn() }));

const aggregate = jest.fn();
const find = jest.fn(() => ({
  sort: jest.fn().mockReturnThis(),
  limit: jest.fn().mockReturnThis(),
  select: jest.fn().mockReturnValue({ lean: jest.fn().mockResolvedValue([]) }),
}));

jest.mock("@/lib/models/event", () => ({
  __esModule: true,
  default: { aggregate, find },
}));

import { getServerSession } from "next-auth";

import { GET } from "@/app/api/analytics/premium/route";

beforeEach(() => {
  jest.clearAllMocks();
});

test("returns 401 when unauthenticated", async () => {
  const res = await GET({ nextUrl: new URL("http://x") } as NextRequest);

  expect(res.status).toBe(401);
});

test("returns data when authenticated", async () => {
  (getServerSession as jest.Mock).mockResolvedValue({ user: { id: "1" } });
  aggregate.mockResolvedValue([{ _id: "2025-07-29", count: 2 }]);

  const res = await GET({ nextUrl: new URL("http://x") } as NextRequest);

  expect(res.status).toBe(200);
  expect(aggregate).toHaveBeenCalled();
});
