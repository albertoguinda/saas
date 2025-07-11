import Stripe from "stripe";

/** Stripe SDK instance configured with project secret key. */
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-04-10",
});
