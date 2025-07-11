import { Card } from "@heroui/card";
import { useTranslations } from "next-intl";

export default function AboutPage() {
  const t = useTranslations("about");

  return (
    <div className="max-w-2xl mx-auto py-16">
      <h1 className="text-3xl font-bold mb-8 text-center">{t("title")}</h1>
      <Card className="p-8 flex flex-col gap-4">
        <p>{t("intro")}</p>
        <p>{t("open")}</p>
        <p>{t("stack")}</p>
        <p>{t("contact")}</p>
      </Card>
    </div>
  );
}
