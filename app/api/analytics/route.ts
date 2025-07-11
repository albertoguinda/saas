import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import Event from "@/lib/models/event";

/**
 * Return analytics metrics for the authenticated user.
 *
 * Query param `period` can be `day`, `week` or `month` and controls
 * the time window for the counts.
 */
async function handler(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  const period = req.nextUrl.searchParams.get("period") || "day";
  const now = Date.now();
  const start = new Date(
    period === "week"
      ? now - 7 * 86400000
      : period === "month"
        ? now - 30 * 86400000
        : now - 86400000,
  );

  const redisAvailable =
    process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN;
  let cached: { visits: number; upgrades: number; wizard: number } | null =
    null;

  if (redisAvailable) {
    const { Redis } = await import("@upstash/redis");
    const redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL!,
      token: process.env.UPSTASH_REDIS_REST_TOKEN!,
    });

    cached = await redis.get(`analytics:${session.user.id}:${period}`);
  }

  if (!cached) {
    await dbConnect();
    const [visits, upgrades, wizard] = await Promise.all([
      Event.countDocuments({
        userId: session.user.id,
        event: "page_view",
        createdAt: { $gte: start },
      }),
      Event.countDocuments({
        userId: session.user.id,
        event: "upgrade_click",
        createdAt: { $gte: start },
      }),
      Event.countDocuments({
        userId: session.user.id,
        event: "wizard_completed",
        createdAt: { $gte: start },
      }),
    ]);

    cached = { visits, upgrades, wizard };

    if (redisAvailable) {
      const { Redis } = await import("@upstash/redis");
      const redis = new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL!,
        token: process.env.UPSTASH_REDIS_REST_TOKEN!,
      });

      await redis.setex(`analytics:${session.user.id}:${period}`, 60, cached);
    }
  }

  return NextResponse.json(cached);
}

export async function GET(req: NextRequest) {
  return handler(req);
}
