import { useTranslations } from "next-intl";

import DefaultLayout from "@/layouts/default";
import Price from "@/components/premium/Price";

export default function DemoPricePage() {
  const t = useTranslations();

  return (
    <DefaultLayout>
      <section className="flex items-center justify-center py-20">
        <div className="text-2xl font-semibold">
          {t("demo.price")}: <Price amount="29.99" currencyCode="USD" />
        </div>
      </section>
    </DefaultLayout>
  );
}
