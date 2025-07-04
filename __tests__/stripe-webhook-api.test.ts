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

import { POST } from "@/app/api/stripe/webhook/route";

beforeEach(() => {
  jest.clearAllMocks();
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
