import { Card } from "@heroui/card";
import { Switch } from "@heroui/switch";
import { Button } from "@heroui/button";
import { useState } from "react";
import { useTranslations } from "next-intl";

import DomainWizard from "@/components/DomainWizard";

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(false);
  const t = useTranslations();

  return (
    <div className="max-w-lg mx-auto py-12">
      <h1 className="text-2xl font-bold mb-4">{t("settings.title")}</h1>
      <Card className="flex flex-col gap-6 p-8">
        <div className="flex items-center justify-between">
          <span>{t("settings.dark")}</span>
          <Switch isSelected={darkMode} onValueChange={setDarkMode} />
        </div>
        <Button className="mt-4" color="warning" variant="bordered">
          {t("settings.delete")}
        </Button>
      </Card>
      <div className="mt-8">
        <DomainWizard />
      </div>
    </div>
  );
}
