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
          <BookingForm
            enableCoupons
            services={[
              { id: "cut", name: "Hair Cut", price: 20 },
              { id: "color", name: "Color", price: 35 },
            ]}
            onSubmit={async () => {}}
          />
        </div>
      </section>
    </DefaultLayout>
  );
}
