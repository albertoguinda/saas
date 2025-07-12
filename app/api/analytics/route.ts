import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import Event from "@/lib/models/event";
import { redis } from "@/lib/upstash";
import { PANEL_CACHE_TTL } from "@/config/constants";
import { logger } from "@/lib/logger";

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

  let cached: { visits: number; upgrades: number; wizard: number } | null =
    null;

  try {
    const res = await redis.get<string>(
      `analytics:${session.user.id}:${period}`,
    );

    if (res) {
      cached = JSON.parse(res);
    }
  } catch (err) {
    logger.warn("[cache] analytics get failed", err);
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

    try {
      await redis.set(
        `analytics:${session.user.id}:${period}`,
        JSON.stringify(cached),
        {
          ex: PANEL_CACHE_TTL,
        },
      );
    } catch (err) {
      logger.warn("[cache] analytics set failed", err);
    }
  }

  return NextResponse.json(cached);
}

export async function GET(req: NextRequest) {
  return handler(req);
}
