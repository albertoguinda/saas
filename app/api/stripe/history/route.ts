import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";

import { logger } from "@/lib/logger";
import { withAuthPlanRoute } from "@/lib/middlewares/withAuthPlan";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import Payment from "@/lib/models/payment";

async function handler(_req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  try {
    await dbConnect();
    const list = await Payment.find({ userId: session.user.id })
      .sort({ createdAt: -1 })
      .lean();
    const payments = list.map((p) => ({
      id: p.stripeId,
      amount: p.amount,
      currency: p.currency,
      status: p.status,
      created: Math.floor(p.createdAt.getTime() / 1000),
    }));

    return NextResponse.json({ payments });
  } catch (err) {
    logger.error(err);

    return NextResponse.json(
      { error: "Error al consultar Stripe" },
      { status: 500 },
    );
  }
}

export const GET = withAuthPlanRoute(handler, "PRO");
