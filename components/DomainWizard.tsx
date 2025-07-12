import { useEffect, useState } from "react";
import { Card } from "@heroui/card";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { Alert } from "@heroui/alert";
import { useTranslations } from "next-intl";

interface Domain {
  name: string;
  status: "pending" | "validating" | "active";
}

export default function DomainWizard({
  onVerified,
}: {
  onVerified?: () => void;
}) {
  const t = useTranslations("domain");
  const [domain, setDomain] = useState("");
  const [status, setStatus] = useState<string>("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/domains")
      .then((r) => r.json())
      .then((d) => {
        if (d.domains?.[0]) {
          const first = d.domains[0] as Domain;

          setDomain(first.name);
          setStatus(first.status);
        }
      })
      .catch(() => null);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/domain/connect", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: domain.trim() }),
    });
    const data = await res.json();

    setLoading(false);
    if (res.ok) {
      setStatus(data.domain.status);
      if (data.domain.status === "active" && onVerified) onVerified();
    } else {
      setError(data.error || t("error"));
    }
  };

  return (
    <Card className="p-6 flex flex-col gap-4">
      {error && <Alert color="danger">{error}</Alert>}
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <Input
          placeholder={t("placeholder")}
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
        />
        <Button color="primary" isLoading={loading} type="submit">
          {t("connect")}
        </Button>
      </form>
      {status && <p>{t(`status.${status}` as any)}</p>}
    </Card>
  );
}
