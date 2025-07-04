import type { NextApiRequest, NextApiResponse } from "next";

jest.mock("next-auth/next", () => ({
  getServerSession: jest.fn().mockResolvedValue(null),
}));

jest.mock("@/lib/auth", () => ({ __esModule: true, authOptions: {} }));

jest.mock("@/lib/dbConnect", () => ({ __esModule: true, default: jest.fn() }));

const updateMock = jest.fn();

jest.mock("@/lib/models/user", () => ({
  __esModule: true,
  default: { findOneAndUpdate: updateMock },
}));

import { PATCH as handler } from "@/app/api/me/avatar/route";
import { getServerSession } from "next-auth/next";

beforeEach(() => {
  jest.clearAllMocks();
});

test("returns 401 when unauthenticated", async () => {
  const json = jest.fn();
  const status = jest.fn(() => ({ json }));
  const req = { method: "PATCH", body: { avatar: "x" } } as unknown as NextApiRequest;
  const res = { status } as unknown as NextApiResponse;
  await handler(req, res);
  expect(status).toHaveBeenCalledWith(401);
  expect(json).toHaveBeenCalledWith({ error: "No autenticado" });
});

test("returns 405 for invalid method", async () => {
  (getServerSession as jest.Mock).mockResolvedValue({ user: { email: "a@test.com" } });
  const json = jest.fn();
  const status = jest.fn(() => ({ json }));
  const req = { method: "GET" } as unknown as NextApiRequest;
  const res = { status } as unknown as NextApiResponse;
  await handler(req, res);
  expect(status).toHaveBeenCalledWith(405);
  expect(json).toHaveBeenCalledWith({ error: "Método no soportado" });
});

test("returns 400 when avatar missing", async () => {
  (getServerSession as jest.Mock).mockResolvedValue({ user: { email: "a@test.com" } });
  const json = jest.fn();
  const status = jest.fn(() => ({ json }));
  const req = { method: "PATCH", body: {} } as unknown as NextApiRequest;
  const res = { status } as unknown as NextApiResponse;
  await handler(req, res);
  expect(status).toHaveBeenCalledWith(400);
  expect(json).toHaveBeenCalledWith({ error: "Avatar no válido" });
});

test("returns 404 when user not found", async () => {
  (getServerSession as jest.Mock).mockResolvedValue({ user: { email: "a@test.com" } });
  updateMock.mockResolvedValue(null);
  const json = jest.fn();
  const status = jest.fn(() => ({ json }));
  const req = { method: "PATCH", body: { avatar: "😀" } } as unknown as NextApiRequest;
  const res = { status } as unknown as NextApiResponse;
  await handler(req, res);
  expect(updateMock).toHaveBeenCalled();
  expect(status).toHaveBeenCalledWith(404);
  expect(json).toHaveBeenCalledWith({ error: "Usuario no encontrado" });
});

test("updates avatar successfully", async () => {
  (getServerSession as jest.Mock).mockResolvedValue({ user: { email: "a@test.com" } });
  updateMock.mockResolvedValue({ avatar: "😎" });
  const json = jest.fn();
  const status = jest.fn(() => ({ json }));
  const req = { method: "PATCH", body: { avatar: "😎" } } as unknown as NextApiRequest;
  const res = { status } as unknown as NextApiResponse;
  await handler(req, res);
  expect(updateMock).toHaveBeenCalled();
  expect(status).toHaveBeenCalledWith(200);
  expect(json).toHaveBeenCalledWith({ ok: true, avatar: "😎" });
});

test("returns 500 on error", async () => {
  (getServerSession as jest.Mock).mockResolvedValue({ user: { email: "a@test.com" } });
  updateMock.mockRejectedValue(new Error("db"));
  const json = jest.fn();
  const status = jest.fn(() => ({ json }));
  const req = { method: "PATCH", body: { avatar: "😎" } } as unknown as NextApiRequest;
  const res = { status } as unknown as NextApiResponse;
  await handler(req, res);
  expect(status).toHaveBeenCalledWith(500);
  expect(json).toHaveBeenCalledWith({ error: "Error actualizando avatar" });
});
