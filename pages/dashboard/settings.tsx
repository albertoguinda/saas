import { Card } from "@heroui/card";
import { Switch } from "@heroui/switch";
import { Button } from "@heroui/button";
import { Alert } from "@heroui/alert";
import { useRef, useState } from "react";
import { useTranslations } from "next-intl";

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);
  const t = useTranslations();

  const handleBackup = async () => {
    setError("");
    setMsg("");
    try {
      const res = await fetch("/api/backup/create", { method: "POST" });

      if (!res.ok) throw new Error();
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");

      a.href = url;
      a.download = "backup.zip";
      a.click();
      window.URL.revokeObjectURL(url);
      setMsg(t("settings.backupSuccess"));
    } catch {
      setError(t("error.network"));
    }
  };

  const handleRestore = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;
    if (!window.confirm(t("settings.confirmRestore"))) {
      e.target.value = "";

      return;
    }
    setError("");
    setMsg("");
    const formData = new FormData();

    formData.append("file", file);

    try {
      const res = await fetch("/api/backup/restore", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || t("error.network"));
      } else {
        setMsg(t("settings.restoreSuccess"));
      }
    } catch {
      setError(t("error.network"));
    }
    e.target.value = "";
  };

  return (
    <div className="max-w-lg mx-auto py-12">
      <h1 className="text-2xl font-bold mb-4">{t("settings.title")}</h1>
      <Card className="flex flex-col gap-6 p-8">
        <div className="flex items-center justify-between">
          <span>{t("settings.dark")}</span>
          <Switch isSelected={darkMode} onValueChange={setDarkMode} />
        </div>
        <Button className="mt-4" color="primary" onClick={handleBackup}>
          {t("settings.backup")}
        </Button>
        <input
          ref={fileRef}
          accept=".zip,application/json"
          className="mt-2"
          type="file"
          onChange={handleRestore}
        />
        <Button
          className="mt-2"
          color="warning"
          variant="bordered"
          onClick={() => fileRef.current?.click()}
        >
          {t("settings.restore")}
        </Button>
        {msg && (
          <Alert color="success" role="alert">
            {msg}
          </Alert>
        )}
        {error && (
          <Alert color="danger" role="alert">
            {error}
          </Alert>
        )}
      </Card>
    </div>
  );
}
