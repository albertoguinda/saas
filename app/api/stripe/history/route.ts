import { NextRequest, NextResponse } from "next/server";

import { stripe } from "@/lib/stripe";
import { logger } from "@/lib/logger";
import { withAuthPlanRoute } from "@/lib/middlewares/withAuthPlan";

async function handler(_req: NextRequest) {
  try {
    const result = await stripe.paymentIntents.list({ limit: 10 });
    const payments = result.data.map((p) => ({
      id: p.id,
      amount: p.amount,
      currency: p.currency,
      status: p.status,
      created: p.created,
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
