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

    if (!session?.user) {
      res.redirect("/401");
      return;
    }

    const plan = (session.user.plan || "free").toUpperCase() as PlanName;

    if (PLANS_ORDER[plan] < PLANS_ORDER[requiredPlan]) {
      return res.status(403).json({ error: `Plan ${requiredPlan} requerido` });
    }

    return handler(req, res);
  };
}

import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function withAuthPlanRoute(
  handler: (req: NextRequest) => Promise<Response> | Response,
  requiredPlan: PlanName,
) {
  return async (req: NextRequest) => {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.redirect(new URL("/401", req.url));
    }
    const plan = (session.user.plan || "free").toUpperCase() as PlanName;
    if (PLANS_ORDER[plan] < PLANS_ORDER[requiredPlan]) {
      return NextResponse.json(
        { error: `Plan ${requiredPlan} requerido` },
        { status: 403 },
      );
    }
    return handler(req);
  };
}
