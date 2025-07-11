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
const findSites = jest.fn();

jest.mock("@/lib/models/site", () => ({
  __esModule: true,
  default: { find: (...args: unknown[]) => findSites(...args) },
}));
jest.mock("@/lib/upstash", () => ({ redis: {} }));

const findOneAndUpdate = jest.fn();

jest.mock("@/lib/models/branding", () => ({
  __esModule: true,
  default: { findOneAndUpdate },
}));

jest.mock("@/lib/storage", () => ({
  __esModule: true,
  uploadImage: jest.fn(),
}));

import { getServerSession } from "next-auth";

import { uploadImage } from "@/lib/storage";
import { POST } from "@/app/api/branding/upload/route";

beforeEach(() => {
  jest.clearAllMocks();
  findSites.mockResolvedValue([]);
});

test("returns 401 when unauthenticated", async () => {
  const res = await POST({
    formData: async () => new FormData(),
  } as NextRequest);

  expect(res.status).toBe(401);
});

test("uploads logo and saves", async () => {
  (getServerSession as jest.Mock).mockResolvedValue({ user: { id: "1" } });
  (uploadImage as jest.Mock).mockResolvedValue("http://img");
  findOneAndUpdate.mockResolvedValue({ logo: "http://img" });
  const fd = new FormData();

  fd.append("file", new Blob(["a"], { type: "image/png" }));
  fd.append("type", "logo");
  const res = await POST({ formData: async () => fd } as NextRequest);

  expect(uploadImage).toHaveBeenCalled();
  expect(findOneAndUpdate).toHaveBeenCalled();
  expect(res.status).toBe(200);
});
