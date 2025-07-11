import { Badge } from "@heroui/badge";
import { useTranslations } from "next-intl";

/**
 * Visual badge showing the current subscription plan.
 *
 * @param plan      User plan name
 * @param className Optional Tailwind classes
 */

export interface PlanBadgeProps {
  plan?: "free" | "pro" | "premium";
  trialEndsAt?: Date;
  className?: string;
}

const COLORS: Record<string, string> = {
  free: "primary",
  pro: "success",
  premium: "secondary",
};

/**
 * Render a color-coded badge for the given plan.
 */
export default function PlanBadge({
  plan = "free",
  trialEndsAt,
  className,
}: PlanBadgeProps) {
  const t = useTranslations("plan");

  const isTrial =
    plan === "free" && trialEndsAt && new Date(trialEndsAt) > new Date();
  const label = isTrial ? t("trial") : t(plan);
  const colorKey = isTrial ? "pro" : plan;

  return (
    <Badge className={className} color={COLORS[colorKey]}>
      {label}
    </Badge>
  );
}
