import { Badge } from "@heroui/badge";

/**
 * Visual badge showing the current subscription plan.
 *
 * @param plan      User plan name
 * @param className Optional Tailwind classes
 */

export interface PlanBadgeProps {
  plan?: "free" | "pro" | "premium";
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
  className,
}: PlanBadgeProps) {
  return (
    <Badge className={className} color={COLORS[plan]}>
      {plan}
    </Badge>
  );
}
