import { useEffect, useState } from "react";
import { Card } from "@heroui/card";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { Alert } from "@heroui/alert";
import { useTranslations } from "next-intl";

export default function BrandingPage() {
  const t = useTranslations("branding");
  const [form, setForm] = useState({ color: "indigo", font: "sans" });
  const [logo, setLogo] = useState("");
  const [favicon, setFavicon] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/branding")
      .then((r) => r.json())
      .then((d) => {
        if (d.branding) {
          setForm({
            color: d.branding.color || "indigo",
            font: d.branding.font || "sans",
          });
          setLogo(d.branding.logo || "");
          setFavicon(d.branding.favicon || "");
        }
      })
      .catch(() => setError(t("loadError")));
  }, [t]);

  const handleFile = async (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "logo" | "favicon",
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const fd = new FormData();

    fd.append("file", file);
    fd.append("type", type);
    const res = await fetch("/api/branding/upload", {
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

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMsg("");
    const res = await fetch("/api/branding", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
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
            <img alt="logo" className="h-20 object-contain" src={logo} />
          )}
          <Input
            accept="image/*"
            type="file"
            onChange={(e) => handleFile(e, "logo")}
          />
          {favicon && (
            <img
              alt="favicon"
              className="h-10 w-10 object-contain"
              src={favicon}
            />
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
