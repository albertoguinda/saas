import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { withRateLimitRoute } from "@/lib/middlewares/rateLimit";

import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import Event from "@/lib/models/event";

async function handler(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  try {
    const { event } = (await request.json()) as { event?: string };

    if (!event) {
      return NextResponse.json({ error: "Evento requerido" }, { status: 400 });
    }

    await dbConnect();
    await Event.create({ userId: session.user.id, event });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }
}

export const POST = withRateLimitRoute(handler, { limit: 20, window: 60 });
