// pages/dashboard/index.tsx
import { Card } from "@heroui/card";
import { Button } from "@heroui/button";
import { Alert } from "@heroui/alert";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";
import { LayoutDashboard, User, Zap } from "lucide-react";
import { useState, useEffect } from "react";

import PlanBadge from "@/components/PlanBadge";
import { track } from "@/lib/track";

export default function DashboardHome() {
  const { data: session } = useSession();
  const router = useRouter();
  const t = useTranslations("dashboard");
  const tTrial = useTranslations("trial");

  const [projectsCount, setProjectsCount] = useState(0);
  const projectLimit = 1;
  const trialEnds = session?.user?.trialEndsAt
    ? new Date(session.user.trialEndsAt)
    : null;
  const trialActive = trialEnds && trialEnds > new Date();

  useEffect(() => {
    fetch("/api/sites")
      .then((res) => res.json())
      .then((data) => setProjectsCount(data.sites?.length ?? 0))
      .catch(() => setProjectsCount(0));
  }, []);

  return (
    <div className="max-w-3xl mx-auto py-12">
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
        {session?.user?.name
          ? t("greeting", { name: session.user.name })
          : t("welcome")}
        {session?.user?.plan && (
          <PlanBadge
            plan={session.user.plan}
            trialEndsAt={session.user.trialEndsAt}
          />
        )}
      </h1>
      {trialActive && (
        <Alert className="mb-4" color="success">
          {tTrial("active", { date: trialEnds!.toLocaleDateString() })}
        </Alert>
      )}
      {!trialActive && trialEnds && (
        <Alert
          className="mb-4 flex items-center justify-between"
          color="warning"
        >
          <span>{tTrial("expired")}</span>
          <Button
            color="warning"
            size="sm"
            onClick={() => {
              track("upgrade_click");
              router.push("/pricing");
            }}
          >
            {tTrial("upgrade")}
          </Button>
        </Alert>
      )}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Tarjeta Proyectos */}
        <Card className="flex flex-col gap-4 p-6 items-center text-center">
          <LayoutDashboard className="text-violet-600 mb-1" size={36} />
          <span className="font-semibold">{t("projects.title")}</span>
          <div>
            <span className="text-lg">{projectsCount}</span> /{" "}
            {t("projects.limit", { limit: projectLimit })}
          </div>
          <Button
            className="w-full"
            color="primary"
            onClick={() => router.push("/dashboard/projects")}
          >
            {t("projects.view")}
          </Button>
        </Card>

        {/* Tarjeta Perfil */}
        <Card className="flex flex-col gap-4 p-6 items-center text-center">
          <User className="text-violet-600 mb-1" size={36} />
          <span className="font-semibold">{t("profile.title")}</span>
          <div className="text-default-500">{t("profile.desc")}</div>
          <Button
            className="w-full"
            color="secondary"
            variant="bordered"
            onClick={() => router.push("/dashboard/profile")}
          >
            {t("profile.edit")}
          </Button>
        </Card>
      </div>

      {/* Aviso de límite */}
      {projectsCount >= projectLimit && (
        <div className="mt-8">
          <Alert className="inline-block" color="warning">
            {t("limit.msg")}
            <Button
              className="ml-2"
              color="warning"
              size="sm"
              startContent={<Zap />}
              variant="light"
              onClick={() => {
                track("upgrade_click");
                router.push("/pricing");
              }}
            >
              {t("upgrade")}
            </Button>
          </Alert>
        </div>
      )}

      <div className="mt-10 text-center text-sm text-default-400">
        <Button
          color="default"
          size="sm"
          variant="ghost"
          onClick={() => router.push("/dashboard/welcome")}
        >
          {t("welcome.link")}
        </Button>
      </div>
    </div>
  );
}
