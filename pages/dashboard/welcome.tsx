import { Card } from "@heroui/card";
import { Button } from "@heroui/button";
import { Alert } from "@heroui/alert";
import { useRouter } from "next/router";
import { User } from "lucide-react";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";

export default function WelcomeDashboard() {
  const router = useRouter();
  const { data: session } = useSession();
  const t = useTranslations("welcome");

  return (
    <div className="max-w-2xl mx-auto py-16">
      <Card className="flex flex-col items-center gap-8 p-10 shadow-2xl">
        <div className="flex flex-col items-center gap-2">
          <User className="w-12 h-12 text-primary mb-2" />
          <h1 className="text-3xl font-bold">
            {t("title")}
            {session?.user?.name && `, ${session.user.name}`}!
          </h1>
          <p className="text-default-500 text-center">
            {t("free")}{" "}
            <span className="font-semibold text-green-600">FREE</span>.<br />
            {t("limit", { limit: 1 })}
            <br />
            {t("ready")}
          </p>
        </div>
        <div className="flex gap-4 mt-4">
          <Button
            color="primary"
            size="lg"
            onClick={() => router.push("/dashboard/projects")}
          >
            {t("cta.project")}
          </Button>
          <Button
            variant="bordered"
            onClick={() => router.push("/dashboard/profile")}
          >
            {t("cta.profile")}
          </Button>
        </div>
        <Alert className="mt-6" color="primary">
          {t("upgrade")}
        </Alert>
      </Card>
    </div>
  );
}
