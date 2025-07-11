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
  const res = await GET({} as NextRequest);

  expect(res.status).toBe(401);
});

test("returns visits count", async () => {
  (getServerSession as jest.Mock).mockResolvedValue({ user: { id: "1" } });
  countDocuments.mockResolvedValue(5);

  const res = await GET({} as NextRequest);

  expect(res.status).toBe(200);
  expect(res.data).toEqual({ visits: 5 });
});
