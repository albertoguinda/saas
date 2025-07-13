import { useTranslations } from "next-intl";

import DefaultLayout from "@/layouts/default";
import ChatBox from "@/components/premium/chat/ChatBox";

export default function DemoChatPage() {
  const t = useTranslations();

  return (
    <DefaultLayout>
      <section className="flex items-center justify-center py-20">
        <div className="w-full max-w-md">
          <h1 className="mb-4 text-xl font-semibold">{t("demo.chat")}</h1>
          <ChatBox />
        </div>
      </section>
    </DefaultLayout>
  );
}
