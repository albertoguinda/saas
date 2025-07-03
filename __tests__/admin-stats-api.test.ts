import type { NextRequest } from "next/server";

jest.mock("next/server", () => {
  return {
    NextRequest: class {},
    NextResponse: {
      json: jest.fn((data, init) => ({ status: init?.status || 200, data })),
    },
  };
});

jest.mock("next-auth", () => ({
  getServerSession: jest.fn().mockResolvedValue(null),
}));

jest.mock("@/lib/auth", () => ({ __esModule: true, authOptions: {} }));
jest.mock("@/lib/dbConnect", () => ({ __esModule: true, default: jest.fn() }));

const userCount = jest.fn();
const siteCount = jest.fn();
const eventCount = jest.fn();

jest.mock("@/lib/models/user", () => ({
  __esModule: true,
  default: { countDocuments: userCount },
}));

jest.mock("@/lib/models/site", () => ({
  __esModule: true,
  default: { countDocuments: siteCount },
}));

jest.mock("@/lib/models/event", () => ({
  __esModule: true,
  default: { countDocuments: eventCount },
}));

import { GET } from "@/app/api/admin/stats/route";
import { getServerSession } from "next-auth";

beforeEach(() => {
  jest.clearAllMocks();
  process.env.ADMIN_EMAIL = "admin@test.com";
});

test("returns 401 when ADMIN_EMAIL mismatch", async () => {
  (getServerSession as jest.Mock).mockResolvedValue({ user: { email: "foo@test.com" } });
  const res = await GET({} as NextRequest);
  expect(res.status).toBe(401);
});

test("returns counts when authorized", async () => {
  (getServerSession as jest.Mock).mockResolvedValue({ user: { email: "admin@test.com" } });
  userCount.mockResolvedValue(1);
  siteCount.mockResolvedValue(2);
  eventCount.mockResolvedValue(3);

  const res = await GET({} as NextRequest);
  expect(res.status).toBe(200);
  expect(res.data).toEqual({ users: 1, sites: 2, events: 3 });
  expect(userCount).toHaveBeenCalled();
  expect(siteCount).toHaveBeenCalled();
  expect(eventCount).toHaveBeenCalled();
});
