import crypto from "node:crypto";

import { NextRequest, NextResponse } from "next/server";

import dbConnect from "@/lib/dbConnect";
import User from "@/lib/models/user";
import { withValidationRoute } from "@/lib/middlewares/withValidation";
import { withRateLimitRoute } from "@/lib/middlewares/rateLimit";
import { registerSchema, type RegisterInput } from "@/lib/validations/auth";
import { logger } from "@/lib/logger";
import Event from "@/lib/models/event";
import ConfirmationToken from "@/lib/models/confirmationToken";
import { sendWelcomeEmail } from "@/lib/emails";

// POST /api/auth/register
async function handler(request: NextRequest & { body: RegisterInput }) {
  try {
    const { email, password, name } = request.body;

    await dbConnect();

    // Comprueba si existe ya el usuario
    const exists = await User.findOne({ email });

    if (exists) {
      return NextResponse.json(
        { error: "El email ya está registrado" },
        { status: 409 },
      );
    }

    // Crea y guarda el usuario (hash por middleware)
    const trialEndsAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const user = new User({ email, password, name, plan: "free", trialEndsAt });

    await user.save();

    try {
      const token = crypto.randomBytes(32).toString("hex");

      await ConfirmationToken.create({
        userId: user.id,
        token,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      });
      await sendWelcomeEmail(user.id, email, name, token);
      await Event.create({ userId: user.id, event: "signup_free" });
      await Event.create({ userId: user.id, event: "trial_started" });
    } catch (err) {
      logger.error(err);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    logger.error(err);

    return NextResponse.json({ error: "Error de servidor" }, { status: 500 });
  }
}

export const POST = withRateLimitRoute(
  withValidationRoute(handler, registerSchema),
);
