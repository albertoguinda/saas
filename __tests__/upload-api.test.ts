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

jest.mock("@/lib/storage", () => ({
  __esModule: true,
  uploadImage: jest.fn(),
}));

import { getServerSession } from "next-auth";

import { uploadImage } from "@/lib/storage";
import { POST } from "@/app/api/upload/route";

beforeEach(() => {
  jest.clearAllMocks();
});

test("returns 401 when unauthenticated", async () => {
  const req = {
    method: "POST",
    formData: async () => new FormData(),
  } as unknown as NextRequest;
  const res = await POST(req);

  expect(res.status).toBe(401);
});

test("returns url when upload succeeds", async () => {
  (getServerSession as jest.Mock).mockResolvedValue({ user: { id: "1" } });
  (uploadImage as jest.Mock).mockResolvedValue("http://img");
  const fd = new FormData();

  fd.set("file", new Blob());
  const req = {
    method: "POST",
    formData: async () => fd,
  } as unknown as NextRequest;

  const res = await POST(req);

  expect(res.status).toBe(200);
  expect(res.data).toEqual({ url: "http://img" });
});
