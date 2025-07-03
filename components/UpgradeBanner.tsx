import { Alert } from "@heroui/alert";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { cn } from "@/lib/utils";

export interface UpgradeBannerProps {
  className?: string;
}

export default function UpgradeBanner({ className }: UpgradeBannerProps) {
  return (
    <Alert
      color="warning"
      className={cn("flex items-center justify-between", className)}
    >
      <span>Has alcanzado tu límite en el plan Free.</span>
      <Button
        as={Link}
        href="/pricing"
        color="warning"
        size="sm"
        data-track="upgrade_click"
      >
        Ver planes PRO
      </Button>
    </Alert>
  );
}
