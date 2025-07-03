
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
import Event from '@/lib/models/event';
import { getServerSession } from 'next-auth';

beforeEach(() => {
  jest.clearAllMocks();
});


test('returns 401 when unauthenticated', async () => {
  const req = { json: async () => ({ event: 'test' }) } as unknown as NextRequest;
  const res = await POST(req);
  expect(res.status).toBe(401);
});

test('saves event when authenticated', async () => {
  (getServerSession as jest.Mock).mockResolvedValue({ user: { id: '1' } });
  const req = { json: async () => ({ event: 'wizard_completed' }) } as unknown as NextRequest;
  const res = await POST(req);
  expect(Event.create).toHaveBeenCalledWith({ userId: '1', event: 'wizard_completed' });
  expect(res.status).toBe(200);
});
