import { useTranslations } from "next-intl";

import DomainWizard from "@/components/DomainWizard";

export default function DomainsPage() {
  const t = useTranslations("domain");

  return (
    <div className="max-w-lg mx-auto py-12">
      <h1 className="text-2xl font-bold mb-4">{t("pageTitle")}</h1>
      <DomainWizard />
    </div>
  );
}
