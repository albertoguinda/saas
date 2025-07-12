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

const findById = jest.fn();
const updateOne = jest.fn();
const findSites = jest.fn();
const deleteMany = jest.fn();
const insertMany = jest.fn();
const backupCreate = jest.fn();
const backupFind = jest.fn(() => ({
  sort: jest.fn().mockReturnThis(),
  skip: jest.fn().mockReturnThis(),
  select: jest.fn().mockReturnValue([]),
}));
const backupFindOne = jest.fn();
const backupDeleteMany = jest.fn();
const backupCount = jest.fn();

jest.mock("@/lib/models/user", () => ({
  __esModule: true,
  default: { findById, updateOne },
}));

jest.mock("@/lib/models/site", () => ({
  __esModule: true,
  default: { find: findSites, deleteMany, insertMany },
}));

jest.mock("@/lib/models/backup", () => ({
  __esModule: true,
  default: {
    create: backupCreate,
    find: backupFind,
    findOne: backupFindOne,
    deleteMany: backupDeleteMany,
    countDocuments: backupCount,
  },
}));

jest.mock("@/lib/logger", () => ({ logger: { info: jest.fn() } }));

import { getServerSession } from "next-auth";

import { GET, POST as create } from "@/app/api/backup/route";
import { POST as restore } from "@/app/api/restore/route";

beforeEach(() => {
  jest.clearAllMocks();
  (getServerSession as jest.Mock).mockResolvedValue(null);
  backupCreate.mockResolvedValue({ _id: "1", data: Buffer.from("a") });
});

test("create returns 401 when unauthenticated", async () => {
  const res = await create({} as NextRequest);

  expect(res.status).toBe(401);
});

test("create returns zip", async () => {
  (getServerSession as jest.Mock).mockResolvedValue({ user: { id: "1" } });
  findById.mockReturnValue({ lean: () => ({ _id: "1" }) });
  findSites.mockReturnValue({ lean: () => [] });

  const res = await create({
    headers: new Headers({ accept: "application/zip" }),
    nextUrl: new URL("http://x"),
  } as unknown as NextRequest);

  expect(res.status).toBe(200);
});

test("list backups", async () => {
  (getServerSession as jest.Mock).mockResolvedValue({ user: { id: "1" } });

  const res = await GET();

  expect(res.status).toBe(200);
});

test("restore returns 401 when unauthenticated", async () => {
  const fd = new FormData();
  const res = await restore({ formData: async () => fd } as NextRequest);

  expect(res.status).toBe(401);
});

test("restore imports data", async () => {
  (getServerSession as jest.Mock).mockResolvedValue({ user: { id: "1" } });
  const content = JSON.stringify({ user: { _id: "1" }, sites: [] });
  const fd = new FormData();

  fd.append("file", new Blob([content], { type: "application/json" }));
  const res = await restore({ formData: async () => fd } as NextRequest);

  expect(res.status).toBe(400);
});
