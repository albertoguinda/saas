import { Alert } from "@heroui/alert";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import clsx from "clsx";

export interface UpgradeBannerProps {
  className?: string;
}

export default function UpgradeBanner({ className }: UpgradeBannerProps) {
  return (
    <Alert color="warning" className={clsx("flex items-center justify-between", className)}>
      <span>Has alcanzado tu límite en el plan Free.</span>
      <Button as={Link} href="/pricing" color="warning" size="sm">
        Ver planes PRO
      </Button>
    </Alert>
  );
}
