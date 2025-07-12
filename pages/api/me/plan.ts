import type { NextApiRequest, NextApiResponse } from "next";

import { getServerSession } from "next-auth/next";

import dbConnect from "@/lib/dbConnect";
import User from "@/lib/models/user";
import Onboarding from "@/lib/models/onboarding";
import { authOptions } from "@/lib/auth";
import { logger } from "@/lib/logger";
import { trackServer } from "@/lib/track";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  await dbConnect();
  const session = await getServerSession(req, res, authOptions);

  if (!session?.user?.id) {
    return res.status(401).json({ error: "No autenticado" });
  }

  if (req.method === "GET") {
    const user = await User.findById(session.user.id).select(
      "plan trialEndsAt",
    );

    if (!user) return res.status(404).json({ error: "Usuario no encontrado" });

    return res
      .status(200)
      .json({ plan: user.plan, trialEndsAt: user.trialEndsAt });
  }

  if (req.method === "PATCH") {
    const { plan } = req.body as { plan?: string };

    if (!plan || !["free", "pro", "premium"].includes(plan)) {
      return res.status(400).json({ error: "Plan inválido" });
    }

    const user = await User.findByIdAndUpdate(
      session.user.id,
      { plan },
      { new: true },
    );

    if (user && plan === "premium") {
      const existing = await Onboarding.findOne({ userId: user._id });

      if (!existing) {
        await Onboarding.create({ userId: user._id });
        logger.info("[onboarding] started", user._id);
        trackServer(user._id.toString(), "onboarding_started");
      }
    }

    if (!user) return res.status(404).json({ error: "Usuario no encontrado" });

    return res.status(200).json({ plan: user.plan });
  }

  res.setHeader("Allow", ["GET", "PATCH"]);

  return res.status(405).json({ error: "Método no soportado" });
}
