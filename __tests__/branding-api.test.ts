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

const findSites = jest.fn();

jest.mock("@/lib/models/site", () => ({
  __esModule: true,
  default: { find: (...args: unknown[]) => findSites(...args) },
}));
jest.mock("@/lib/upstash", () => ({ redis: {} }));

const findOne = jest.fn();
const findOneAndUpdate = jest.fn();

jest.mock("@/lib/models/branding", () => ({
  __esModule: true,
  default: { findOne, findOneAndUpdate },
}));

import { getServerSession } from "next-auth";

import { GET, PATCH } from "@/app/api/branding/route";

beforeEach(() => {
  jest.clearAllMocks();
  findSites.mockResolvedValue([]);
});

test("GET returns 401 when unauthenticated", async () => {
  const res = await GET({ method: "GET" } as NextRequest);

  expect(res.status).toBe(401);
});

test("GET returns branding", async () => {
  (getServerSession as jest.Mock).mockResolvedValue({ user: { id: "1" } });
  findOne.mockResolvedValue({ logo: "l" });

  const res = await GET({ method: "GET" } as NextRequest);

  expect(res.status).toBe(200);
  expect(res.data).toEqual({ branding: { logo: "l" } });
});

test("PATCH updates branding", async () => {
  (getServerSession as jest.Mock).mockResolvedValue({ user: { id: "1" } });
  findOneAndUpdate.mockResolvedValue({ logo: "z" });

  const req = {
    method: "PATCH",
    json: async () => ({ logo: "z" }),
  } as unknown as NextRequest;

  const res = await PATCH(req);

  expect(res.status).toBe(200);
  expect(findOneAndUpdate).toHaveBeenCalled();
  expect(res.data).toEqual({ branding: { logo: "z" } });
});
