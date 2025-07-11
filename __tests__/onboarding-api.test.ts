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

const findOne = jest.fn();
const findOneAndUpdate = jest.fn();

jest.mock("@/lib/models/onboarding", () => ({
  __esModule: true,
  default: { findOne, findOneAndUpdate },
}));

import { getServerSession } from "next-auth";

import { GET, PATCH } from "@/app/api/onboarding/route";

beforeEach(() => {
  jest.clearAllMocks();
});

test("GET requires auth", async () => {
  const res = await GET({ method: "GET" } as NextRequest);

  expect(res.status).toBe(401);
});

test("PATCH marks step", async () => {
  (getServerSession as jest.Mock).mockResolvedValue({ user: { id: "1" } });
  findOneAndUpdate.mockResolvedValue({ branding: true });

  const req = {
    method: "PATCH",
    json: async () => ({ step: "branding" }),
  } as unknown as NextRequest;

  const res = await PATCH(req);

  expect(res.status).toBe(200);
  expect(findOneAndUpdate).toHaveBeenCalled();
});
