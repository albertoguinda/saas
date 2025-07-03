import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import Event from "@/lib/models/event";
import { withValidationRoute } from "@/lib/middlewares/withValidation";
import { withRateLimitRoute } from "@/lib/middlewares/rateLimit";
import { eventSchema, type EventInput } from "@/lib/validations/event";

async function handler(request: NextRequest & { body: EventInput }) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  const { event, page, timestamp, duration, x, y } = request.body;

  await dbConnect();
  await Event.create({
    userId: session.user.id,
    event,
    page,
    timestamp,
    duration,
    x,
    y,
  });

  return NextResponse.json({ ok: true });
}

export const POST = withRateLimitRoute(
  withValidationRoute(handler, eventSchema),
  {
    identifier: async () => {
      const session = await getServerSession(authOptions);
      return session?.user?.id || "anon";
    },
  },
);
