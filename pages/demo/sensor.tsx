import { useTranslations } from "next-intl";

import DefaultLayout from "@/layouts/default";
import SensorPanel from "@/components/premium/iot/SensorPanel";

export default function DemoSensorPage() {
  const t = useTranslations();

  return (
    <DefaultLayout>
      <section className="flex justify-center py-20">
        <div className="w-full max-w-md">
          <h1 className="text-center text-xl font-bold mb-4">
            {t("demo.sensor")}
          </h1>
          <SensorPanel sensorType="temperature" />
        </div>
      </section>
    </DefaultLayout>
  );
}
