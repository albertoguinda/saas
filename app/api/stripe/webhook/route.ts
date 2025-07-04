import { NextRequest, NextResponse } from "next/server";

import { stripe } from "@/lib/stripe";

export async function POST(req: NextRequest) {
  const signature = req.headers.get("stripe-signature") || "";
  const payload = await req.text();
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      payload,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch {
    return NextResponse.json({ error: "Webhook inválido" }, { status: 400 });
  }

  // Manejo mínimo de eventos; puede ampliarse según necesidades
  switch (event.type) {
    case "customer.subscription.created":
    case "customer.subscription.deleted":
    case "customer.created":
      break;
    default:
      break;
  }

  return NextResponse.json({ received: true });
}
