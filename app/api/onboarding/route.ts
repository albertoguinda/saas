import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import Onboarding from "@/lib/models/onboarding";

async function handler(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  await dbConnect();

  if (req.method === "GET") {
    const onboarding = await Onboarding.findOne({ userId: session.user.id });

    return NextResponse.json({ onboarding });
  }

  if (req.method === "PATCH") {
    let json: unknown;

    try {
      json = await req.json();
    } catch {
      return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
    }

    const { step, completed } = json as {
      step?: string;
      completed?: boolean;
    };

    if (!step && completed === undefined) {
      return NextResponse.json({ error: "Paso inválido" }, { status: 400 });
    }

    const updates: Record<string, unknown> = {};

    if (step) {
      updates[step] = true;
      updates.onboardingStep = step;
    }

    if (typeof completed === "boolean") {
      updates.onboardingCompleted = completed;
    }

    let onboarding = await Onboarding.findOneAndUpdate(
      { userId: session.user.id },
      updates,
      { upsert: true, new: true },
    );

    if (
      onboarding.branding &&
      onboarding.domain &&
      onboarding.analytics &&
      !onboarding.onboardingCompleted
    ) {
      onboarding.onboardingCompleted = true;
      onboarding = await onboarding.save();
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
