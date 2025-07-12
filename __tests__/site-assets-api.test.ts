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

const findOne = jest.fn();

jest.mock("@/lib/models/site", () => ({
  __esModule: true,
  default: { findOne },
}));

jest.mock("@/lib/storage", () => ({
  __esModule: true,
  uploadImage: jest.fn(),
}));

jest.mock("@/lib/upstash", () => ({ redis: {} }));
jest.mock("@/lib/cache", () => ({
  __esModule: true,
  invalidateSite: jest.fn(),
}));

import { getServerSession } from "next-auth";

import { uploadImage } from "@/lib/storage";
import { POST, DELETE } from "@/app/api/sites/[id]/assets/route";

beforeEach(() => {
  jest.clearAllMocks();
  findOne.mockResolvedValue({ structure: {}, slug: "test", save: jest.fn() });
});

test("returns 401 when unauthenticated", async () => {
  const fd = new FormData();

  fd.append("file", new Blob(["a"], { type: "image/png" }));
  fd.append("type", "logo");
  const res = await POST(
    { formData: async () => fd } as unknown as NextRequest,
    {
      params: { id: "1" },
    },
  );

  expect(res.status).toBe(401);
});

test("uploads asset and saves", async () => {
  (getServerSession as jest.Mock).mockResolvedValue({ user: { id: "1" } });
  (uploadImage as jest.Mock).mockResolvedValue("/img");
  const save = jest.fn();

  findOne.mockResolvedValue({ structure: {}, slug: "s", save });
  const fd = new FormData();

  fd.append("file", new Blob(["a"], { type: "image/png" }));
  fd.append("type", "logo");
  const res = await POST(
    { formData: async () => fd } as unknown as NextRequest,
    {
      params: { id: "1" },
    },
  );

  expect(uploadImage).toHaveBeenCalled();
  expect(save).toHaveBeenCalled();
  expect(res.status).toBe(200);
});

test("deletes asset", async () => {
  (getServerSession as jest.Mock).mockResolvedValue({ user: { id: "1" } });
  const save = jest.fn();

  findOne.mockResolvedValue({
    structure: { branding: { assets: { logo: { url: "a" } } } },
    slug: "s",
    save,
  });
  const req = { nextUrl: new URL("http://test?type=logo") } as NextRequest;
  const res = await DELETE(req, { params: { id: "1" } });

  expect(save).toHaveBeenCalled();
  expect(res.status).toBe(200);
});
