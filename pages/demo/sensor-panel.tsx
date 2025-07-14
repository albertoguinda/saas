import { useTranslations } from "next-intl";

import DefaultLayout from "@/layouts/default";
import SensorPanel from "@/components/premium/iot/SensorPanel";

export default function DemoSensorPanelPage() {
  const t = useTranslations("demo");

  return (
    <DefaultLayout>
      <section className="flex items-center justify-center py-20">
        <div className="w-full max-w-md space-y-6">
          <h1 className="text-xl font-semibold">{t("sensor")}</h1>
          <SensorPanel sensorType="temperature" unit="°C" updateMode="stream" />
          <SensorPanel
            maxThreshold={70}
            sensorType="humidity"
            unit="%"
            updateMode="poll"
          />
        </div>
      </section>
    </DefaultLayout>
  );
}
