import { NextRequest, NextResponse } from "next/server";

import { stripe } from "@/lib/stripe";
import { withValidationRoute } from "@/lib/middlewares/withValidation";
import { withRateLimitRoute } from "@/lib/middlewares/rateLimit";
import { cancelSchema, type CancelInput } from "@/lib/validations/stripe";

async function handler(req: NextRequest & { body: CancelInput }) {
  const { subscriptionId } = req.body;
  try {
    const subscription = await stripe.subscriptions.del(subscriptionId);
    return NextResponse.json({ status: subscription.status });
  } catch (err) {
    return NextResponse.json({ error: "Error cancelando suscripción" }, { status: 500 });
  }
}

export const POST = withRateLimitRoute(
  withValidationRoute(handler, cancelSchema),
);
