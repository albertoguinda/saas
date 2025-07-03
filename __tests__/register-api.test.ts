import type { NextRequest } from 'next/server';

jest.mock('next/server', () => {
  return {
    NextRequest: class {},
    NextResponse: { json: jest.fn((data, init) => ({ status: init?.status || 200, data })) },
  };
});

const saveMock = jest.fn();
const findOneMock = jest.fn();
const userConstructor = jest.fn(() => ({ save: saveMock }));
userConstructor.findOne = findOneMock;

jest.mock('@/lib/dbConnect', () => ({ __esModule: true, default: jest.fn() }));
jest.mock('@/lib/models/user', () => ({ __esModule: true, default: userConstructor }));

import { POST } from '@/app/api/auth/register/route';

beforeEach(() => {
  jest.clearAllMocks();
});

test('returns 400 when missing data', async () => {
  const req = { json: async () => ({ email: 'a@test.com' }) } as unknown as NextRequest;
  const res = await POST(req);
  expect(res.status).toBe(400);
});

test('returns 409 when user exists', async () => {
  findOneMock.mockResolvedValue({});
  const req = { json: async () => ({ email: 'a@test.com', password: '123456', name: 'test' }) } as unknown as NextRequest;
  const res = await POST(req);
  expect(findOneMock).toHaveBeenCalledWith({ email: 'a@test.com' });
  expect(res.status).toBe(409);
});

test('creates user when data valid', async () => {
  findOneMock.mockResolvedValue(null);
  const req = { json: async () => ({ email: 'a@test.com', password: '123456', name: 'test' }) } as unknown as NextRequest;
  const res = await POST(req);
  expect(saveMock).toHaveBeenCalled();
  expect(res.status).toBe(200);
});
