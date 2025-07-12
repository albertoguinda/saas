import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Alert } from "@heroui/alert";
import { Button } from "@heroui/button";
import { Card } from "@heroui/card";
import { useTranslations } from "next-intl";
import { toast } from "@heroui/toast";

import Stepper from "@/components/Stepper";

interface Progress {
  branding: boolean;
  domain: boolean;
  analytics: boolean;
  paused?: boolean;
}

export default function OnboardingPage() {
  const t = useTranslations("onboarding");
  const router = useRouter();
  const [progress, setProgress] = useState<Progress>({
    branding: false,
    domain: false,
    analytics: false,
    paused: false,
  });
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/onboarding")
      .then((r) => r.json())
      .then((d) => d.onboarding && setProgress(d.onboarding))
      .catch(() => setError(t("error")));
  }, [t]);

  const complete = async (step: keyof Progress) => {
    setError("");
    const res = await fetch("/api/onboarding", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ step }),
    });

    if (res.ok) {
      toast.success(t("saved"));
      setProgress((p) => ({ ...p, [step]: true }));
    } else {
      setError(t("error"));
    }
  };

  const togglePause = async (value: boolean) => {
    await fetch("/api/onboarding", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ step: "paused", value }),
    });
    setProgress((p) => ({ ...p, paused: value }));
    if (value) router.push("/dashboard");
  };

  const steps = [
    { key: "branding", label: t("stepBranding") },
    { key: "domain", label: t("stepDomain") },
    { key: "analytics", label: t("stepAnalytics") },
  ] as const;

  const current = steps.findIndex((s) => !progress[s.key]);

  if (current === -1 && !progress.paused) {
    return null;
  }

  return (
    <div className="max-w-xl mx-auto py-12">
      <h1 className="text-2xl font-bold mb-6">{t("title")}</h1>
      {error && <Alert color="danger">{error}</Alert>}
      <Card className="p-6 flex flex-col gap-4">
        <Stepper
          current={current === -1 ? steps.length - 1 : current}
          steps={steps}
        />
        {!progress.branding && (
          <Button onClick={() => complete("branding")}>{t("complete")}</Button>
        )}
        {progress.branding && !progress.domain && (
          <Button onClick={() => complete("domain")}>{t("complete")}</Button>
        )}
        {progress.branding && progress.domain && !progress.analytics && (
          <Button onClick={() => complete("analytics")}>{t("complete")}</Button>
        )}
        <div className="flex justify-end gap-2 mt-4">
          {progress.paused ? (
            <Button size="sm" onClick={() => togglePause(false)}>
              {t("resume")}
            </Button>
          ) : (
            <Button size="sm" onClick={() => togglePause(true)}>
              {t("pause")}
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
}
