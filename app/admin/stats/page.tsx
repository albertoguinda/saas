"use client";
import { useEffect, useState } from "react";
import { Card } from "@heroui/card";
import { useTranslations } from "next-intl";

interface Stats {
  users: number;
  sites: number;
  events: number;
}

export default function AdminStatsPage() {
  const t = useTranslations("admin.stats");
  const [stats, setStats] = useState<Stats | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(t("error"));

          return;
        }
        setStats(data as Stats);
      })
      .catch(() => setError(t("error")));
  }, [t]);

  return (
    <div className="max-w-2xl mx-auto py-12">
      <h1 className="text-2xl font-bold mb-6">{t("title")}</h1>
      {error && <p className="text-danger mb-4">{error}</p>}
      {stats && (
        <Card className="p-4 space-y-2 text-sm">
          <div className="flex justify-between">
            <span>{t("users")}</span>
            <span>{stats.users}</span>
          </div>
          <div className="flex justify-between">
            <span>{t("sites")}</span>
            <span>{stats.sites}</span>
          </div>
          <div className="flex justify-between">
            <span>{t("events")}</span>
            <span>{stats.events}</span>
          </div>
        </Card>
      )}
    </div>
  );
}
