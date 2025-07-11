import { Alert } from "@heroui/alert";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";
import { track } from "@/lib/track";

export interface UpgradeBannerProps {
  className?: string;
}

export default function UpgradeBanner({ className }: UpgradeBannerProps) {
  const t = useTranslations("upgrade");
  return (
    <Alert
      className={cn("flex items-center justify-between", className)}
      color="warning"
    >
      <span>{t("limit")}</span>
      <Button
        as={Link}
        color="warning"
        href="/pricing"
        size="sm"
        onClick={() => track("upgrade_click")}
      >
        {t("viewPlans")}
      </Button>
    </Alert>
  );
}
