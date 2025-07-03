import type { NextRequest } from 'next/server';

jest.mock('next/server', () => {
  return {
    NextRequest: class {},
    NextResponse: { json: jest.fn((data, init) => ({ status: init?.status || 200, data })) },
  };
});

const sessionMock = { user: { id: 'user1' } };

jest.mock('next-auth', () => ({
  getServerSession: jest.fn().mockResolvedValue(null),
}));

jest.mock('@/lib/auth', () => ({ __esModule: true, authOptions: {} }));
jest.mock('@/lib/dbConnect', () => ({ __esModule: true, default: jest.fn() }));

const createMock = jest.fn();

jest.mock('@/lib/models/event', () => ({ __esModule: true, default: { create: createMock } }));

import { POST } from '@/app/api/track/route';
import { getServerSession } from 'next-auth';
import dbConnect from '@/lib/dbConnect';

beforeEach(() => {
  jest.clearAllMocks();
});

test('returns 401 when unauthenticated', async () => {
  const req = { json: async () => ({ event: 'test' }) } as unknown as NextRequest;
  const res = await POST(req);
  expect(res.status).toBe(401);
  expect(createMock).not.toHaveBeenCalled();
});

test('stores event when authenticated', async () => {
  (getServerSession as jest.Mock).mockResolvedValue(sessionMock);
  const body = { event: 'wizard_completed', page: '/wizard', ip: '1.2.3.4', userAgent: 'jest' };
  const req = { json: async () => body } as unknown as NextRequest;
  const res = await POST(req);
  expect(dbConnect).toHaveBeenCalled();
  expect(createMock).toHaveBeenCalledWith(expect.objectContaining({ userId: 'user1', event: body.event }));
  expect(res.status).toBe(200);
});

test('returns 400 when event missing', async () => {
  (getServerSession as jest.Mock).mockResolvedValue(sessionMock);
  const req = { json: async () => ({}) } as unknown as NextRequest;
  const res = await POST(req);
  expect(res.status).toBe(400);
  expect(createMock).not.toHaveBeenCalled();
});

test('returns 400 with invalid JSON', async () => {
  (getServerSession as jest.Mock).mockResolvedValue(sessionMock);
  const req = { json: async () => { throw new Error('bad'); } } as unknown as NextRequest;
  const res = await POST(req);
  expect(res.status).toBe(400);
  expect(createMock).not.toHaveBeenCalled();
});
