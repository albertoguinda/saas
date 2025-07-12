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

    const { field, onboardingStep, completed } = json as {
      field?: string;
      onboardingStep?: number;
      completed?: boolean;
    };

    if (
      !field &&
      typeof onboardingStep !== "number" &&
      completed === undefined
    ) {
      return NextResponse.json({ error: "Paso inválido" }, { status: 400 });
    }

    const update: Record<string, unknown> = {};

    if (field) update[field] = true;
    if (typeof onboardingStep === "number")
      update.onboardingStep = onboardingStep;
    if (typeof completed === "boolean") update.onboardingCompleted = completed;

    const onboarding = await Onboarding.findOneAndUpdate(
      { userId: session.user.id },
      update,
      { upsert: true, new: true },
    );

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
