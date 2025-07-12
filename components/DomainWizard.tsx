import { useEffect, useState } from "react";
import { Card } from "@heroui/card";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { Alert } from "@heroui/alert";
import { useTranslations } from "next-intl";

interface Domain {
  _id: string;
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
  const [domainId, setDomainId] = useState("");
  const [status, setStatus] = useState<string>("");
  const [provider, setProvider] = useState("namecheap");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/domain")
      .then((r) => r.json())
      .then((d) => {
        if (d.domains?.[0]) {
          const first = d.domains[0] as Domain;

          setDomainId(first._id);
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
    const res = await fetch("/api/domain", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: domain.trim() }),
    });
    const data = await res.json();

    setLoading(false);
    if (res.ok) {
      setDomainId(data.domain._id);
      setStatus(data.domain.status);
      if (data.domain.status === "active" && onVerified) onVerified();
    } else {
      setError(data.error || t("error"));
    }
  };

  const handleVerify = async () => {
    if (!domainId) return;
    setLoading(true);
    setError("");
    const res = await fetch("/api/domain", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: domainId }),
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

  const handleDelete = async () => {
    if (!domainId || !window.confirm(t("deleteConfirm"))) return;
    setLoading(true);
    setError("");
    const res = await fetch("/api/domain", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: domainId }),
    });

    setLoading(false);
    if (res.ok) {
      setDomain("");
      setDomainId("");
      setStatus("");
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
      {domainId && (
        <div className="flex gap-2">
          <Button size="sm" variant="bordered" onClick={handleVerify}>
            {t("verify")}
          </Button>
          <Button
            color="danger"
            size="sm"
            variant="bordered"
            onClick={handleDelete}
          >
            {t("delete")}
          </Button>
        </div>
      )}
      {status && <p>{t(`status.${status}` as any)}</p>}
      <div>
        <label className="mb-1 font-medium text-sm" htmlFor="provider">
          {t("provider")}
        </label>
        <select
          className="w-full p-2 rounded-md border"
          id="provider"
          value={provider}
          onChange={(e) => setProvider(e.target.value)}
        >
          <option value="namecheap">Namecheap</option>
          <option value="cloudflare">Cloudflare</option>
        </select>
      </div>
      <p>
        {t(`instructions.${provider}` as any, {
          cname: process.env.NEXT_PUBLIC_CNAME_DOMAIN,
          ip: process.env.NEXT_PUBLIC_A_RECORD_IP,
        })}
      </p>
    </Card>
  );
}
