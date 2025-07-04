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

const updateMock = jest.fn();

jest.mock("@/lib/models/user", () => ({
  __esModule: true,
  default: { findOneAndUpdate: updateMock },
}));

jest.mock("@/lib/storage", () => ({
  __esModule: true,
  uploadAvatar: jest.fn(),
}));

import { POST } from "@/app/api/me/avatar/upload/route";
import { getServerSession } from "next-auth";
import { uploadAvatar } from "@/lib/storage";

beforeEach(() => {
  jest.clearAllMocks();
});

test("returns 401 when unauthenticated", async () => {
  const req = { formData: async () => new FormData() } as unknown as NextRequest;
  const res = await POST(req);
  expect(res.status).toBe(401);
});

test("returns 400 when no file", async () => {
  (getServerSession as jest.Mock).mockResolvedValue({ user: { email: "a@test.com" } });
  const req = { formData: async () => new FormData() } as unknown as NextRequest;
  const res = await POST(req);
  expect(res.status).toBe(400);
});

test("returns 404 when user not found", async () => {
  (getServerSession as jest.Mock).mockResolvedValue({ user: { email: "a@test.com" } });
  (uploadAvatar as jest.Mock).mockResolvedValue("http://img");
  updateMock.mockResolvedValue(null);
  const fd = new FormData();
  fd.append("file", new Blob(["a"], { type: "image/png" }));
  const req = { formData: async () => fd } as unknown as NextRequest;
  const res = await POST(req);
  expect(res.status).toBe(404);
});

test("uploads avatar and updates user", async () => {
  (getServerSession as jest.Mock).mockResolvedValue({ user: { email: "a@test.com" } });
  (uploadAvatar as jest.Mock).mockResolvedValue("http://img");
  updateMock.mockResolvedValue({ avatar: "http://img" });
  const fd = new FormData();
  fd.append("file", new Blob(["a"], { type: "image/png" }));
  const req = { formData: async () => fd } as unknown as NextRequest;
  const res = await POST(req);
  expect(uploadAvatar).toHaveBeenCalled();
  expect(updateMock).toHaveBeenCalled();
  expect(res.status).toBe(200);
  expect(res.data).toEqual({ ok: true, avatar: "http://img" });
});

test("returns 500 on error", async () => {
  (getServerSession as jest.Mock).mockResolvedValue({ user: { email: "a@test.com" } });
  (uploadAvatar as jest.Mock).mockRejectedValue(new Error("x"));
  const fd = new FormData();
  fd.append("file", new Blob(["a"], { type: "image/png" }));
  const req = { formData: async () => fd } as unknown as NextRequest;
  const res = await POST(req);
  expect(res.status).toBe(500);
});
