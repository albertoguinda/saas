import { useTranslations } from "next-intl";

import DefaultLayout from "@/layouts/default";
import { BIMViewer } from "@/components/premium/3d";

export default function DemoBIMViewerPage() {
  const t = useTranslations("demo");

  return (
    <DefaultLayout>
      <section className="flex items-center justify-center py-20">
        <div className="w-full max-w-xl">
          <h1 className="mb-4 text-xl font-semibold">{t("bim")}</h1>
          <BIMViewer environment="night" modelSrc="/models/demo.glb" />
        </div>
      </section>
    </DefaultLayout>
  );
}
