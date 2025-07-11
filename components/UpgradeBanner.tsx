import { Alert } from "@heroui/alert";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";

import { cn } from "@/lib/utils";
import { track } from "@/lib/track";

export interface UpgradeBannerProps {
  className?: string;
}

export default function UpgradeBanner({ className }: UpgradeBannerProps) {
  return (
    <Alert
      className={cn("flex items-center justify-between", className)}
      color="warning"
    >
      <span>Has alcanzado tu límite en el plan Free.</span>
      <Button
        as={Link}
        color="warning"
        href="/pricing"
        size="sm"
        onClick={() => track("upgrade_click")}
      >
        Ver planes PRO
      </Button>
    </Alert>
  );
}
