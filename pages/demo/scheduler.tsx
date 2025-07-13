import { useTranslations } from "next-intl";

import DefaultLayout from "@/layouts/default";
import { Scheduler } from "@/components/premium/schedulers";

export default function DemoSchedulerPage() {
  const t = useTranslations("demo");

  return (
    <DefaultLayout>
      <section className="flex items-center justify-center py-20">
        <div className="w-full max-w-lg">
          <h1 className="mb-4 text-xl font-semibold">{t("scheduler")}</h1>
          <Scheduler endTime="17:00" startTime="09:00" />
        </div>
      </section>
    </DefaultLayout>
  );
}
