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
const findOneMock = jest.fn();

jest.mock("@/lib/models/domain", () => ({
  __esModule: true,
  default: { create: createMock, findOne: findOneMock },
}));

const resolveCname = jest.fn();

jest.mock("node:dns", () => ({ promises: { resolveCname } }));

import { getServerSession } from "next-auth";

import { POST } from "@/app/api/domain/connect/route";

beforeEach(() => {
  jest.clearAllMocks();
});

test("requires auth", async () => {
  const req = {
    method: "POST",
    json: async () => ({ name: "a.com" }),
  } as NextRequest;
  const res = await POST(req);

  expect(res.status).toBe(401);
});

test("rejects existing domain", async () => {
  (getServerSession as jest.Mock).mockResolvedValue({ user: { id: "1" } });
  findOneMock.mockResolvedValue({});
  const req = {
    method: "POST",
    json: async () => ({ name: "a.com" }),
  } as NextRequest;
  const res = await POST(req);

  expect(res.status).toBe(409);
});

test("creates domain when valid", async () => {
  (getServerSession as jest.Mock).mockResolvedValue({ user: { id: "1" } });
  resolveCname.mockResolvedValue(["app.example.com"]);
  findOneMock.mockResolvedValue(null);
  const req = {
    method: "POST",
    json: async () => ({ name: "a.com" }),
  } as NextRequest;
  const res = await POST(req);

  expect(createMock).toHaveBeenCalledWith({
    userId: "1",
    name: "a.com",
    status: "active",
  });
  expect(res.status).toBe(200);
});
