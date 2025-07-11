// pages/dashboard/profile.tsx
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Card } from "@heroui/card";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { Alert } from "@heroui/alert";

import { emojiAvatars } from "@/lib/avatars";

export default function ProfilePage() {
  const { data: session, update } = useSession();
  const t = useTranslations();

  // Inicializa el form con datos de la sesión
  const [form, setForm] = useState({
    name: session?.user?.name || "",
    avatar: session?.user?.avatar || emojiAvatars[0],
    password: "",
    password2: "",
  });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  // Actualiza campos del formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Selecciona un emoji como avatar
  const handleSelectAvatar = (emoji: string) => {
    setForm((prev) => ({ ...prev, avatar: emoji }));
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;
    setLoading(true);
    setError("");
    setMsg("");
    try {
      const formData = new FormData();

      formData.append("file", file);
      const res = await fetch("/api/me/avatar/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || t("profile.uploadError"));
      } else {
        setForm((prev) => ({ ...prev, avatar: data.avatar }));
        setMsg(t("profile.avatarUpdated"));
        update?.();
      }
    } catch {
      setError(t("profile.networkError"));
    }
    setLoading(false);
  };

  // Envía cambios al backend
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg("");
    setError("");

    if (form.password && form.password.length < 6) {
      setError(t("profile.password.min"));

      return;
    }
    if (form.password && form.password !== form.password2) {
      setError(t("profile.password.match"));

      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/me/update", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          avatar: form.avatar,
          password: form.password ? form.password : undefined,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || t("profile.networkError"));
      } else {
        setMsg(t("profile.updated"));
        // Refresca sesión para mostrar los cambios
        update?.();
        setForm((prev) => ({ ...prev, password: "", password2: "" }));
      }
    } catch {
      setError(t("profile.networkError"));
    }
    setLoading(false);
  };

  return (
    <div className="max-w-lg mx-auto py-12">
      <h1 className="text-2xl font-bold mb-4">{t("profile.title")}</h1>
      <Card className="flex flex-col gap-6 p-8">
        <div className="flex items-center gap-4">
          {form.avatar.startsWith("http") ? (
            <img
              alt="avatar"
              className="w-12 h-12 rounded-full"
              src={form.avatar}
            />
          ) : (
            <span className="text-4xl">{form.avatar}</span>
          )}
          <span className="font-semibold">{session?.user?.email}</span>
        </div>
        <input accept="image/*" type="file" onChange={handleUpload} />
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
        <form className="flex flex-col gap-4 mt-2" onSubmit={handleSave}>
          <Input
            required
            label={t("register.name")}
            name="name"
            placeholder={t("register.name")}
            value={form.name}
            onChange={handleChange}
          />
          {/* Selector de emoji avatar */}
          <div>
            <div className="mb-1 font-medium text-sm">
              {t("profile.avatarLabel")}
            </div>
            <div className="flex flex-wrap gap-2">
              {emojiAvatars.map((emoji) => (
                <button
                  key={emoji}
                  aria-label={t("profile.selectAvatar", { emoji })}
                  className={`text-2xl rounded-lg p-1 border transition
                    ${form.avatar === emoji ? "bg-violet-100 border-violet-400 scale-110" : "border-transparent hover:bg-violet-50"}
                  `}
                  type="button"
                  onClick={() => handleSelectAvatar(emoji)}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
          <Input
            autoComplete="new-password"
            label={t("profile.password.new")}
            minLength={6}
            name="password"
            placeholder="••••••••"
            type="password"
            value={form.password}
            onChange={handleChange}
          />
          <Input
            autoComplete="new-password"
            label={t("profile.password.repeat")}
            minLength={6}
            name="password2"
            placeholder="••••••••"
            type="password"
            value={form.password2}
            onChange={handleChange}
          />
          <Button
            className="w-full"
            color="primary"
            isLoading={loading}
            type="submit"
          >
            {t("profile.save")}
          </Button>
        </form>
      </Card>
    </div>
  );
}

/*
  - Permite cambiar nombre, avatar (emoji o imagen) y contraseña del usuario autenticado.
  - Valida contraseñas.
  - Actualiza la sesión tras guardar (useSession().update).
  - Diseño HeroUI y UX amigable.
*/
