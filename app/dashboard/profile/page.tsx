"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import { Card } from "@heroui/card";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { Alert } from "@heroui/alert";
import { emojiAvatars } from "@/lib/avatars";


export default function ProfilePage() {
  const { data: session, update } = useSession();

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

  // Envía cambios al backend
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg("");
    setError("");

    if (form.password && form.password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }
    if (form.password && form.password !== form.password2) {
      setError("Las contraseñas no coinciden.");
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
        setError(data.error || "Error actualizando el perfil.");
      } else {
        setMsg("¡Perfil actualizado correctamente!");
        // Refresca sesión para mostrar los cambios
        update?.();
        setForm((prev) => ({ ...prev, password: "", password2: "" }));
      }
    } catch {
      setError("Error de red.");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-lg mx-auto py-12">
      <h1 className="text-2xl font-bold mb-4">Perfil</h1>
      <Card className="flex flex-col gap-6 p-8">
        <div className="flex items-center gap-4">
          <span className="text-4xl">{form.avatar}</span>
          <span className="font-semibold">{session?.user?.email}</span>
        </div>
        {msg && <Alert color="success">{msg}</Alert>}
        {error && <Alert color="danger">{error}</Alert>}
        <form onSubmit={handleSave} className="flex flex-col gap-4 mt-2">
          <Input
            label="Nombre"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Nombre"
            required
          />
          {/* Selector de emoji avatar */}
          <div>
            <div className="mb-1 font-medium text-sm">Avatar</div>
            <div className="flex flex-wrap gap-2">
              {emojiAvatars.map((emoji) => (
                <button
                  type="button"
                  key={emoji}
                  className={`text-2xl rounded-lg p-1 border transition
                    ${form.avatar === emoji ? "bg-violet-100 border-violet-400 scale-110" : "border-transparent hover:bg-violet-50"}
                  `}
                  onClick={() => handleSelectAvatar(emoji)}
                  aria-label={`Elegir avatar ${emoji}`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
          <Input
            label="Nueva contraseña"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="••••••••"
            minLength={6}
            autoComplete="new-password"
          />
          <Input
            label="Repetir nueva contraseña"
            name="password2"
            type="password"
            value={form.password2}
            onChange={handleChange}
            placeholder="••••••••"
            minLength={6}
            autoComplete="new-password"
          />
          <Button type="submit" className="w-full" color="primary" isLoading={loading}>
            Guardar cambios
          </Button>
        </form>
      </Card>
    </div>
  );
}

/*
  - Permite cambiar nombre, avatar emoji y contraseña del usuario autenticado.
  - Valida contraseñas.
  - Actualiza la sesión tras guardar (useSession().update).
  - Diseño HeroUI y UX amigable.
*/
