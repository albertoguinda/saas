import { useState } from "react";
import { Button } from "@heroui/button";
import { useTranslations } from "next-intl";

import DefaultLayout from "@/layouts/default";
import { Sidebar } from "@/components/premium/ui";

export default function DemoSidebarPage() {
  const t = useTranslations("demo");
  const [open, setOpen] = useState(false);

  return (
    <DefaultLayout>
      <section className="flex items-center justify-center py-20">
        <div className="w-full max-w-sm space-y-4 text-center">
          <h1 className="text-xl font-semibold">{t("sidebar")}</h1>
          <Button onClick={() => setOpen(true)}>{t("open")}</Button>
        </div>
      </section>
      <Sidebar
        header={<h2 className="text-lg font-semibold">Menu</h2>}
        isOpen={open}
        width={260}
        onClose={() => setOpen(false)}
      >
        <nav className="space-y-2">
          <a className="block hover:underline" href="/">
            Item 1
          </a>
          <a className="block hover:underline" href="/">
            Item 2
          </a>
          <a className="block hover:underline" href="/">
            Item 3
          </a>
        </nav>
      </Sidebar>
    </DefaultLayout>
  );
}
