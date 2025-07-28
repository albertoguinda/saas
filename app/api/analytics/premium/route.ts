import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import Event from "@/lib/models/event";

async function handler(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  const days = Number(req.nextUrl.searchParams.get("days")) || 7;
  const start = new Date(Date.now() - days * 86400000);

  await dbConnect();
  const pageViews = await Event.aggregate([
    {
      $match: {
        userId: session.user.id,
        event: "page_view",
        createdAt: { $gte: start },
      },
    },
    {
      $group: {
        _id: {
          $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
        },
        count: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  const logs = await Event.find({ userId: session.user.id })
    .sort({ createdAt: -1 })
    .limit(10)
    .select({ event: 1, page: 1, createdAt: 1 })
    .lean();

  return NextResponse.json({ pageViews, logs });
}

export async function GET(req: NextRequest) {
  return handler(req);
}
