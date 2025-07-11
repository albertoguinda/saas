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
jest.mock("@/lib/dbConnect", () => ({ __esModule: true, default: jest.fn() }));

const createMock = jest.fn();
const findMock = jest.fn();

jest.mock("@/lib/models/domain", () => ({
  __esModule: true,
  default: { create: createMock, find: findMock },
}));

import { getServerSession } from "next-auth";

import { GET, POST } from "@/app/api/domains/route";

beforeEach(() => {
  jest.clearAllMocks();
});

test("returns 401 when unauthenticated", async () => {
  const res = await GET({ nextUrl: new URL("http://x") } as NextRequest);

  expect(res.status).toBe(401);
});

test("creates domain", async () => {
  (getServerSession as jest.Mock).mockResolvedValue({ user: { id: "1" } });
  const req = {
    json: async () => ({ name: "example.com" }),
    method: "POST",
  } as unknown as NextRequest;

  const res = await POST(req);

  expect(createMock).toHaveBeenCalledWith({ userId: "1", name: "example.com" });
  expect(res.status).toBe(200);
});
