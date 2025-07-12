import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import Onboarding from "@/lib/models/onboarding";
import { trackServer } from "@/lib/track";
import { logger } from "@/lib/logger";

async function handler(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  await dbConnect();

  if (req.method === "GET") {
    let onboarding = await Onboarding.findOne({ userId: session.user.id });

    if (!onboarding && session.user.plan === "premium") {
      onboarding = await Onboarding.create({ userId: session.user.id });
      logger.info("[onboarding] started", session.user.id);
      trackServer(session.user.id, "onboarding_started");
    }

    return NextResponse.json({ onboarding });
  }

  if (req.method === "PATCH") {
    let json: unknown;

    try {
      json = await req.json();
    } catch {
      return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
    }

    const { step } = json as { step?: string };

    if (!step) {
      return NextResponse.json({ error: "Paso inválido" }, { status: 400 });
    }

    const onboarding = await Onboarding.findOneAndUpdate(
      { userId: session.user.id },
      { [step]: true },
      { upsert: true, new: true },
    );

    if (onboarding.branding && onboarding.domain && onboarding.analytics) {
      logger.info("[onboarding] completed", session.user.id);
      trackServer(session.user.id, "onboarding_completed");
    }

    return NextResponse.json({ onboarding });
  }

  return NextResponse.json({ error: "Método no soportado" }, { status: 405 });
}

export async function GET(req: NextRequest) {
  return handler(req);
}

export async function PATCH(req: NextRequest) {
  return handler(req);
}
