import { NextRequest, NextResponse } from "next/server";

import { stripe } from "@/lib/stripe";
import { withValidationRoute } from "@/lib/middlewares/withValidation";
import { withRateLimitRoute } from "@/lib/middlewares/rateLimit";
import { subscribeSchema, type SubscribeInput } from "@/lib/validations/stripe";

async function handler(req: NextRequest & { body: SubscribeInput }) {
  const { customerId, priceId } = req.body;
  try {
    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: priceId }],
    });
    return NextResponse.json({ subscriptionId: subscription.id, status: subscription.status });
  } catch (err) {
    return NextResponse.json({ error: "Error creando suscripción" }, { status: 500 });
  }
}

export const POST = withRateLimitRoute(
  withValidationRoute(handler, subscribeSchema),
);
