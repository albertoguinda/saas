import { NextRequest, NextResponse } from "next/server";

import { stripe } from "@/lib/stripe";
import dbConnect from "@/lib/dbConnect";
import User from "@/lib/models/user";
import Onboarding from "@/lib/models/onboarding";
import { logger } from "@/lib/logger";
import { invalidateSite } from "@/lib/cache";
import { trackServer } from "@/lib/track";

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
        const user = await User.findOneAndUpdate(
          userId ? { _id: userId } : { email },
          { plan: "premium" },
          { new: true },
        );

        if (user) {
          const { default: Site } = await import("@/lib/models/site");
          const sites = await Site.find({ userId: user._id });

          await Promise.all(sites.map((s) => invalidateSite(s.slug)));

          const existing = await Onboarding.findOne({ userId: user._id });

          if (!existing) {
            await Onboarding.create({ userId: user._id });
            logger.info("[onboarding] started", user._id);
            trackServer(user._id.toString(), "onboarding_started");
          }
        }
      }
    } catch (err) {
      logger.error(err);
    }
  }

  return NextResponse.json({ received: true });
}
