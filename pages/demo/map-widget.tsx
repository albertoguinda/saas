import { useTranslations } from "next-intl";

import DefaultLayout from "@/layouts/default";
import MapWidget from "@/components/premium/MapWidget";

export default function DemoMapWidgetPage() {
  const t = useTranslations();

  return (
    <DefaultLayout>
      <section className="py-20 flex items-center justify-center">
        <div className="w-full max-w-lg">
          <h1 className="mb-4 text-xl font-semibold">{t("demo.map")}</h1>
          <MapWidget points={[{ position: [51.5, -0.1], label: "London" }]} />
        </div>
      </section>
    </DefaultLayout>
  );
}
