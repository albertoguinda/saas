import { createMocks } from "node-mocks-http";
import { getServerSession } from "next-auth/next";

import handler from "@/pages/api/me/index";
import User from "@/lib/models/user";
jest.mock("@/lib/models/user", () => ({
  __esModule: true,
  default: { findById: jest.fn() },
}));
jest.mock("next-auth/next", () => ({ getServerSession: jest.fn() }));

jest.mock("@/lib/dbConnect", () => jest.fn());

const mockUser = {
  name: "Test",
  email: "test@test.com",
  plan: "free",
  createdAt: new Date(),
};

describe("/api/me handler", () => {
  it("returns 401 if unauthenticated", async () => {
    (getServerSession as jest.Mock).mockResolvedValueOnce(null);
    const { req, res } = createMocks({ method: "GET" });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(401);
  });

  it("returns user data for GET", async () => {
    (getServerSession as jest.Mock).mockResolvedValueOnce({
      user: { id: "1" },
    });
    (User.findById as jest.Mock).mockReturnValueOnce({
      select: jest.fn().mockResolvedValueOnce(mockUser),
    });
    const { req, res } = createMocks({ method: "GET" });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData()).user.name).toBe("Test");
  });
});
