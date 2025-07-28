import { Card } from "@heroui/card";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";
import { track } from "@/lib/track";

export interface UpsellBannerProps {
  className?: string;
}

export default function UpsellBanner({ className }: UpsellBannerProps) {
  const t = useTranslations("upsell");

  return (
    <Card
      className={cn(
        "p-6 flex flex-col md:flex-row items-center gap-4 text-center md:text-left",
        className,
      )}
    >
      <div className="flex-1">
        <h3 className="text-xl font-semibold">{t("title")}</h3>
        <p className="text-default-500">{t("desc")}</p>
      </div>
      <Button
        as={Link}
        color="primary"
        href="/pricing"
        onClick={() => track("upgrade_click")}
      >
        {t("cta")}
      </Button>
    </Card>
  );
}
