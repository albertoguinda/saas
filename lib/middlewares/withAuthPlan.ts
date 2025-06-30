import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

import { getServerSession } from "next-auth/next";

import { authOptions } from "@/lib/auth";

const PLANS_ORDER = {
  FREE: 0,
  PRO: 1,
  PREMIUM: 2,
} as const;

export type PlanName = keyof typeof PLANS_ORDER;

/**
 * Higher-order handler to protect API routes based on user plan.
 *
 * @param handler      Original Next.js API handler
 * @param requiredPlan Minimum plan required to execute the handler
 */
export function withAuthPlan(handler: NextApiHandler, requiredPlan: PlanName) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getServerSession(req, res, authOptions);

    if (!session?.user)
      return res.status(401).json({ error: "No autenticado" });

    const plan = (session.user.plan || "free").toUpperCase() as PlanName;

    if (PLANS_ORDER[plan] < PLANS_ORDER[requiredPlan]) {
      return res.status(403).json({ error: `Plan ${requiredPlan} requerido` });
    }

    return handler(req, res);
  };
}
