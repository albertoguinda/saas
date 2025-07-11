import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import type { NextRequest } from "next/server";

import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export async function checkLimit(
  identifier: string,
  limit: number,
  windowSeconds: number,
) {
  const key = `ratelimit:${identifier}`;
  const count = await redis.incr(key);

  if (count === 1) {
    await redis.expire(key, windowSeconds);
  }

  return count <= limit;
}

export interface RateLimitOptions {
  limit?: number;
  window?: number; // seconds
  identifier?: (req: unknown) => string | Promise<string>;
}

export function withRateLimit(
  handler: NextApiHandler,
  opts: RateLimitOptions = {},
) {
  const { limit = 10, window = 60, identifier } = opts;

  return async (req: NextApiRequest, res: NextApiResponse) => {
    const id = identifier
      ? await Promise.resolve(identifier(req))
      : (req.headers["x-forwarded-for"] as string)?.split(",")[0] ||
        req.socket.remoteAddress ||
        "unknown";
    const allowed = await checkLimit(id, limit, window);

    if (!allowed) {
      return res.status(429).json({ error: "Demasiadas peticiones" });
    }

    return handler(req, res);
  };
}

export function withRateLimitRoute(
  handler: (req: NextRequest) => Promise<Response> | Response,
  opts: RateLimitOptions = {},
) {
  const { limit = 10, window = 60, identifier } = opts;

  return async (req: NextRequest) => {
    const id = identifier
      ? await Promise.resolve(identifier(req))
      : req.headers.get("x-forwarded-for")?.split(",")[0] ||
        (req as unknown as { ip?: string }).ip ||
        "unknown";
    const allowed = await checkLimit(id, limit, window);

    if (!allowed) {
      return NextResponse.json(
        { error: "Demasiadas peticiones" },
        { status: 429 },
      );
    }

    return handler(req);
  };
}
