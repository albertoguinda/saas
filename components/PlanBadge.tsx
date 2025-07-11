import { Badge } from "@heroui/badge";

export interface PlanBadgeProps {
  plan?: "free" | "pro" | "premium";
  className?: string;
}

const COLORS: Record<string, string> = {
  free: "primary",
  pro: "success",
  premium: "secondary",
};

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
