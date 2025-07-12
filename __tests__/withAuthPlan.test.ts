import type { NextApiRequest, NextApiResponse } from "next";

jest.mock("next-auth/next", () => ({
  getServerSession: jest.fn().mockResolvedValue(null),
}));

jest.mock("@/lib/auth", () => ({ __esModule: true, authOptions: {} }));
jest.mock("@/lib/dbConnect", () => jest.fn());
jest.mock("@/lib/models/user", () => ({
  __esModule: true,
  default: { findByIdAndUpdate: jest.fn() },
}));
jest.mock("@/lib/logger", () => ({ logger: { error: jest.fn() } }));

import { getServerSession } from "next-auth/next";

beforeEach(() => {
  jest.clearAllMocks();
});

test("redirects when unauthenticated", async () => {
  const handler = jest.fn();
  const redirect = jest.fn();
  const middleware = require("@/lib/middlewares/withAuthPlan").withAuthPlan(
    handler,
    "PRO",
  );
  const req = {} as NextApiRequest;
  const res = { redirect } as unknown as NextApiResponse;

  await middleware(req, res);
  expect(redirect).toHaveBeenCalledWith("/401");
  expect(handler).not.toHaveBeenCalled();
});

test("returns 403 when plan insufficient", async () => {
  (getServerSession as jest.Mock).mockResolvedValue({ user: { plan: "free" } });
  const handler = jest.fn();
  const json = jest.fn();
  const status = jest.fn(() => ({ json }));
  const middleware = require("@/lib/middlewares/withAuthPlan").withAuthPlan(
    handler,
    "PRO",
  );
  const req = {} as NextApiRequest;
  const res = { status } as unknown as NextApiResponse;

  await middleware(req, res);
  expect(status).toHaveBeenCalledWith(403);
  expect(json).toHaveBeenCalledWith({ error: "Plan PRO requerido" });
  expect(handler).not.toHaveBeenCalled();
});

test("calls handler when plan sufficient", async () => {
  (getServerSession as jest.Mock).mockResolvedValue({ user: { plan: "pro" } });
  const handler = jest.fn((_req, res: NextApiResponse) =>
    res.status(200).json({ ok: true }),
  );
  const json = jest.fn();
  const status = jest.fn(() => ({ json }));
  const middleware = require("@/lib/middlewares/withAuthPlan").withAuthPlan(
    handler,
    "FREE",
  );
  const req = {} as NextApiRequest;
  const res = { status } as unknown as NextApiResponse;

  await middleware(req, res);
  expect(handler).toHaveBeenCalled();
  expect(status).toHaveBeenLastCalledWith(200);
  expect(json).toHaveBeenCalledWith({ ok: true });
});

test("allows trial users for PRO", async () => {
  (getServerSession as jest.Mock).mockResolvedValue({
    user: { plan: "free", trialEndsAt: new Date(Date.now() + 1000) },
  });
  const handler = jest.fn((_req, res: NextApiResponse) =>
    res.status(200).json({ ok: true }),
  );
  const json = jest.fn();
  const status = jest.fn(() => ({ json }));
  const middleware = require("@/lib/middlewares/withAuthPlan").withAuthPlan(
    handler,
    "PRO",
  );
  const req = {} as NextApiRequest;
  const res = { status } as unknown as NextApiResponse;

  await middleware(req, res);
  expect(handler).toHaveBeenCalled();
  expect(status).toHaveBeenLastCalledWith(200);
  expect(json).toHaveBeenCalledWith({ ok: true });
});

test("downgrades when trial expired", async () => {
  (getServerSession as jest.Mock).mockResolvedValue({
    user: { id: "1", plan: "free", trialEndsAt: new Date(Date.now() - 1000) },
  });
  const handler = jest.fn((_req, res: NextApiResponse) =>
    res.status(200).json({ ok: true }),
  );
  const json = jest.fn();
  const status = jest.fn(() => ({ json }));
  const middleware = require("@/lib/middlewares/withAuthPlan").withAuthPlan(
    handler,
    "FREE",
  );
  const req = {} as NextApiRequest;
  const res = { status } as unknown as NextApiResponse;

  await middleware(req, res);
  const { default: User } = require("@/lib/models/user");

  expect(User.findByIdAndUpdate).toHaveBeenCalled();
  expect(handler).toHaveBeenCalled();
});
