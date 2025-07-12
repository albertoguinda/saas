import type Stripe from "stripe";

import { NextRequest, NextResponse } from "next/server";

import { stripe } from "@/lib/stripe";
import dbConnect from "@/lib/dbConnect";
import User from "@/lib/models/user";
import Onboarding from "@/lib/models/onboarding";
import Payment from "@/lib/models/payment";
import { logger } from "@/lib/logger";
import { invalidateSite } from "@/lib/cache";
import { trackServer } from "@/lib/track";
import { sendPlanEmail } from "@/lib/emails";

export async function POST(req: NextRequest) {
  const payload = await req.text();
  const signature = req.headers.get("stripe-signature") || "";

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      payload,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch {
    return NextResponse.json({ error: "Firma inválida" }, { status: 400 });
  }

  try {
    await dbConnect();

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data?.object as Stripe.Checkout.Session;
        const userId = session.metadata?.userId;
        const email = session.customer_email as string | undefined;

        if (!userId && !email) break;

        const user = await User.findOneAndUpdate(
          userId ? { _id: userId } : { email },
          { plan: "premium" },
          { new: true },
        );

        if (user) {
          await Payment.create({
            userId: user._id,
            stripeId: session.id,
            amount: session.amount_total || 0,
            currency: session.currency || "usd",
            status: session.payment_status || "succeeded",
          });

          const { default: Site } = await import("@/lib/models/site");
          const sites = await Site.find({ userId: user._id });

          await Promise.all(sites.map((s) => invalidateSite(s.slug)));

          const existing = await Onboarding.findOne({ userId: user._id });

          if (!existing) {
            await Onboarding.create({ userId: user._id });
            logger.info("[onboarding] started", user._id);
            trackServer(user._id.toString(), "onboarding_started");
          }

          await sendPlanEmail(user._id.toString(), user.email, "premium");
        }

        break;
      }
      case "customer.subscription.updated": {
        const sub = event.data?.object as Stripe.Subscription;

        if (sub.status !== "active") {
          const user = await User.findOneAndUpdate(
            { customerId: sub.customer },
            { plan: "free" },
            { new: true },
          );

          if (user) {
            await sendPlanEmail(user._id.toString(), user.email, "free");
          }
        }

        break;
      }
      case "customer.subscription.deleted": {
        const sub = event.data?.object as Stripe.Subscription;

        const user = await User.findOneAndUpdate(
          { customerId: sub.customer },
          { plan: "free" },
          { new: true },
        );

        if (user) {
          await sendPlanEmail(user._id.toString(), user.email, "free");
        }

        break;
      }
      default:
        break;
    }
  } catch (err) {
    logger.error(err);
  }

  return NextResponse.json({ received: true });
}
