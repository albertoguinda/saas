/* eslint-disable import/order */
import type { NextRequest } from "next/server";

jest.mock("next/server", () => {
  return {
    NextRequest: class {},
    NextResponse: {
      json: jest.fn((data, init) => ({ status: init?.status || 200, data })),
    },
  };
});

jest.mock("@/lib/middlewares/rateLimit", () => ({
  __esModule: true,
  checkLimit: jest.fn().mockResolvedValue(true),
  withRateLimitRoute: (handler: any) => async (req: any) => {
    const { checkLimit } = require("@/lib/middlewares/rateLimit");
    const allowed = await checkLimit("id", 10, 60);
    if (!allowed) {
      return { status: 429, data: { error: "Demasiadas peticiones" } };
    }
    return handler(req);
  },
}));

import { checkLimit } from "@/lib/middlewares/rateLimit";

const create = jest.fn();
const subscribeFn = jest.fn();
const del = jest.fn();
const constructEvent = jest.fn(() => ({ type: "test" }));

jest.mock("@/lib/stripe", () => ({
  __esModule: true,
  stripe: {
    customers: { create },
    subscriptions: { create: subscribeFn, del },
    webhooks: { constructEvent },
  },
}));

import { POST as createCustomer } from "@/app/api/stripe/create-customer/route";
import { POST as subscribe } from "@/app/api/stripe/subscribe/route";
import { POST as cancel } from "@/app/api/stripe/cancel/route";
import { POST as webhook } from "@/app/api/stripe/webhook/route";

beforeEach(() => {
  jest.clearAllMocks();
});

test("create-customer validates input", async () => {
  const req = { method: "POST", json: async () => ({}) } as unknown as NextRequest;
  const res = await createCustomer(req);
  expect(res.status).toBe(400);
});

test("create-customer returns id", async () => {
  create.mockResolvedValue({ id: "cus_1" });
  const req = { method: "POST", json: async () => ({ email: "a@test.com" }) } as unknown as NextRequest;
  const res = await createCustomer(req);
  expect(create).toHaveBeenCalled();
  expect(res.data).toEqual({ customerId: "cus_1" });
});

test("subscribe creates subscription", async () => {
  subscribeFn.mockResolvedValue({ id: "sub_1", status: "active" });
  const req = { method: "POST", json: async () => ({ customerId: "1", priceId: "p" }) } as unknown as NextRequest;
  const res = await subscribe(req);
  expect(subscribeFn).toHaveBeenCalled();
  expect(res.data).toEqual({ subscriptionId: "sub_1", status: "active" });
});

test("cancel removes subscription", async () => {
  del.mockResolvedValue({ status: "canceled" });
  const req = { method: "POST", json: async () => ({ subscriptionId: "sub_1" }) } as unknown as NextRequest;
  const res = await cancel(req);
  expect(del).toHaveBeenCalledWith("sub_1");
  expect(res.data).toEqual({ status: "canceled" });
});

test("webhook returns 400 on bad signature", async () => {
  constructEvent.mockImplementation(() => { throw new Error("bad"); });
  const req = { text: async () => "p", headers: { get: () => "sig" } } as unknown as NextRequest;
  const res = await webhook(req);
  expect(res.status).toBe(400);
});

test("webhook ok", async () => {
  constructEvent.mockReturnValue({ type: "customer.created" });
  const req = { text: async () => "p", headers: { get: () => "sig" } } as unknown as NextRequest;
  const res = await webhook(req);
  expect(res.status).toBe(200);
  expect(res.data).toEqual({ received: true });
});

