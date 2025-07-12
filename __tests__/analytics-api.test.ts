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
const get = jest.fn();
const set = jest.fn();

jest.mock("@/lib/upstash", () => ({ redis: { get, set } }));

const countDocuments = jest.fn();

jest.mock("@/lib/models/event", () => ({
  __esModule: true,
  default: { countDocuments },
}));

import { getServerSession } from "next-auth";

import { GET } from "@/app/api/analytics/route";

beforeEach(() => {
  jest.clearAllMocks();
});

test("returns 401 when unauthenticated", async () => {
  const res = await GET({ nextUrl: new URL("http://x") } as NextRequest);

  expect(res.status).toBe(401);
});

test("returns visits count", async () => {
  (getServerSession as jest.Mock).mockResolvedValue({ user: { id: "1" } });
  countDocuments.mockResolvedValueOnce(5);
  countDocuments.mockResolvedValueOnce(2);
  countDocuments.mockResolvedValueOnce(1);

  const res = await GET({ nextUrl: new URL("http://x") } as NextRequest);

  expect(res.status).toBe(200);
  expect(res.data).toEqual({ visits: 5, upgrades: 2, wizard: 1 });
});

test("sets analytics cache with TTL", async () => {
  (getServerSession as jest.Mock).mockResolvedValue({ user: { id: "1" } });
  countDocuments.mockResolvedValueOnce(1);
  countDocuments.mockResolvedValueOnce(1);
  countDocuments.mockResolvedValueOnce(1);

  await GET({ nextUrl: new URL("http://x") } as NextRequest);

  expect(set).toHaveBeenCalledWith(
    "analytics:1:day",
    JSON.stringify({ visits: 1, upgrades: 1, wizard: 1 }),
    { ex: 600 },
  );
});
