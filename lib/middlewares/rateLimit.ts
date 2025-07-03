import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import type { NextRequest } from "next/server";

import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

async function checkLimit(key: string, limit: number, windowSec: number) {
  const current = await redis.incr(key);

  if (current === 1) {
    await redis.expire(key, windowSec);
  }

  return current <= limit;
}

export function withRateLimit(
  handler: NextApiHandler,
  options: {
    limit?: number;
    window?: number;
    key?: (req: NextApiRequest) => string;
  } = {},
) {
  const {
    limit = 5,
    window = 60,
    key = (req: NextApiRequest) =>
      (req.headers["x-forwarded-for"] as string) ||
      req.socket.remoteAddress ||
      "unknown",
  } = options;

  return async (req: NextApiRequest, res: NextApiResponse) => {
    const identifier = key(req);
    const allowed = await checkLimit(`rl:${identifier}`, limit, window);

    if (!allowed) {
      return res.status(429).json({ error: "Demasiadas peticiones" });
    }

    return handler(req, res);
  };
}

export function withRateLimitRoute(
  handler: (req: NextRequest) => Promise<Response> | Response,
  options: {
    limit?: number;
    window?: number;
    key?: (req: NextRequest) => string;
  } = {},
) {
  const {
    limit = 5,
    window = 60,
    key = (req: NextRequest) =>
      req.ip || req.headers.get("x-forwarded-for") || "unknown",
  } = options;

  return async (req: NextRequest) => {
    const identifier = key(req);
    const allowed = await checkLimit(`rl:${identifier}`, limit, window);

    if (!allowed) {
      return NextResponse.json(
        { error: "Demasiadas peticiones" },
        { status: 429 },
      );
    }

    return handler(req);
  };
}
