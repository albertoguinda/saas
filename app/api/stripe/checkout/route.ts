import { NextRequest, NextResponse } from "next/server";

import { stripe } from "@/lib/stripe";

export async function POST(req: NextRequest) {
  let json: any;

  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  const { priceId, successUrl, cancelUrl } = json || {};

  if (!priceId || !successUrl || !cancelUrl) {
    return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: successUrl,
      cancel_url: cancelUrl,
    });

    return NextResponse.json({ id: session.id });
  } catch {
    return NextResponse.json(
      { error: "Error al crear sesión" },
      { status: 500 },
    );
  }
}
