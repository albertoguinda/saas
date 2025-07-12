import { useEffect, useState } from "react";
import { Card } from "@heroui/card";
import { Button } from "@heroui/button";
import { Alert } from "@heroui/alert";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";

import UpgradeBanner from "@/components/UpgradeBanner";

interface Template {
  name: string;
  description: string;
  image: string;
  tags: string[];
  type: string;
}

export default function PremiumCatalogPage() {
  const { data: session } = useSession();
  const t = useTranslations("catalog");
  const tCommon = useTranslations("projects");
  const [templates, setTemplates] = useState<Template[]>([]);
  const [selected, setSelected] = useState<Template | null>(null);

  useEffect(() => {
    fetch("/api/premium/templates")
      .then((r) => r.json())
      .then((d) => setTemplates(d.templates || []))
      .catch(() => {});
  }, []);

  return (
    <div className="max-w-5xl mx-auto py-12">
      <h1 className="text-2xl font-bold mb-6">{t("title")}</h1>
      {session?.user?.plan !== "premium" && <UpgradeBanner className="mb-4" />}
      {templates.length === 0 ? (
        <Alert color="default">{t("loading")}</Alert>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {templates.map((tpl) => (
            <Card key={tpl.name} className="overflow-hidden">
              <img
                alt={tpl.name}
                className="w-full h-40 object-cover"
                src={tpl.image}
              />
              <div className="p-4 flex flex-col gap-2">
                <h3 className="font-semibold">{tpl.name}</h3>
                <p className="text-sm text-default-500">{tpl.description}</p>
                <Button size="sm" onClick={() => setSelected(tpl)}>
                  {t("preview")}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
      {selected && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <Card className="p-6 w-full max-w-lg flex flex-col gap-4">
            <img
              alt={selected.name}
              className="w-full h-auto rounded"
              src={selected.image}
            />
            <h3 className="text-xl font-semibold">{selected.name}</h3>
            <p className="text-sm text-default-500">{selected.description}</p>
            <Button onClick={() => setSelected(null)}>
              {tCommon("cancel")}
            </Button>
          </Card>
        </div>
      )}
    </div>
  );
}
