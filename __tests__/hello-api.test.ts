import handler from '@/pages/api/hello';
import type { NextApiRequest, NextApiResponse } from 'next';

describe('hello API', () => {
  it('returns greeting', async () => {
    const req = {} as NextApiRequest;
    const res: Partial<NextApiResponse> = {
      statusCode: 0,
      body: undefined,
      status(code: number) {
        this.statusCode = code;
        return this as NextApiResponse;
      },
      json(payload: any) {
        this.body = payload;
        return this as NextApiResponse;
      },
    };

    await handler(req, res as NextApiResponse);

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ message: 'Hello test' });
  });
});
