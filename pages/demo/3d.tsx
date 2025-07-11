import Atropos from "atropos/react";

import DefaultLayout from "@/layouts/default";
import { useTranslations } from "next-intl";

/**
 * Demo effect 3D CSS using Atropos.
 * Displays an interactive card with subtle parallax.
 */
export default function Demo3DPage() {
  const t = useTranslations();
  return (
    <DefaultLayout>
      <section className="flex items-center justify-center py-20">
        <Atropos
          activeOffset={20}
          className="w-60 h-40 bg-primary-500 text-white rounded-lg shadow-lg flex items-center justify-center text-xl font-semibold"
          shadow={false}
        >
          {t("demo.3d")}
        </Atropos>
      </section>
    </DefaultLayout>
  );
}
