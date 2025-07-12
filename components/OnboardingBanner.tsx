import { Alert } from "@heroui/alert";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";

export default function OnboardingBanner() {
  const { data: session } = useSession();
  const [show, setShow] = useState(false);
  const t = useTranslations("onboarding");

  useEffect(() => {
    if (session?.user.plan === "premium") {
      fetch("/api/onboarding")
        .then((r) => r.json())
        .then((d) => {
          if (!d.onboarding?.onboardingCompleted) setShow(true);
        })
        .catch(() => {});
    }
  }, [session]);

  if (!show) return null;

  return (
    <Alert className="mb-4" color="secondary">
      <span>{t("banner")}</span>
      <div className="flex gap-2">
        <Button
          as={Link}
          color="secondary"
          href="/dashboard/onboarding"
          size="sm"
        >
          {t("resume")}
        </Button>
        <Button
          color="default"
          size="sm"
          variant="ghost"
          onClick={() => setShow(false)}
        >
          {t("later")}
        </Button>
      </div>
    </Alert>
  );
}
