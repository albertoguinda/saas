import type { NextRequest } from "next/server";

jest.mock("next/server", () => {
  return {
    NextRequest: class {},
    NextResponse: {
      json: jest.fn((data, init) => ({ status: init?.status || 200, data })),
    },
  };
});

const constructMock = jest.fn();

jest.mock("@/lib/stripe", () => ({
  __esModule: true,
  stripe: { webhooks: { constructEvent: constructMock } },
}));

jest.mock("@/lib/dbConnect", () => ({ __esModule: true, default: jest.fn() }));

const updateMock = jest.fn();
const findSites = jest.fn();

jest.mock("@/lib/models/user", () => ({
  __esModule: true,
  default: { findOneAndUpdate: updateMock },
}));
const onboardingFind = jest.fn();
const onboardingCreate = jest.fn();

jest.mock("@/lib/models/onboarding", () => ({
  __esModule: true,
  default: { findOne: onboardingFind, create: onboardingCreate },
}));
jest.mock("@/lib/models/site", () => ({
  __esModule: true,
  default: { find: (...args: unknown[]) => findSites(...args) },
}));
const paymentCreate = jest.fn();

jest.mock("@/lib/models/payment", () => ({
  __esModule: true,
  default: { create: paymentCreate },
}));
jest.mock("@/lib/upstash", () => ({ redis: {} }));

jest.mock("@/lib/logger", () => ({ logger: { error: jest.fn() } }));
jest.mock("@/lib/track", () => ({ trackServer: jest.fn() }));
jest.mock("@/lib/emails", () => ({ sendPlanEmail: jest.fn() }));

import { POST } from "@/app/api/stripe/webhook/route";

beforeEach(() => {
  jest.clearAllMocks();
  findSites.mockResolvedValue([]);
  onboardingFind.mockResolvedValue(null);
});

test("returns 400 on invalid signature", async () => {
  constructMock.mockImplementation(() => {
    throw new Error("bad signature");
  });
  const req = {
    method: "POST",
    text: async () => "{}",
    headers: { get: () => "sig" },
  } as unknown as NextRequest;
  const res = await POST(req);

  expect(res.status).toBe(400);
});

test("processes event when signature valid", async () => {
  constructMock.mockReturnValue({ type: "checkout.session.completed" });
  const req = {
    method: "POST",
    text: async () => "{}",
    headers: { get: () => "sig" },
  } as unknown as NextRequest;
  const res = await POST(req);

  expect(constructMock).toHaveBeenCalled();
  expect(res.status).toBe(200);
  expect(res.data).toEqual({ received: true });
});

test("updates user plan when session completed", async () => {
  constructMock.mockReturnValue({
    type: "checkout.session.completed",
    data: {
      object: { metadata: { userId: "u1" }, customer_email: "a@test.com" },
    },
  });
  updateMock.mockResolvedValue({ _id: "u1" });
  const req = {
    method: "POST",
    text: async () => "{}",
    headers: { get: () => "sig" },
  } as unknown as NextRequest;

  await POST(req);
  expect(updateMock).toHaveBeenCalledWith(
    { _id: "u1" },
    { plan: "premium" },
    { new: true },
  );
  expect(onboardingCreate).toHaveBeenCalled();
  expect(paymentCreate).toHaveBeenCalled();
});

test("logs error when update fails", async () => {
  const { logger } = require("@/lib/logger");

  (logger.error as jest.Mock).mockClear();
  constructMock.mockReturnValue({
    type: "checkout.session.completed",
    data: { object: { metadata: { userId: "u1" } } },
  });
  updateMock.mockRejectedValue(new Error("db"));
  const req = {
    method: "POST",
    text: async () => "{}",
    headers: { get: () => "sig" },
  } as unknown as NextRequest;

  await POST(req);
  expect(logger.error).toHaveBeenCalled();
});
