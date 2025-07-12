import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";

import { stripe } from "@/lib/stripe";
import { authOptions } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id || !session.user.email) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  let json: any;

  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  const {
    priceId = process.env.STRIPE_PREMIUM_PRICE_ID,
    successUrl,
    cancelUrl,
  } = json || {};

  if (!priceId || !successUrl || !cancelUrl) {
    return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
  }

  try {
    const stripeSession = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: successUrl,
      cancel_url: cancelUrl,
      customer_email: session.user.email,
      metadata: { userId: session.user.id },
    });

    return NextResponse.json({ id: stripeSession.id });
  } catch {
    return NextResponse.json(
      { error: "Error al crear sesión" },
      { status: 500 },
    );
  }
}
