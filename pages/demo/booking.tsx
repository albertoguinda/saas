import { useTranslations } from "next-intl";

import DefaultLayout from "@/layouts/default";
import { BookingForm } from "@/components/premium/forms";

export default function DemoBookingPage() {
  const t = useTranslations("demo");

  return (
    <DefaultLayout>
      <section className="flex items-center justify-center py-20">
        <div className="w-full max-w-md">
          <h1 className="mb-4 text-xl font-semibold">{t("booking")}</h1>
          <BookingForm services={[{ id: "cut", name: "Hair Cut" }]} />
        </div>
      </section>
    </DefaultLayout>
  );
}
