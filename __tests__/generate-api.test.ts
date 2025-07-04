import type { NextApiRequest, NextApiResponse } from "next";

jest.mock("next-auth/next", () => ({
  getServerSession: jest.fn().mockResolvedValue({ user: { id: "1" } }),
}));

jest.mock("@/lib/dbConnect", () => ({ __esModule: true, default: jest.fn() }));
jest.mock("@/lib/auth", () => ({ __esModule: true, authOptions: {} }));

const findOneMock = jest.fn();

jest.mock("@/lib/models/site", () => ({
  __esModule: true,
  default: { findOne: findOneMock },
}));

jest.mock("@/lib/models/event", () => ({
  __esModule: true,
  default: { create: jest.fn() },
}));

import { POST as handler } from "@/app/api/projects/[id]/generate/route";
import Event from "@/lib/models/event";
import { getServerSession } from "next-auth/next";

beforeEach(() => {
  jest.clearAllMocks();
});

test("updates site and logs event", async () => {
  const save = jest.fn();
  const site = { save };
  findOneMock.mockResolvedValueOnce(null).mockResolvedValueOnce(site);
  const json = jest.fn();
  const status = jest.fn(() => ({ json }));
  const setHeader = jest.fn();
  const req = {
    method: "POST",
    query: { id: "s1" },
    body: {
      title: "t",
      slug: "slug",
      template: "one-page",
      color: "indigo",
      font: "sans",
    },
  } as unknown as NextApiRequest;
  const res = { status, setHeader } as unknown as NextApiResponse;
  await handler(req, res);
  expect(save).toHaveBeenCalled();
  expect(Event.create).toHaveBeenCalledWith({ userId: "1", event: "wizard_completed" });
  expect(status).toHaveBeenCalledWith(200);
  expect(json).toHaveBeenCalledWith({ site });
});
