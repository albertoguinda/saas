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
jest.mock("@/lib/ia", () => ({
  __esModule: true,
  generateContent: jest.fn().mockResolvedValue("hi"),
}));

const create = jest.fn();

jest.mock("@/lib/models/generatedContent", () => ({
  __esModule: true,
  default: { create },
}));

import { getServerSession } from "next-auth";

import { generateContent } from "@/lib/ia";
import { POST } from "@/app/api/ia/route";

beforeEach(() => {
  jest.clearAllMocks();
});

test("returns 401 when unauthenticated", async () => {
  const req = {
    method: "POST",
    json: async () => ({ prompt: "p" }),
  } as unknown as NextRequest;
  const res = await POST(req);

  expect(res.status).toBe(401);
});

test("generates content and saves", async () => {
  (getServerSession as jest.Mock).mockResolvedValue({ user: { id: "1" } });
  const req = {
    method: "POST",
    json: async () => ({ prompt: "p" }),
  } as unknown as NextRequest;

  const res = await POST(req);

  expect(res.status).toBe(200);
  expect(generateContent).toHaveBeenCalledWith("p");
  expect(create).toHaveBeenCalled();
  expect(res.data).toEqual({ content: "hi" });
});
