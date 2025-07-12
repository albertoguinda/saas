import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import type { NextRequest } from "next/server";

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";

import { logger } from "@/lib/logger";
import { authOptions } from "@/lib/auth";

const PLANS_ORDER = {
  FREE: 0,
  PRO: 1,
  PREMIUM: 2,
} as const;

export type PlanName = keyof typeof PLANS_ORDER;

function getLocale(req: NextApiRequest | NextRequest) {
  const headers: any = (req as any).headers;
  const header =
    typeof headers?.get === "function"
      ? headers.get("accept-language")
      : headers?.["accept-language"];

  return (header || "").toString().toLowerCase().startsWith("en") ? "en" : "es";
}

function planError(req: NextApiRequest | NextRequest, plan: PlanName) {
  const locale = getLocale(req);

  return {
    error: locale === "en" ? `Plan ${plan} required` : `Plan ${plan} requerido`,
  };
}

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

    let plan = (session.user.plan || "free").toUpperCase() as PlanName;

    if (plan === "FREE" && session.user.trialEndsAt) {
      const trialEnds = new Date(session.user.trialEndsAt);

      if (trialEnds > new Date()) {
        plan = "PRO";
      } else {
        try {
          const { default: connect } = await import("@/lib/dbConnect");
          const { default: User } = await import("@/lib/models/user");

          await connect();
          await User.findByIdAndUpdate(session.user.id, {
            $unset: { trialEndsAt: 1 },
            plan: "free",
          });
        } catch (err) {
          logger.error(err);
        }
      }
    }

    if (PLANS_ORDER[plan] < PLANS_ORDER[requiredPlan]) {
      return res.status(403).json(planError(req, requiredPlan));
    }

    return handler(req, res);
  };
}

export function withAuthPlanRoute(
  handler: (req: NextRequest) => Promise<Response> | Response,
  requiredPlan: PlanName,
) {
  return async (req: NextRequest) => {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.redirect(new URL("/401", req.url));
    }
    let plan = (session.user.plan || "free").toUpperCase() as PlanName;

    if (plan === "FREE" && session.user.trialEndsAt) {
      const trialEnds = new Date(session.user.trialEndsAt);

      if (trialEnds > new Date()) {
        plan = "PRO";
      } else {
        try {
          const { default: connect } = await import("@/lib/dbConnect");
          const { default: User } = await import("@/lib/models/user");

          await connect();
          await User.findByIdAndUpdate(session.user.id, {
            $unset: { trialEndsAt: 1 },
            plan: "free",
          });
        } catch (err) {
          logger.error(err);
        }
      }
    }

    if (PLANS_ORDER[plan] < PLANS_ORDER[requiredPlan]) {
      return NextResponse.json(planError(req, requiredPlan), { status: 403 });
    }

    return handler(req);
  };
}
