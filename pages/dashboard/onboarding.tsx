import { useEffect, useState } from "react";
import { Alert } from "@heroui/alert";
import { Button } from "@heroui/button";
import { Card } from "@heroui/card";
import { useTranslations } from "next-intl";

import { isOnboardingComplete } from "@/lib/onboarding";

interface Progress {
  branding: boolean;
  domain: boolean;
  analytics: boolean;
}

export default function OnboardingPage() {
  const t = useTranslations("onboarding");
  const [progress, setProgress] = useState<Progress>({
    branding: false,
    domain: false,
    analytics: false,
  });
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/onboarding")
      .then((r) => r.json())
      .then((d) => d.onboarding && setProgress(d.onboarding))
      .catch(() => setError(t("error")));
  }, []);

  const complete = async (step: keyof Progress) => {
    await fetch("/api/onboarding", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ step }),
    });
    setProgress((p) => ({ ...p, [step]: true }));
  };

  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const sendFeedback = async () => {
    await fetch("/api/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });
    setSent(true);
  };

  return (
    <div className="max-w-xl mx-auto py-12">
      <h1 className="text-2xl font-bold mb-6">{t("title")}</h1>
      {error && <Alert color="danger">{error}</Alert>}
      <Card className="p-6 flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <input readOnly checked={progress.branding} type="checkbox" />
          <span>{t("stepBranding")}</span>
          {!progress.branding && (
            <Button size="sm" onClick={() => complete("branding")}>
              {t("complete")}
            </Button>
          )}
        </div>
        <div className="flex items-center gap-2">
          <input readOnly checked={progress.domain} type="checkbox" />
          <span>{t("stepDomain")}</span>
          {!progress.domain && (
            <Button size="sm" onClick={() => complete("domain")}>
              {t("complete")}
            </Button>
          )}
        </div>
        <div className="flex items-center gap-2">
          <input readOnly checked={progress.analytics} type="checkbox" />
          <span>{t("stepAnalytics")}</span>
          {!progress.analytics && (
            <Button size="sm" onClick={() => complete("analytics")}>
              {t("complete")}
            </Button>
          )}
        </div>
      </Card>
      {isOnboardingComplete(progress) && (
        <Card className="p-6 mt-6 flex flex-col gap-3">
          {sent ? (
            <span>{t("feedbackThanks")}</span>
          ) : (
            <>
              <h2 className="text-lg font-semibold">{t("feedbackTitle")}</h2>
              <textarea
                className="border rounded p-2"
                placeholder={t("feedbackPlaceholder")}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <Button size="sm" onClick={sendFeedback}>
                {t("feedbackSend")}
              </Button>
            </>
          )}
        </Card>
      )}
    </div>
  );
}
