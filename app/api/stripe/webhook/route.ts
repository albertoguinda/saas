import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function POST(req: NextRequest) {
  const payload = await req.text();
  const signature = req.headers.get("stripe-signature") || "";

  let event: any;
  try {
    event = stripe.webhooks.constructEvent(
      payload,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch (err) {
    return NextResponse.json({ error: "Firma inválida" }, { status: 400 });
  }

  // Por ahora solo confirmamos recepción
  if (event.type === "checkout.session.completed") {
    // TODO: actualizar plan del usuario
  }

  return NextResponse.json({ received: true });
}
