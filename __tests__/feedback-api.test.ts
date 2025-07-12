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

const create = jest.fn();

jest.mock("@/lib/models/feedback", () => ({
  __esModule: true,
  default: { create },
}));

import { getServerSession } from "next-auth";

import { POST } from "@/app/api/feedback/route";

beforeEach(() => {
  jest.clearAllMocks();
});

test("POST requires auth", async () => {
  const res = await POST({ method: "POST" } as NextRequest);

  expect(res.status).toBe(401);
});

test("POST saves feedback", async () => {
  (getServerSession as jest.Mock).mockResolvedValue({ user: { id: "1" } });

  const req = {
    method: "POST",
    json: async () => ({ message: "hi" }),
  } as unknown as NextRequest;

  const res = await POST(req);

  expect(res.status).toBe(200);
  expect(create).toHaveBeenCalledWith({ userId: "1", message: "hi" });
});
