import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import type { NextRequest } from "next/server";

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";

import { logger } from "@/lib/logger";
import { authOptions } from "@/lib/auth";
import { TRIAL_DURATION_DAYS } from "@/config/constants";
import en from "@/messages/en.json" assert { type: "json" };
import es from "@/messages/es.json" assert { type: "json" };

const PLANS_ORDER = {
  FREE: 0,
  PRO: 1,
  PREMIUM: 2,
} as const;

export type PlanName = keyof typeof PLANS_ORDER;

const translations = { en, es } as const;

function t(
  locale: "en" | "es",
  key: string,
  vars?: Record<string, string | number>,
) {
  let str: string = (translations as any)[locale][key] || key;

  if (vars) {
    for (const k of Object.keys(vars)) {
      str = str.replace(`{${k}}`, String(vars[k]));
    }
  }

  return str;
}

function getLocale(req: NextApiRequest | NextRequest) {
  const headers: any = (req as any).headers;
  const header =
    typeof headers?.get === "function"
      ? headers.get("accept-language")
      : headers?.["accept-language"];

  return (header || "").toString().toLowerCase().startsWith("en") ? "en" : "es";
}

function planError(req: NextApiRequest | NextRequest, plan: PlanName) {
  const locale = getLocale(req) as "en" | "es";

  return {
    error: t(locale, "plan.required", { plan }),
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
    let trialExpired = false;

    if (plan === "FREE") {
      let trialEnds: Date | null = null;

      if (session.user.trialStart && session.user.trialDurationDays) {
        trialEnds = new Date(
          new Date(session.user.trialStart).getTime() +
            session.user.trialDurationDays * 86400000,
        );
      } else if (session.user.trialEndsAt) {
        trialEnds = new Date(session.user.trialEndsAt);
      }

      if (!session.user.trialStart && !session.user.trialEndsAt) {
        try {
          const { default: connect } = await import("@/lib/dbConnect");
          const { default: User } = await import("@/lib/models/user");

          await connect();
          const start = new Date();

          trialEnds = new Date(
            start.getTime() + TRIAL_DURATION_DAYS * 86400000,
          );
          await User.findByIdAndUpdate(session.user.id, {
            trialStart: start,
            trialDurationDays: TRIAL_DURATION_DAYS,
            trialEndsAt: trialEnds,
          });
          plan = "PRO";
        } catch (err) {
          logger.error(err);
        }
      } else if (trialEnds && trialEnds > new Date()) {
        plan = "PRO";
      } else if (trialEnds) {
        trialExpired = true;
        try {
          const { default: connect } = await import("@/lib/dbConnect");
          const { default: User } = await import("@/lib/models/user");

          await connect();
          await User.findByIdAndUpdate(session.user.id, {
            $unset: { trialStart: 1, trialDurationDays: 1, trialEndsAt: 1 },
            plan: "free",
          });
        } catch (err) {
          logger.error(err);
        }
      }
    }

    if (PLANS_ORDER[plan] < PLANS_ORDER[requiredPlan]) {
      const locale = getLocale(req) as "en" | "es";
      const error =
        trialExpired && requiredPlan !== "FREE"
          ? { error: t(locale, "trial.expired") }
          : planError(req, requiredPlan);

      return res.status(403).json(error);
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
    let trialExpired = false;

    if (plan === "FREE") {
      let trialEnds: Date | null = null;

      if (session.user.trialStart && session.user.trialDurationDays) {
        trialEnds = new Date(
          new Date(session.user.trialStart).getTime() +
            session.user.trialDurationDays * 86400000,
        );
      } else if (session.user.trialEndsAt) {
        trialEnds = new Date(session.user.trialEndsAt);
      }

      if (!session.user.trialStart && !session.user.trialEndsAt) {
        try {
          const { default: connect } = await import("@/lib/dbConnect");
          const { default: User } = await import("@/lib/models/user");

          await connect();
          const start = new Date();

          trialEnds = new Date(
            start.getTime() + TRIAL_DURATION_DAYS * 86400000,
          );
          await User.findByIdAndUpdate(session.user.id, {
            trialStart: start,
            trialDurationDays: TRIAL_DURATION_DAYS,
            trialEndsAt: trialEnds,
          });
          plan = "PRO";
        } catch (err) {
          logger.error(err);
        }
      } else if (trialEnds && trialEnds > new Date()) {
        plan = "PRO";
      } else if (trialEnds) {
        trialExpired = true;
        try {
          const { default: connect } = await import("@/lib/dbConnect");
          const { default: User } = await import("@/lib/models/user");

          await connect();
          await User.findByIdAndUpdate(session.user.id, {
            $unset: { trialStart: 1, trialDurationDays: 1, trialEndsAt: 1 },
            plan: "free",
          });
        } catch (err) {
          logger.error(err);
        }
      }
    }

    if (PLANS_ORDER[plan] < PLANS_ORDER[requiredPlan]) {
      const locale = getLocale(req) as "en" | "es";
      const error =
        trialExpired && requiredPlan !== "FREE"
          ? { error: t(locale, "trial.expired") }
          : planError(req, requiredPlan);

      return NextResponse.json(error, { status: 403 });
    }

    return handler(req);
  };
}
