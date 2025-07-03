import type { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';

const json = jest.fn();
const status = jest.fn(() => ({ json }));
const res = { status } as unknown as NextApiResponse;

beforeEach(() => {
  jest.clearAllMocks();
});

test('returns 400 when body invalid', async () => {
  const handler = jest.fn();
  const schema = z.object({ name: z.string() });
  const validated = require('@/lib/middlewares/withValidation').withValidation(handler, schema);
  const req = { method: 'POST', body: { name: 1 } } as unknown as NextApiRequest;
  await validated(req, res);
  expect(status).toHaveBeenCalledWith(400);
  expect(json).toHaveBeenCalled();
  expect(handler).not.toHaveBeenCalled();
});

test('passes validated data to handler', async () => {
  const handler = jest.fn((_req, res: NextApiResponse) => res.status(200).json({ ok: true }));
  const schema = z.object({ name: z.string() });
  const validated = require('@/lib/middlewares/withValidation').withValidation(handler, schema);
  const req = { method: 'POST', body: { name: 'john' } } as unknown as NextApiRequest;
  await validated(req, res);
  expect(handler).toHaveBeenCalled();
  expect(status).toHaveBeenLastCalledWith(200);
  expect(req.body).toEqual({ name: 'john' });
});
