"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Alert } from "@heroui/alert";
import { Button } from "@heroui/button";
import { Card } from "@heroui/card";
import { Input } from "@heroui/input";

export default function SiteBrandingPage({
  params,
}: {
  params: { id: string };
}) {
  const t = useTranslations("branding");
  const [form, setForm] = useState({ color: "indigo", font: "sans" });
  const [logo, setLogo] = useState("");
  const [favicon, setFavicon] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(`/api/sites/${params.id}`)
      .then((r) => r.json())
      .then((d) => {
        const branding = d.site?.structure?.branding || {};

        setForm({
          color: branding.color || "indigo",
          font: branding.font || "sans",
        });
        setLogo(branding.assets?.logo?.url || "");
        setFavicon(branding.assets?.favicon?.url || "");
      })
      .catch(() => setError(t("loadError")));
  }, [params.id, t]);

  const handleFile = async (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "logo" | "favicon",
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const fd = new FormData();

    fd.append("file", file);
    fd.append("type", type);
    const res = await fetch(`/api/sites/${params.id}/assets`, {
      method: "POST",
      body: fd,
    });
    const data = await res.json();

    if (res.ok) {
      if (type === "logo") setLogo(data.url);
      else setFavicon(data.url);
      setMsg(t("uploaded"));
    } else {
      setError(data.error || t("uploadError"));
    }
  };

  const handleRemove = async (type: "logo" | "favicon") => {
    const res = await fetch(`/api/sites/${params.id}/assets?type=${type}`, {
      method: "DELETE",
    });
    const data = await res.json();

    if (res.ok) {
      if (type === "logo") setLogo("");
      else setFavicon("");
      setMsg(t("updated"));
    } else {
      setError(data.error || t("updateError"));
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");
    setError("");
    const res = await fetch(`/api/sites/${params.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ structure: { branding: form } }),
    });
    const data = await res.json();

    setLoading(false);
    if (res.ok) {
      setMsg(t("updated"));
    } else {
      setError(data.error || t("updateError"));
    }
  };

  return (
    <div className="max-w-lg mx-auto py-12">
      <h1 className="text-2xl font-bold mb-4">{t("title")}</h1>
      <Card className="flex flex-col gap-6 p-8">
        {msg && <Alert color="success">{msg}</Alert>}
        {error && <Alert color="danger">{error}</Alert>}
        <form className="flex flex-col gap-4" onSubmit={handleSave}>
          {logo && (
            <div className="flex items-center gap-2">
              <img alt="logo" className="h-20 object-contain" src={logo} />
              <Button
                type="button"
                variant="light"
                onClick={() => handleRemove("logo")}
              >
                {t("branding.remove")}
              </Button>
            </div>
          )}
          <Input
            accept="image/*"
            type="file"
            onChange={(e) => handleFile(e, "logo")}
          />
          {favicon && (
            <div className="flex items-center gap-2">
              <img
                alt="favicon"
                className="h-10 w-10 object-contain"
                src={favicon}
              />
              <Button
                type="button"
                variant="light"
                onClick={() => handleRemove("favicon")}
              >
                {t("branding.remove")}
              </Button>
            </div>
          )}
          <Input
            accept="image/*"
            type="file"
            onChange={(e) => handleFile(e, "favicon")}
          />
          <div>
            <label className="mb-1 font-medium text-sm" htmlFor="color">
              {t("color")}
            </label>
            <select
              className="w-full p-2 rounded-md border"
              id="color"
              value={form.color}
              onChange={(e) => setForm({ ...form, color: e.target.value })}
            >
              <option value="indigo">{t("option.color.indigo")}</option>
              <option value="emerald">{t("option.color.emerald")}</option>
              <option value="rose">{t("option.color.rose")}</option>
            </select>
          </div>
          <div>
            <label className="mb-1 font-medium text-sm" htmlFor="font">
              {t("font")}
            </label>
            <select
              className="w-full p-2 rounded-md border"
              id="font"
              value={form.font}
              onChange={(e) => setForm({ ...form, font: e.target.value })}
            >
              <option value="sans">{t("option.font.sans")}</option>
              <option value="serif">{t("option.font.serif")}</option>
              <option value="mono">{t("option.font.mono")}</option>
            </select>
          </div>
          <Button
            className="w-full"
            color="primary"
            isLoading={loading}
            type="submit"
          >
            {t("save")}
          </Button>
        </form>
      </Card>
    </div>
  );
}
