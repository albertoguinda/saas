
import type { NextRequest } from 'next/server';

jest.mock('next/server', () => {
  return {
    NextRequest: class { headers = new Map<string, string>(); ip?: string },
    NextResponse: { json: jest.fn((data, init) => ({ status: init?.status || 200, data })) },
  };
});

jest.mock('next-auth', () => ({
  getServerSession: jest.fn().mockResolvedValue(null),
}));

jest.mock('@/lib/auth', () => ({ __esModule: true, authOptions: {} }));
jest.mock('@/lib/dbConnect', () => ({ __esModule: true, default: jest.fn() }));
jest.mock('@/lib/models/event', () => ({ __esModule: true, default: { create: jest.fn() } }));
const incrMock = jest.fn();
const expireMock = jest.fn();
jest.mock('@upstash/redis', () => ({
  Redis: { fromEnv: () => ({ incr: incrMock, expire: expireMock }) },
}));

import { POST } from '@/app/api/track/route';
import Event from '@/lib/models/event';
import { getServerSession } from 'next-auth';

beforeEach(() => {
  jest.clearAllMocks();
  incrMock.mockResolvedValue(1);
});


test('returns 401 when unauthenticated', async () => {
  const req = { method: 'POST', json: async () => ({ event: 'test' }), headers: new Map() } as unknown as NextRequest;
  const res = await POST(req);
  expect(res.status).toBe(401);
});

test('saves event with extra data', async () => {
  (getServerSession as jest.Mock).mockResolvedValue({ user: { id: '1' } });
  const req = {
    method: 'POST',
    json: async () => ({ event: 'click', page: '/d', x: 1, y: 2, timestamp: 10 }),
    headers: new Map(),
  } as unknown as NextRequest;
  const res = await POST(req);
  expect(Event.create).toHaveBeenCalledWith({
    userId: '1',
    event: 'click',
    page: '/d',
    x: 1,
    y: 2,
    timestamp: 10,
    duration: undefined,
  });
  expect(res.status).toBe(200);
});

test('returns 400 when missing event', async () => {
  (getServerSession as jest.Mock).mockResolvedValue({ user: { id: '1' } });
  const req = { method: 'POST', json: async () => ({ page: '/d' }), headers: new Map() } as unknown as NextRequest;
  const res = await POST(req);
  expect(res.status).toBe(400);
  expect(Event.create).not.toHaveBeenCalled();
});

test('returns 400 when validation fails', async () => {
  (getServerSession as jest.Mock).mockResolvedValue({ user: { id: '1' } });
  const req = { method: 'POST', json: async () => ({ event: 1 }), headers: new Map() } as unknown as NextRequest;
  const res = await POST(req);
  expect(res.status).toBe(400);
  expect(Event.create).not.toHaveBeenCalled();
});

test('returns 400 on malformed JSON', async () => {
  (getServerSession as jest.Mock).mockResolvedValue({ user: { id: '1' } });
  const req = { method: 'POST', json: async () => { throw new Error('bad'); }, headers: new Map() } as unknown as NextRequest;
  const res = await POST(req);
  expect(res.status).toBe(400);
  expect(Event.create).not.toHaveBeenCalled();
});

test('returns 429 when rate limit exceeded', async () => {
  (getServerSession as jest.Mock).mockResolvedValue({ user: { id: '1' } });
  incrMock.mockResolvedValueOnce(6);
  const req = { method: 'POST', json: async () => ({ event: 'click' }), headers: new Map() } as unknown as NextRequest;
  const res = await POST(req);
  expect(res.status).toBe(429);
  expect(Event.create).not.toHaveBeenCalled();
});
