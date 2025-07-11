import Link from "next/link";
import { Button } from "@heroui/button";
import { useTranslations } from "next-intl";

import DefaultLayout from "@/layouts/default";

export default function NotFoundPage() {
  const t = useTranslations();

  return (
    <DefaultLayout>
      <div className="max-w-lg mx-auto py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">{t("notFound.title")}</h1>
        <p className="mb-6">{t("notFound.desc")}</p>
        <Button as={Link} color="primary" href="/">
          {t("notFound.back")}
        </Button>
      </div>
    </DefaultLayout>
  );
}
