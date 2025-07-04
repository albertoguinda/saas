import type { NextApiRequest, NextApiResponse } from "next";

jest.mock("next-auth/next", () => ({
  getServerSession: jest.fn().mockResolvedValue(null),
}));

jest.mock("@/lib/auth", () => ({ __esModule: true, authOptions: {} }));

jest.mock("@/lib/dbConnect", () => ({ __esModule: true, default: jest.fn() }));

const findOneMock = jest.fn();

jest.mock("@/lib/models/user", () => ({
  __esModule: true,
  default: { findOne: findOneMock },
}));

import { PATCH as handler } from "@/app/api/me/update/route";
import { getServerSession } from "next-auth/next";

beforeEach(() => {
  jest.clearAllMocks();
});

test("returns 405 for non-PATCH", async () => {
  const json = jest.fn();
  const status = jest.fn(() => ({ json }));
  const req = { method: "GET" } as unknown as NextApiRequest;
  const res = { status } as unknown as NextApiResponse;
  await handler(req, res);
  expect(status).toHaveBeenCalledWith(405);
  expect(json).toHaveBeenCalledWith({ error: "Método no permitido" });
});

test("returns 401 when unauthenticated", async () => {
  const json = jest.fn();
  const status = jest.fn(() => ({ json }));
  const req = { method: "PATCH" } as unknown as NextApiRequest;
  const res = { status } as unknown as NextApiResponse;
  await handler(req, res);
  expect(status).toHaveBeenCalledWith(401);
  expect(json).toHaveBeenCalledWith({ error: "No autenticado" });
});

test("returns 404 when user missing", async () => {
  (getServerSession as jest.Mock).mockResolvedValue({ user: { email: "a@test.com" } });
  findOneMock.mockResolvedValue(null);
  const json = jest.fn();
  const status = jest.fn(() => ({ json }));
  const req = { method: "PATCH", body: { name: "John" } } as unknown as NextApiRequest;
  const res = { status } as unknown as NextApiResponse;
  await handler(req, res);
  expect(findOneMock).toHaveBeenCalledWith({ email: "a@test.com" });
  expect(status).toHaveBeenCalledWith(404);
  expect(json).toHaveBeenCalledWith({ error: "Usuario no encontrado" });
});

test("updates user and returns sanitized data", async () => {
  (getServerSession as jest.Mock).mockResolvedValue({ user: { email: "a@test.com" } });
  const save = jest.fn();
  const toObject = jest.fn(() => ({ name: "John", email: "a@test.com", avatar: "😀", password: "x" }));
  const user = { name: "", password: "x", avatar: "", save, toObject };
  findOneMock.mockResolvedValue(user);
  const json = jest.fn();
  const status = jest.fn(() => ({ json }));
  const req = { method: "PATCH", body: { name: "John", avatar: "😀" } } as unknown as NextApiRequest;
  const res = { status } as unknown as NextApiResponse;
  await handler(req, res);
  expect(user.name).toBe("John");
  expect(user.avatar).toBe("😀");
  expect(save).toHaveBeenCalled();
  expect(status).toHaveBeenCalledWith(200);
  expect(json).toHaveBeenCalledWith({ user: { name: "John", email: "a@test.com", avatar: "😀" } });
});

test("returns 500 on error", async () => {
  (getServerSession as jest.Mock).mockResolvedValue({ user: { email: "a@test.com" } });
  findOneMock.mockRejectedValue(new Error("db"));
  const json = jest.fn();
  const status = jest.fn(() => ({ json }));
  const req = { method: "PATCH", body: { name: "John" } } as unknown as NextApiRequest;
  const res = { status } as unknown as NextApiResponse;
  await handler(req, res);
  expect(status).toHaveBeenCalledWith(500);
  expect(json).toHaveBeenCalledWith({ error: "Error actualizando perfil" });
});
