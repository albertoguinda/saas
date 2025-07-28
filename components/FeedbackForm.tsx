"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Card } from "@heroui/card";
import { Button } from "@heroui/button";

import { notifyError, notifySuccess } from "@/lib/notifications";
import { track } from "@/lib/track";

export default function FeedbackForm() {
  const t = useTranslations("feedback");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });
    const json = await res.json();

    setLoading(false);
    if (!res.ok) {
      notifyError(json.error || t("error"));

      return;
    }
    setMessage("");
    notifySuccess(t("success"));
    track("feedback_submitted");
  };

  return (
    <Card className="p-4 mt-8">
      <h2 className="mb-4 text-lg font-semibold">{t("title")}</h2>
      <form className="space-y-4" onSubmit={onSubmit}>
        <div>
          <label className="mb-1 block text-sm font-medium" htmlFor="message">
            {t("label")}
          </label>
          <textarea
            className="w-full rounded-md border bg-white p-2 dark:bg-neutral-900"
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        <Button className="w-full" isLoading={loading} type="submit">
          {t("submit")}
        </Button>
      </form>
    </Card>
  );
}
