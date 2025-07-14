import { useTranslations } from "next-intl";

import DefaultLayout from "@/layouts/default";
import { SchedulerWidget } from "@/components/premium/schedulers";

export default function DemoSchedulerPage() {
  const t = useTranslations("demo");

  return (
    <DefaultLayout>
      <section className="flex items-center justify-center py-20">
        <div className="w-full max-w-lg">
          <h1 className="mb-4 text-xl font-semibold">{t("scheduler")}</h1>
          <SchedulerWidget
            endHour="17:00"
            initialBlocks={["12:00"]}
            startHour="09:00"
            onChange={() => {}}
          />
        </div>
      </section>
    </DefaultLayout>
  );
}
