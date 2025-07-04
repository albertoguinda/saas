import { NextRequest, NextResponse } from "next/server";

import { stripe } from "@/lib/stripe";
import { withValidationRoute } from "@/lib/middlewares/withValidation";
import { withRateLimitRoute } from "@/lib/middlewares/rateLimit";
import { createCustomerSchema, type CreateCustomerInput } from "@/lib/validations/stripe";

async function handler(req: NextRequest & { body: CreateCustomerInput }) {
  const { email, name } = req.body;
  try {
    const customer = await stripe.customers.create({ email, name });
    return NextResponse.json({ customerId: customer.id });
  } catch (err) {
    return NextResponse.json({ error: "Error creando cliente" }, { status: 500 });
  }
}

export const POST = withRateLimitRoute(
  withValidationRoute(handler, createCustomerSchema),
);
