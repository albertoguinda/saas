import { NextRequest, NextResponse } from "next/server";

import { stripe } from "@/lib/stripe";
import dbConnect from "@/lib/dbConnect";
import User from "@/lib/models/user";
import { logger } from "@/lib/logger";

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
  } catch {
    return NextResponse.json({ error: "Firma inválida" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = (event.data?.object || {}) as any;
    const userId = session.metadata?.userId;
    const email = session.customer_email;

    try {
      if (userId || email) {
        await dbConnect();
        await User.findOneAndUpdate(userId ? { _id: userId } : { email }, {
          plan: "pro",
        });
      }
    } catch (err) {
      logger.error(err);
    }
  }

  return NextResponse.json({ received: true });
}
