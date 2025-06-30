import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

import { getServerSession } from "next-auth/next";

import { authOptions } from "@/lib/auth";

export function withAuthPlan(
  handler: NextApiHandler,
  requiredPlan: "FREE" | "PRO" | "PREMIUM",
) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const session = (await getServerSession(
      req,
      res,
      authOptions as any,
    )) as any;

    if (!session?.user)
      return res.status(401).json({ error: "No autenticado" });
    const plan = ((session.user as any).plan || "FREE").toUpperCase();
    const plansOrder = { FREE: 0, PRO: 1, PREMIUM: 2 };

    if ((plansOrder as any)[plan] < (plansOrder as any)[requiredPlan]) {
      return res.status(403).json({ error: `Plan ${requiredPlan} requerido` });
    }

    return handler(req, res);
  };
}
