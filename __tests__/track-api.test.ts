
import type { NextRequest } from 'next/server';

jest.mock('next/server', () => {
  return {
    NextRequest: class {},
    NextResponse: { json: jest.fn((data, init) => ({ status: init?.status || 200, data })) },
  };
});

jest.mock('next-auth', () => ({
  getServerSession: jest.fn().mockResolvedValue(null),
}));

jest.mock('@/lib/auth', () => ({ __esModule: true, authOptions: {} }));
jest.mock('@/lib/dbConnect', () => ({ __esModule: true, default: jest.fn() }));
jest.mock('@/lib/models/event', () => ({ __esModule: true, default: { create: jest.fn() } }));

import { POST } from '@/app/api/track/route';


test('returns 401 when unauthenticated', async () => {
  const req = { json: async () => ({ event: 'test' }) } as unknown as NextRequest;
  const res = await POST(req);
  expect(res.status).toBe(401);
});

test('creates event with extended payload', async () => {
  const { getServerSession } = require('next-auth');
  const create = require('@/lib/models/event').default.create;
  getServerSession.mockResolvedValueOnce({ user: { id: '1' } });
  const payload = {
    event: 'click',
    page: '/home',
    timestamp: 123,
    x: 10,
    y: 20,
  };
  const req = { method: 'POST', json: async () => payload } as unknown as NextRequest;
  const res = await POST(req);
  expect(create).toHaveBeenCalledWith({ userId: '1', ...payload });
  expect(res.status).toBe(200);
});
