import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

interface RateLimitOptions {
  limit?: number; // max requests
  window?: number; // in seconds
  prefix?: string;
}

function getIP(req: NextApiRequest | NextRequest) {
  const header =
    "headers" in req
      ? (req.headers as Record<string, string | string[] | undefined>)[
          "x-forwarded-for"
        ]
      : req.headers.get("x-forwarded-for");
  if (typeof header === "string") return header.split(",")[0].trim();
  if (Array.isArray(header)) return header[0];
  // @ts-ignore-next-line
  return req.ip || "unknown";
}

async function check(key: string, limit: number, window: number) {
  const count = await redis.incr(key);
  if (count === 1) await redis.expire(key, window);
  return count <= limit;
}

export function withRateLimit(
  handler: NextApiHandler,
  opts: RateLimitOptions = {},
) {
  const { limit = 10, window = 60, prefix = "rl" } = opts;
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const ip = getIP(req);
    const ok = await check(`${prefix}:${ip}`, limit, window);
    if (!ok) return res.status(429).json({ error: "Demasiadas peticiones" });
    return handler(req, res);
  };
}

export function withRateLimitRoute(
  handler: (req: NextRequest) => Promise<Response> | Response,
  opts: RateLimitOptions = {},
) {
  const { limit = 10, window = 60, prefix = "rl" } = opts;
  return async (req: NextRequest) => {
    const ip = getIP(req);
    const ok = await check(`${prefix}:${ip}`, limit, window);
    if (!ok)
      return NextResponse.json(
        { error: "Demasiadas peticiones" },
        { status: 429 },
      );
    return handler(req);
  };
}
