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

test("returns 401 when unauthenticated", async () => {
  const req = {
    method: "POST",
    json: async () => ({ message: "hi" }),
  } as unknown as NextRequest;
  const res = await POST(req);

  expect(res.status).toBe(401);
});

test("saves feedback", async () => {
  (getServerSession as jest.Mock).mockResolvedValue({ user: { id: "1" } });
  const req = {
    method: "POST",
    json: async () => ({ message: "Great" }),
  } as unknown as NextRequest;
  const res = await POST(req);

  expect(create).toHaveBeenCalledWith({ userId: "1", message: "Great" });
  expect(res.status).toBe(200);
});

test("returns 400 when validation fails", async () => {
  (getServerSession as jest.Mock).mockResolvedValue({ user: { id: "1" } });
  const req = {
    method: "POST",
    json: async () => ({ message: "" }),
  } as unknown as NextRequest;
  const res = await POST(req);

  expect(res.status).toBe(400);
  expect(create).not.toHaveBeenCalled();
});
